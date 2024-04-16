namespace restapi.DTOs
{
    public class BudgetDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int PortfolioId { get; set; }
        public decimal Amount { get; set; }
    }
}
