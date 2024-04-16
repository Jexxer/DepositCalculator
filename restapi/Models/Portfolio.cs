using System.ComponentModel.DataAnnotations;

namespace restapi.Models
{
    public class Portfolio
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        // Navigation properties for related models
        public ICollection<Income> Incomes { get; set; }
        public ICollection<BankAccount> BankAccounts { get; set; }
        public ICollection<Expense> Expenses { get; set; }
        public ICollection<Budget> Budgets { get; set; }

        // field for users who also have access to the portfolio
        public ICollection<ApplicationUser> UserAccess { get; set; }

        // Constructor to initialize collections
        public Portfolio()
        {
            Incomes = new List<Income>();
            BankAccounts = new List<BankAccount>();
            Expenses = new List<Expense>();
            Budgets = new List<Budget>();
            UserAccess = new List<ApplicationUser>();

        }
    }
}

// Enum for Frequency
public enum SplitMethod
{
    Single,
    IncomeBased,
    EquallyExpense,
    EquallyRemainder,
}
