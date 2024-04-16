using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace restapi.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<Portfolio>? Portfolios { get; set; }

        [Required]
        public string FirstName { get; set; } = "";

        [Required]
        public string LastName { get; set; } = "";
    }
}
