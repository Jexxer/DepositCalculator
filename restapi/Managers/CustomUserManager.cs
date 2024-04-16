
using Microsoft.AspNetCore.Identity;
using restapi.Models;
using restapi.Data;
using Microsoft.Extensions.Options;

namespace restapi.Managers;

public class CustomUserManager : UserManager<ApplicationUser>
{
    private readonly AppDbContext _dbContext;

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
        AppDbContext dbContext)
        : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
    {
        _dbContext = dbContext;
    }

    public override async Task<IdentityResult> CreateAsync(ApplicationUser user)
    {
        var result = await base.CreateAsync(user);

        if (result.Succeeded)
        {
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
