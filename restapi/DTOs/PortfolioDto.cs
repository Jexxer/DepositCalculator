namespace restapi.DTOs
{
    public class PortfolioDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public ICollection<ApplicationUserDto>? UserAccess { get; set; }
        public ICollection<BankAccountDto>? BankAccounts { get; set; }
        public ICollection<BudgetDto>? Budgets { get; set; }
        public ICollection<ExpenseDto>? Expenses { get; set; }
        public ICollection<IncomeDto>? Incomes { get; set; }
    }
}
