namespace restapi.DTOs
{
    public class IncomeDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string? Name { get; set; }
        public int PortfolioId { get; set; }
        public int PayFrequency { get; set; }
        public bool IsInsuranceProvider { get; set; }
        public decimal InsuranceAmount { get; set; }
        public BankAccountDto? BankAccount { get; set; }
    }
}
