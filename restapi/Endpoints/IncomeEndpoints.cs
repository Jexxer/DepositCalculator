using System.Security.Claims;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.DTOs;
using restapi.Models;

namespace restapi.Endpoints
{
    public static class IncomeEndpoints
    {
        public static RouteGroupBuilder MapIncomeEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("incomes");

            group.MapGet("/", async (AppDbContext dbContext, HttpContext httpContext, IMapper mapper) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var incomes = await dbContext.Income
                    .Where(i => i.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .ToListAsync();

                if (incomes == null)
                    return Results.NotFound();

                var incomeDtos = mapper.Map<List<IncomeDto>>(incomes);

                return Results.Ok(incomeDtos);
            });

            group.MapGet("/{id}", async (AppDbContext dbContext, int id, HttpContext httpContext, IMapper mapper) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var income = await dbContext.Income
                    .Where(i => i.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (income == null)
                    return Results.NotFound();

                var incomeDto = mapper.Map<IncomeDto>(income);

                return Results.Ok(incomeDto);
            });

            group.MapPost("/", async (AppDbContext dbContext, Income income, HttpContext httpContext, IMapper mapper) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                // verify user has access to portfolio that is selected
                var selectedPortfolio = await dbContext.Portfolio
                    .Where(p => p.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(p => p.Id == income.PortfolioId);

                // Selected portfolio not in db
                if (selectedPortfolio == null)
                    return Results.NotFound();

                if (!income.IsInsuranceProvider)
                {
                    income.InsuranceAmount = 0.0m;
                }

                // Create and save income 
                dbContext.Income.Add(income);
                await dbContext.SaveChangesAsync();

                var incomeDto = mapper.Map<IncomeDto>(income);

                return Results.Created($"/incomes/{incomeDto.Id}", incomeDto);
            });

            // PUT update income
            group.MapPut("/{id}", async (int id, Income income, AppDbContext dbContext, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var existingIncome = await dbContext.Income
                    .Where(i => i.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (existingIncome == null)
                    return Results.NotFound();

                existingIncome.Name = income.Name;
                existingIncome.Amount = income.Amount;
                existingIncome.PayFrequency = income.PayFrequency;
                existingIncome.IsInsuranceProvider = income.IsInsuranceProvider;

                // get bank BankAccountId
                var bankAccount = await dbContext.BankAccount
                    .Where(b => b.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(b => b.Id == income.BankAccountId);
                var existingBank = await dbContext.BankAccount.FindAsync(existingIncome.BankAccountId);

                // replace current bank account with new bank account
                if (bankAccount != null)
                {
                    bankAccount.IsRemainder = true;
                }
                if (existingBank != null)
                {
                    existingBank.IsRemainder = false;
                }


                existingIncome.BankAccountId = income.BankAccountId;
                existingIncome.BankAccount = bankAccount;
                if (income.IsInsuranceProvider)
                {
                    existingIncome.InsuranceAmount = income.InsuranceAmount;
                }
                else
                {
                    existingIncome.InsuranceAmount = 0.0m;
                }

                await dbContext.SaveChangesAsync();

                return Results.Ok();
            });


            group.MapDelete("/{id}", async (AppDbContext dbContext, int id, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var income = await dbContext.Income
                    .Where(i => i.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (income == null)
                    return Results.NotFound();

                dbContext.Income.Remove(income);
                await dbContext.SaveChangesAsync();

                return Results.NoContent();
            });

            return group;
        }
    }
}
