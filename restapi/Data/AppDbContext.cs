using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using restapi.Models;

namespace restapi.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<BankAccount> BankAccount { get; set; }  // Change to singular form
        public DbSet<Budget> Budget { get; set; }            // Change to singular form
        public DbSet<Expense> Expense { get; set; }          // Change to singular form
        public DbSet<Income> Income { get; set; }            // Change to singular form
        public DbSet<Portfolio> Portfolio { get; set; }      // Change to singular form

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            BankAccount = Set<BankAccount>();
            Budget = Set<Budget>();
            Expense = Set<Expense>();
            Income = Set<Income>();
            Portfolio = Set<Portfolio>();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure primary keys for identity-related entities
            modelBuilder.Entity<IdentityUser>().HasKey(u => u.Id); // Configure key for IdentityUser

            modelBuilder.Entity<IdentityRole>().HasKey(r => r.Id);
            modelBuilder.Entity<IdentityUserClaim<string>>().HasKey(uc => uc.Id);
            modelBuilder.Entity<IdentityUserRole<string>>().HasKey(ur => new { ur.UserId, ur.RoleId });
            modelBuilder.Entity<IdentityUserLogin<string>>().HasKey(ul => new { ul.LoginProvider, ul.ProviderKey });
            modelBuilder.Entity<IdentityUserToken<string>>().HasKey(ut => new { ut.UserId, ut.LoginProvider, ut.Name });
            modelBuilder.Entity<IdentityRoleClaim<string>>().HasKey(rc => rc.Id);


            modelBuilder.Entity<Portfolio>()
                .HasMany(e => e.UserAccess)
                .WithMany(e => e.Portfolios);

            // Configure cascade delete for related entities
            modelBuilder.Entity<Portfolio>()
                .HasMany(p => p.BankAccounts)
                .WithOne(b => b.Portfolio)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Portfolio>()
                .HasMany(p => p.Budgets)
                .WithOne(b => b.Portfolio)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Portfolio>()
                .HasMany(p => p.Expenses)
                .WithOne(e => e.Portfolio)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Portfolio>()
                .HasMany(p => p.Incomes)
                .WithOne(i => i.Portfolio)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BankAccount>()
                    .HasMany(b => b.Expenses) // A BankAccount can have many Expenses
                    .WithOne(e => e.BankAccount) // An Expense points to one BankAccount
                    .HasForeignKey(e => e.BankAccountId) // Foreign key property in Expense
                    .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
