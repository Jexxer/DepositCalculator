using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Models;

public class UpdateUserMiddleware
{
    private readonly RequestDelegate _next;

    public UpdateUserMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context, AppDbContext dbContext)
    {
        Console.WriteLine("MiddleWare has been triggered");
        await _next(context);

        if (context.Request.Path.StartsWithSegments("/register") && context.Request.Method == "POST")
        {
            Console.WriteLine("Path /register found.");
            var email = context.Request.Query["email"].ToString();
            var firstName = context.Request.Query["firstName"].ToString();
            var lastName = context.Request.Query["lastName"].ToString();

            // Query user by email
            ApplicationUser? user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user != null)
            {
                if (!string.IsNullOrEmpty(firstName) && !string.IsNullOrEmpty(lastName))
                {
                    user.FirstName = firstName;
                    user.LastName = lastName;
                    await dbContext.SaveChangesAsync();
                    Console.WriteLine("Saved Changes");
                }
            }

        }
    }

    // Define a data structure to represent the form data
    private class FormData
    {
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
