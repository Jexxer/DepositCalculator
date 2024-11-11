
using System.Diagnostics;
using System.Security.Claims;
using System.Text.Json.Serialization;
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

            group.MapPost("/reset-password", async (UserManager<ApplicationUser> userManager, IEmailSender emailSender, EmailPost post) =>
            {
                // Find the user by email
                var user = await userManager.FindByEmailAsync(post.Email);
                if (user == null)
                {
                    return Results.BadRequest("User not found.");
                }

                // Generate password reset token
                var code = await userManager.GeneratePasswordResetTokenAsync(user);
                var callbackUrl = $"https://depositcalc.com/reset-password-confirm?userId={user.Id}&code={Uri.EscapeDataString(code)}";

                // Send password reset email
                await emailSender.SendEmailAsync(user.Email!, "Reset your password",
                    $"Please reset your password by clicking this link: <a href='{callbackUrl}'>link</a>");

                return Results.Ok("Password reset email sent.");
            });

            group.MapPost("/reset-password-confirm", async (UserManager<ApplicationUser> userManager, ResetPasswordConfirmPost post) =>
            {
                // Find the user by userId
                var user = await userManager.FindByIdAsync(post.UserId);
                if (user == null)
                {
                    return Results.NotFound("User not found.");
                }

                // Decode the token
                var decodedCode = Uri.UnescapeDataString(post.Code);

                // Reset the password
                var result = await userManager.ResetPasswordAsync(user, decodedCode, post.NewPassword);
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

class EmailPost
{
    [JsonPropertyName("email")]
    public required string Email { get; set; }
}

class ResetPasswordConfirmPost
{
    [JsonPropertyName("userId")]
    public required string UserId { get; set; }

    [JsonPropertyName("code")]
    public required string Code { get; set; }

    [JsonPropertyName("newPassword")]
    public required string NewPassword { get; set; }
}