using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Endpoints;
using restapi.Models;
using restapi.Managers;

var builder = WebApplication.CreateBuilder(args);


// Authorization
builder.Services.AddAuthorization();

// Get connection from Environment
var connectionString = Environment.GetEnvironmentVariable("CONNSTRING");

// Configure DbContext with PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Configure identity database access via EF Core, using custom ApplicationUser
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    // Configure identity options if needed
})
.AddEntityFrameworkStores<AppDbContext>()
.AddUserManager<CustomUserManager>()
.AddDefaultTokenProviders()
.AddDefaultUI();

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.MapBankAccountEndpoints().RequireAuthorization();
app.MapBudgetEndpoints().RequireAuthorization();
app.MapExpenseEndpoints().RequireAuthorization();
app.MapIncomeEndpoints().RequireAuthorization();
app.MapPortfolioEndpoints().RequireAuthorization();
app.MapAuthEndpoints().RequireAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());
app.UseAuthorization();

// Middleware for adding first and last names
app.UseMiddleware<UpdateUserMiddleware>();

// Use custom ApplicationUser in Identity API
app.MapIdentityApi<ApplicationUser>();

app.Run();

