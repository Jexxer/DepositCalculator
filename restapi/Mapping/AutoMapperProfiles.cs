using AutoMapper;
using restapi.DTOs;
using restapi.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<PortfolioDto, Portfolio>();
        CreateMap<Portfolio, PortfolioDto>();

        CreateMap<ApplicationUserDto, ApplicationUser>();
        CreateMap<ApplicationUser, ApplicationUserDto>();

        CreateMap<Budget, BudgetDto>();
        CreateMap<BudgetDto, Budget>();

        // Mapping from Income to IncomeDTO
        CreateMap<Income, IncomeDto>();

        // Mapping from Expense to ExpenseDto
        CreateMap<Expense, ExpenseDto>();

        // Mapping from BankAccount to BankAccountDto
        CreateMap<BankAccount, BankAccountDto>();
    }
}
