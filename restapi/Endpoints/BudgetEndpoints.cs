using System.Security.Claims;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.DTOs;
using restapi.Models;

namespace restapi.Endpoints
{
    public static class BudgetEndpoints
    {
        public static RouteGroupBuilder MapBudgetEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("budgets");

            group.MapGet("/", async (AppDbContext dbContext, HttpContext httpContext, IMapper mapper) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var budgets = await dbContext.Budget
                    .Where(b => b.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .ToListAsync();

                if (budgets == null)
                    return Results.NotFound();

                var budgetDtos = mapper.Map<List<BudgetDto>>(budgets);

                return Results.Ok(budgetDtos);
            });

            group.MapGet("/{id}", async (AppDbContext dbContext, int id, HttpContext httpContext, IMapper mapper) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var budget = await dbContext.Budget
                    .Where(b => b.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(b => b.Id == id);

                if (budget == null)
                    return Results.NotFound();

                var budgetDto = mapper.Map<BudgetDto>(budget);

                return Results.Ok(budgetDto);
            });

            group.MapPost("/", async (AppDbContext dbContext, Budget budget, HttpContext httpContext, IMapper mapper) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                // verify user has access to portfolio that is selected
                var selectedPortfolio = await dbContext.Portfolio
                    .Where(p => p.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(p => p.Id == budget.PortfolioId);

                // Selected portfolio not in db
                if (selectedPortfolio == null)
                    return Results.NotFound();

                // Create and save income 
                dbContext.Budget.Add(budget);
                await dbContext.SaveChangesAsync();

                var incomeDto = mapper.Map<BudgetDto>(budget);

                return Results.Created($"/incomes/{incomeDto.Id}", incomeDto);
            });

            // PUT update budget name
            group.MapPut("/{id}", async (int id, Budget budget, AppDbContext dbContext, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var existingBudget = await dbContext.Budget
                    .Where(i => i.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (existingBudget == null)
                    return Results.NotFound();

                existingBudget.Name = budget.Name;
                existingBudget.Amount = budget.Amount;

                await dbContext.SaveChangesAsync();

                return Results.Ok();
            });


            // DELETE budget
            group.MapDelete("/{id}", async (AppDbContext dbContext, int id, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var budget = await dbContext.Budget
                    .Where(b => b.Portfolio!.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(b => b.Id == id);

                if (budget == null)
                    return Results.NotFound();

                dbContext.Budget.Remove(budget);
                await dbContext.SaveChangesAsync();

                return Results.NoContent();
            });

            return group;
        }
    }
}
