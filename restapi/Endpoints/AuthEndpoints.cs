
using System.Security.Claims;
using AutoMapper;
using restapi.Data;
using restapi.DTOs;

namespace restapi.Endpoints
{
    public static class AuthEndpoints
    {
        public static RouteGroupBuilder MapAuthEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("check-token");

            group.MapGet("/", async (AppDbContext dbContext, HttpContext httpContext, IMapper mapper) =>
            {
                // Get the currently authenticated user's ID
                var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                // Get user object
                var user = await dbContext.Users.FindAsync(userId);
                if (user == null)
                {
                    return Results.NotFound();
                }
                var userDto = mapper.Map<ApplicationUserDto>(user);

                return Results.Ok(userDto);
            });

            group.MapPut("/updatename", async (AppDbContext dbContext, string firstName, string lastName, HttpContext httpContext) =>
            {
                // Get the currently authenticated user's ID
                var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                // Get user object
                var user = await dbContext.Users.FindAsync(userId);
                if (user == null)
                {
                    return Results.NotFound();
                }

                // update names
                user.FirstName = firstName;
                user.LastName = lastName;

                await dbContext.SaveChangesAsync();

                return Results.Ok();
            });

            group.MapGet("/logout", (HttpContext httpContext) =>
            {
                httpContext.Response.Cookies.Delete(".AspNetCore.Identity.Application");
                return Results.NoContent();
            });

            return group;
        }
    }
}
