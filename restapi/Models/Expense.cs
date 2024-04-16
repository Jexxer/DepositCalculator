using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace restapi.Models
{
    public class Expense
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public int PortfolioId { get; set; }

        [ForeignKey("PortfolioId")]
        public Portfolio? Portfolio { get; set; }

        [Required]
        public Frequency Frequency { get; set; }

        [Required]
        public int BankAccountId { get; set; }

        [ForeignKey("BankAccountId")]
        public BankAccount? BankAccount { get; set; }
    }

    // Enum for Frequency
    public enum Frequency
    {
        [Display(Name = "Monthly")]
        Monthly,

        [Display(Name = "Quarterly")]
        Quarterly,

        [Display(Name = "Annually")]
        Annually
    }
}
