namespace restapi.DTOs
{
    public class BankAccountDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int PortfolioId { get; set; }
        public int Type { get; set; }
        public bool IsRemainder { get; set; }
        public decimal Amount { get; set; }
        public bool IsPercentage { get; set; }
        public decimal PercentageAmount { get; set; }
        public ICollection<ExpenseDto>? Expenses { get; set; }
    }
}
