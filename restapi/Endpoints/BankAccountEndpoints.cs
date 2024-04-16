using System.Security.Claims;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.DTOs;
using restapi.Models;

namespace restapi.Endpoints
{
    public static class BankAccountEndpoints
    {
        public static RouteGroupBuilder MapBankAccountEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("bankaccounts");

            group.MapGet("/", async (AppDbContext dbContext, IMapper mapper, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                // Query BankAccounts.Portfoli where UserId matches the requesting user's ID
                var bankAccounts = await dbContext.BankAccount
                    .Where(b => b.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .ToListAsync();

                var bankAccountDtos = mapper.Map<List<BankAccountDto>>(bankAccounts);
                return Results.Ok(bankAccountDtos);
            });

            group.MapGet("/{id}", async (AppDbContext dbContext, int id, HttpContext httpContext, IMapper mapper) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var bankAccount = await dbContext.BankAccount
                    .Where(b => b.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(b => b.Id == id);

                if (bankAccount == null)
                    return Results.NotFound();

                var bankAccountsDto = mapper.Map<BankAccountDto>(bankAccount);

                return Results.Ok(bankAccountsDto);
            });

            // POST create bank account
            group.MapPost("/", async (AppDbContext dbContext, BankAccount bankAccount, HttpContext httpContext, IMapper mapper) =>
            {
                var user = httpContext.User;

                // Get the currently authenticated user's ID
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                // verify user has access to portfolio that is selected
                var selectedPortfolio = await dbContext.Portfolio
                    .Where(p => p.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(p => p.Id == bankAccount.PortfolioId);

                // Selected portfolio not in db
                if (selectedPortfolio == null)
                    return Results.NotFound();

                // Create and save bank account
                dbContext.BankAccount.Add(bankAccount);
                await dbContext.SaveChangesAsync();

                var bankAccountDto = mapper.Map<BankAccountDto>(bankAccount);

                return Results.Ok();
            });

            // PUT update bank account name
            group.MapPut("/{id}/name", async (int id, string name, AppDbContext dbContext, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var bankAccount = await dbContext.BankAccount
                    .Where(b => b.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(b => b.Id == id);

                if (bankAccount == null)
                    return Results.NotFound();

                bankAccount.Name = name;

                await dbContext.SaveChangesAsync();

                return Results.Ok();
            });

            // PUT update bank account amount
            group.MapPut("/{id}", async (int id, BankAccount bankAccount, AppDbContext dbContext, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var existingBankAccount = await dbContext.BankAccount
                    .Where(b => b.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(b => b.Id == id);

                if (existingBankAccount == null)
                    return Results.NotFound();


                existingBankAccount.Name = bankAccount.Name;
                existingBankAccount.Type = bankAccount.Type;
                existingBankAccount.IsPercentage = bankAccount.IsPercentage;
                existingBankAccount.Amount = bankAccount.Amount;
                existingBankAccount.PercentageAmount = bankAccount.PercentageAmount;

                await dbContext.SaveChangesAsync();

                return Results.Ok();
            });

            // PUT update bank account name
            group.MapPut("/{id}/isremainder", async (int id, AppDbContext dbContext, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var account = await dbContext.BankAccount
                    .Where(b => b.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(b => b.Id == id);

                if (account == null || account.Type == AccountType.Savings)
                {
                    return Results.NotFound();
                }

                // Query BankAccounts.Portfoli where UserId matches the requesting user's ID
                var bankAccounts = await dbContext.BankAccount
                    .Where(b => b.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .Where(b => b.PortfolioId == account.PortfolioId)
                    .ToListAsync();

                // loop throught each bank account and set field to false except the one specified in path
                foreach (var b in bankAccounts)
                {
                    if (b.Id == id) b.IsRemainder = true;
                    else b.IsRemainder = false;
                }

                await dbContext.SaveChangesAsync();

                return Results.Ok();
            });

            group.MapDelete("/{id}", async (AppDbContext dbContext, int id, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var bankAccount = await dbContext.BankAccount
                    .Where(b => b.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(b => b.Id == id);

                if (bankAccount == null)
                    return Results.NotFound();

                dbContext.BankAccount.Remove(bankAccount);
                await dbContext.SaveChangesAsync();

                return Results.NoContent();
            });

            return group;
        }
    }
}
