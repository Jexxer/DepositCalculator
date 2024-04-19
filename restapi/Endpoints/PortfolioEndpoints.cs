using AutoMapper;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.DTOs;
using restapi.Models;
using System.Security.Claims;

namespace restapi.Endpoints
{
    public static class PortfolioEndpoints
    {
        public static RouteGroupBuilder MapPortfolioEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("portfolios");

            // GET for all portfolio where user has access
            group.MapGet("/", async (AppDbContext dbContext, IMapper mapper, HttpContext httpContext) =>
            {
                var user = httpContext.User;

                // Get the currently authenticated user's ID
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                // Query portfolios where UserId matches the requesting user's ID
                var portfolios = await dbContext.Portfolio
                    .Include(p => p.UserAccess)
                    .Include(p => p.BankAccounts)
                    .Include(p => p.Budgets)
                    .Include(p => p.Incomes)
                    .Include(p => p.Expenses)
                    .Where(p => p.UserAccess.Any(u => u.Id == userId))
                    .ToListAsync();

                var portfoliosDtos = mapper.Map<List<PortfolioDto>>(portfolios);

                return Results.Ok(portfoliosDtos);
            });

            // GET for single portfolio which user has access
            group.MapGet("/{id}", async (AppDbContext dbContext, IMapper mapper, int id, HttpContext httpContext) =>
            {
                // Get User
                var user = httpContext.User;

                // Get the currently authenticated user's ID
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var portfolio = await dbContext.Portfolio
                    .Include(p => p.UserAccess)
                    .Include(p => p.BankAccounts)
                    .Include(p => p.Budgets)
                    .Include(p => p.Incomes)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (portfolio == null)
                    return Results.NotFound();

                // Check if the requesting user is the owner or has access to the portfolio
                if (!portfolio.UserAccess.Any(u => u.Id == userId))
                    return Results.NotFound();

                var portfolioDto = mapper.Map<PortfolioDto>(portfolio);

                return Results.Ok(portfolioDto);
            });

            // POST for portfolio creation
            group.MapPost("/", async (AppDbContext dbContext, IMapper mapper, Portfolio portfolio, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                // Get user object
                var user = await dbContext.Users.FindAsync(userId);
                if (user == null)
                {
                    return Results.NotFound();
                }

                // Add the portfolio to the database
                portfolio.UserAccess.Add(user);
                dbContext.Portfolio.Add(portfolio);
                await dbContext.SaveChangesAsync();

                var portfolioDto = mapper.Map<PortfolioDto>(portfolio);

                // Return a response indicating the successful creation of the portfolio
                return Results.Created($"/portfolios/{portfolioDto.Id}", portfolioDto);
            });

            // Update portfolio name
            group.MapPut("/{id}/name", async (int id, string name, AppDbContext dbContext, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var existingPortfolio = await dbContext.Portfolio
                    .Where(p => p.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (existingPortfolio == null)
                    return Results.NotFound();

                existingPortfolio.Name = name;
                await dbContext.SaveChangesAsync();

                return Results.Ok();
            });

            // Update split method
            group.MapPut("/{id}/splitmethod", async (int id, int splitMethod, AppDbContext dbContext, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var existingPortfolio = await dbContext.Portfolio
                    .Where(p => p.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (existingPortfolio == null)
                    return Results.NotFound();

                if (splitMethod == 0) existingPortfolio.SplitMethod = SplitMethod.IncomeBased;
                if (splitMethod == 1) existingPortfolio.SplitMethod = SplitMethod.Equally;

                await dbContext.SaveChangesAsync();

                return Results.Ok();
            });

            // Update portfolio user access
            group.MapPut("/{id}/useraccess/add", async (int id, string email, AppDbContext dbContext, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var existingPortfolio = await dbContext.Portfolio
                    .Include(p => p.UserAccess)
                    .Include(p => p.BankAccounts)
                    .Include(p => p.Budgets)
                    .Include(p => p.Incomes)
                    .Where(p => p.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (existingPortfolio == null)
                {
                    return Results.NotFound();
                }

                var existingUser = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

                if (existingUser == null)
                {
                    return Results.NotFound();
                }

                existingPortfolio.UserAccess.Add(existingUser);

                await dbContext.SaveChangesAsync();

                return Results.Ok();
            });

            // Update portfolio user access
            group.MapPut("/{id}/useraccess/remove", async (int id, string email, AppDbContext dbContext, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var user = httpContext.User;
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var existingPortfolio = await dbContext.Portfolio
                    .Include(p => p.UserAccess)
                    .Include(p => p.BankAccounts)
                    .Include(p => p.Budgets)
                    .Include(p => p.Incomes)
                    .Where(p => p.UserAccess.Any(u => u.Id == userId))
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (existingPortfolio == null)
                {
                    return Results.NotFound();
                }

                var existingUser = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
                if (existingUser == null)
                {
                    return Results.NotFound();
                }

                existingPortfolio.UserAccess.Remove(existingUser);
                await dbContext.SaveChangesAsync();

                return Results.Ok();
            });

            // DELETE for portfolio
            group.MapDelete("/{id}", async (AppDbContext dbContext, int id) =>
            {
                var portfolio = await dbContext.Portfolio.FindAsync(id);
                if (portfolio == null)
                    return Results.NotFound();

                dbContext.Portfolio.Remove(portfolio);
                await dbContext.SaveChangesAsync();

                return Results.NoContent();
            });

            return group;
        }
    }
}
