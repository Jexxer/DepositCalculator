
using System.Diagnostics;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using restapi.Data;
using restapi.DTOs;
using restapi.Models;

namespace restapi.Endpoints
{
    public static class AuthEndpoints
    {
        public static RouteGroupBuilder MapAuthEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("auth");

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

            group.MapPost("/confirm-email", async (UserManager<ApplicationUser> userManager, IEmailSender emailSender, string userId, string code) =>
            {
                // Find the user by userId
                var user = await userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return Results.NotFound("User not found.");
                }

                // Confirm email using the provided token
                var result = await userManager.ConfirmEmailAsync(user, code);
                if (result.Succeeded)
                {
                    return Results.Ok("Email confirmed successfully.");
                }

                return Results.BadRequest("Error confirming email.");
            });

            group.MapPost("/reset-password", async (UserManager<ApplicationUser> userManager, IEmailSender emailSender, string email) =>
            {
                // Find the user by email
                var user = await userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    return Results.BadRequest("User not found.");
                }

                // Generate password reset token
                var code = await userManager.GeneratePasswordResetTokenAsync(user);
                var callbackUrl = $"https://localhost:5045/reset-password?userId={user.Id}&code={Uri.EscapeDataString(code)}";

                // Send password reset email
                await emailSender.SendEmailAsync(user.Email!, "Reset your password",
                    $"Please reset your password by clicking this link: <a href='{callbackUrl}'>link</a>");

                return Results.Ok("Password reset email sent.");
            });

            group.MapPost("/reset-password-confirm", async (UserManager<ApplicationUser> userManager, string userId, string code, string newPassword) =>
            {
                // Find the user by userId
                var user = await userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return Results.NotFound("User not found.");
                }

                // Decode the token
                var decodedCode = Uri.UnescapeDataString(code);

                // Reset the password
                var result = await userManager.ResetPasswordAsync(user, decodedCode, newPassword);
                if (result.Succeeded)
                {
                    return Results.Ok("Password reset successfully.");
                }

                // Log errors if any
                foreach (var error in result.Errors)
                {
                    Console.WriteLine(error.Description);
                }

                return Results.BadRequest("Error resetting password.");
            });




            return group;
        }
    }
}
