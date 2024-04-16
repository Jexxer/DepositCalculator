using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace restapi.Models
{
    public enum AccountType
    {
        [Display(Name = "Checking")]
        Checking,
        [Display(Name = "Savings")]
        Savings
    }

    public class BankAccount
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public int PortfolioId { get; set; }

        [ForeignKey("PortfolioId")]
        public Portfolio? Portfolio { get; set; }

        [Required]
        public AccountType Type { get; set; }

        public ICollection<Expense>? Expenses { get; set; }

        // Checking related fields
        public bool IsRemainder { get; set; } = false;

        // Savings related fields
        public decimal Amount { get; set; } = 0.0m;
        public bool IsPercentage { get; set; } = true;
        public decimal PercentageAmount { get; set; } = 20;


        public BankAccount()
        {
            Expenses = new List<Expense>();
        }
    }
}
