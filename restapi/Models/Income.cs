using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace restapi.Models
{
    public class Income
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
        public PayFrequency PayFrequency { get; set; }

        public bool IsInsuranceProvider { get; set; } = false;
        public decimal InsuranceAmount { get; set; } = 0.0m;

        public int? BankAccountId { get; set; }

        [ForeignKey("BankAccountId")]
        public BankAccount? BankAccount { get; set; }


    }

    // Enum for PayFrequency
    public enum PayFrequency
    {
        [Display(Name = "Weekly")]
        Weekly,

        [Display(Name = "Bi-weekly")]
        BiWeekly,

        [Display(Name = "Bi-monthly")]
        BiMonthly
    }
}
