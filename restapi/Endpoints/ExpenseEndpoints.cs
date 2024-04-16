
using System.Security.Claims;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.DTOs;
using restapi.Models;

namespace restapi.Endpoints
{
    public static class ExpenseEndpoints
    {
        public static RouteGroupBuilder MapExpenseEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("expenses");

            group.MapGet("/", async (AppDbContext dbContext, HttpContext httpContext, IMapper mapper) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var expenses = await dbContext.Expense
                    .Where(e => e.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .ToListAsync();

                if (expenses == null)
                    return Results.NotFound();

                var expenseDtos = mapper.Map<List<ExpenseDto>>(expenses);

                return Results.Ok(expenseDtos);
            });

            group.MapGet("/{id}", async (AppDbContext dbContext, int id, HttpContext httpContext, IMapper mapper) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var expense = await dbContext.Expense
                    .Where(e => e.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (expense == null)
                    return Results.NotFound();

                var expenseDto = mapper.Map<ExpenseDto>(expense);

                return Results.Ok(expenseDto);
            });

            group.MapPost("/", async (AppDbContext dbContext, Expense expense, HttpContext httpContext, IMapper mapper) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                // verify user has access to portfolio that is selected
                var selectedPortfolio = await dbContext.Portfolio
                    .Where(p => p.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(p => p.Id == expense.PortfolioId);

                // Selected portfolio not in db
                if (selectedPortfolio == null)
                    return Results.NotFound();

                // Create and save expense 
                dbContext.Expense.Add(expense);
                await dbContext.SaveChangesAsync();

                var expenseDto = mapper.Map<ExpenseDto>(expense);

                return Results.Created($"/expenses/{expenseDto.Id}", expenseDto);
            });

            group.MapPut("/{id}", async (int id, Expense expense, AppDbContext dbContext, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var existingExpense = await dbContext.Expense
                    .Where(e => e.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (existingExpense == null)
                    return Results.NotFound();

                existingExpense.Name = expense.Name;
                existingExpense.Amount = expense.Amount;
                existingExpense.BankAccountId = expense.BankAccountId;
                existingExpense.Frequency = expense.Frequency;

                await dbContext.SaveChangesAsync();

                return Results.Ok();
            });

            group.MapPut("/{id}/updatebank/{bankId}", async (int id, int bankId, AppDbContext dbContext, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var expense = await dbContext.Expense
                    .Where(e => e.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (expense == null)
                    return Results.NotFound();

                expense.BankAccountId = bankId;

                await dbContext.SaveChangesAsync();

                return Results.Ok();
            });

            // PUT update expense name
            group.MapPut("/{id}/name", async (int id, string name, AppDbContext dbContext, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var expense = await dbContext.Expense
                    .Where(e => e.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (expense == null)
                    return Results.NotFound();

                expense.Name = name;

                await dbContext.SaveChangesAsync();

                return Results.Ok();
            });

            // PUT update expense amount
            group.MapPut("/{id}/amount", async (int id, decimal amount, AppDbContext dbContext, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var expense = await dbContext.Expense
                    .Where(e => e.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (expense == null)
                    return Results.NotFound();

                expense.Amount = amount;

                await dbContext.SaveChangesAsync();

                return Results.Ok();
            });

            // DELETE expense
            group.MapDelete("/{id}", async (AppDbContext dbContext, int id, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var expense = await dbContext.Expense
                    .Where(e => e.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (expense == null)
                    return Results.NotFound();

                dbContext.Expense.Remove(expense);
                await dbContext.SaveChangesAsync();

                return Results.NoContent();
            });

            return group;
        }
    }
}
