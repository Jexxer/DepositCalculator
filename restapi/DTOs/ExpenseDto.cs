namespace restapi.DTOs
{
    public class ExpenseDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int PortfolioId { get; set; }
        public decimal Amount { get; set; }
        public int Frequency { get; set; }
        public int BankAccountId { get; set; }
    }
}
