
using Microsoft.AspNetCore.Identity;
using restapi.Models;
using restapi.Data;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity.UI.Services;
using restapi.Services;

namespace restapi.Managers;

public class CustomUserManager : UserManager<ApplicationUser>
{
    private readonly AppDbContext _dbContext;
    private readonly IEmailSender _emailSender;

    public CustomUserManager(
        IUserStore<ApplicationUser> store,
        IOptions<IdentityOptions> optionsAccessor,
        IPasswordHasher<ApplicationUser> passwordHasher,
        IEnumerable<IUserValidator<ApplicationUser>> userValidators,
        IEnumerable<IPasswordValidator<ApplicationUser>> passwordValidators,
        ILookupNormalizer keyNormalizer,
        IdentityErrorDescriber errors,
        IServiceProvider services,
        ILogger<UserManager<ApplicationUser>> logger,
        AppDbContext dbContext,
        IEmailSender emailSender)
        : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
    {
        _dbContext = dbContext;
        _emailSender = emailSender;
    }

    public override async Task<IdentityResult> CreateAsync(ApplicationUser user)
    {
        var result = await base.CreateAsync(user);

        if (result.Succeeded)
        {

            // Generate email confirmation token
            var code = await GenerateEmailConfirmationTokenAsync(user);
            var callbackUrl = $"https://depositcalc.com/confirm-email?userId={user.Id}&code={Uri.EscapeDataString(code)}"; // Adjust the URL as needed

            // Send confirmation email
            await _emailSender.SendEmailAsync(user.Email!, "Confirm your email",
                $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>");


            // create default portfolio
            var portfolio = new Portfolio { Name = "My First Portfolio" };

            // Create default Checking and Saving Bank Accounts
            var checking = new BankAccount { Name = "Checking", Type = AccountType.Checking };
            var savings = new BankAccount { Name = "Savings", Type = AccountType.Savings };

            // Add newly created user to portfolio UserAccess
            portfolio.UserAccess.Add(user);

            // Add newly created bankAccounts to portfolio
            portfolio.BankAccounts.Add(checking);
            portfolio.BankAccounts.Add(savings);

            // Add portfolio to dbContext
            _dbContext.Portfolio.Add(portfolio);

            // Save DB
            await _dbContext.SaveChangesAsync();
        }

        return result;
    }
}
