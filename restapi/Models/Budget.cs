using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace restapi.Models
{
    public class Budget
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
    }
}
