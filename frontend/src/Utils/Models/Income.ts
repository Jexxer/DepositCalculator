import { BankAccount } from "./BankAccount";
import { IncomeType } from "@/Types";
import { expenseFrequencyMap, payFrequencyMap } from "@Utils";
import { Portfolio } from "./Portfolio";

export class Income {
  id: number;
  amount: number;
  name: string;
  portfolioId: number;
  payFrequency: number;
  isInsuranceProvider: boolean;
  insuranceAmount: number;
  bankAccount: BankAccount;

  constructor(income: IncomeType) {
    this.id = income.id;
    this.amount = income.amount;
    this.name = income.name;
    this.portfolioId = income.portfolioId;
    this.payFrequency = income.payFrequency;
    this.isInsuranceProvider = income.isInsuranceProvider;
    this.insuranceAmount = income.insuranceAmount;
    this.bankAccount = new BankAccount(income.bankAccount);
  }

  getAnnualIncome(): number {
    const frequency = payFrequencyMap[this.payFrequency];
    return this.amount * frequency;
  }

  getPercentageOfAllIncomes(portfolio: Portfolio): number {
    const portfoliosTotalAnnualIncome = portfolio.incomes.reduce((total, income) => {
      const incomesAnnualAmount = (income.amount + income.insuranceAmount) * payFrequencyMap[income.payFrequency]
      return total += incomesAnnualAmount
    }, 0)
    const incomesAnnualAmount = (this.amount + this.insuranceAmount) * payFrequencyMap[this.payFrequency]
    const percentage = Number((incomesAnnualAmount / portfoliosTotalAnnualIncome))
    return Number(percentage.toFixed(2))

  }

  getRemainingAnnually(portfolio: Portfolio): number {
    let totalPortfolioIncome = portfolio.getTotalIncomeAnnually();
    const name = this.name
    const totalExpenses = portfolio.getTotalExpensesAnnual();
    const totalSavings = portfolio.getTotalAnnualSavings()
    const percentage = this.getPercentageOfAllIncomes(portfolio)
    const remainingAnnual = Number(((totalPortfolioIncome - totalExpenses - totalSavings) * percentage).toFixed(2))
    const payFrequency = payFrequencyMap[this.payFrequency]
    const remaining = Number((remainingAnnual / payFrequency).toFixed(2))
    return remaining
  }

  generateDepositPercent(portfolio: Portfolio) {
    // get the income percentage split with insurance included for fairness
    const percentage = this.getPercentageOfAllIncomes(portfolio);

    // loop through all bank accounts and update obj
    const depositInfo = {}
    for (const bank of portfolio.bankAccounts) {
      if (bank.type === 0) {
        const banksAnnualExpensesAmount = bank.expenses.reduce((total, expense) => {
          const amount = expense.amount
          const frequency = expenseFrequencyMap[expense.frequency]
          return total += amount * frequency
        }, 0)
        console.log(bank.name, banksAnnualExpensesAmount)
        const amountResponsibleFor = banksAnnualExpensesAmount * percentage
        depositInfo[bank.name] = amountResponsibleFor / payFrequencyMap[this.payFrequency]
      } else if (bank.type === 1) {
        const annualSavingAmount = portfolio.getTotalAnnualSavings()
        const amountResponsibleFor = annualSavingAmount * percentage;
        depositInfo[bank.name] = amountResponsibleFor / payFrequencyMap[this.payFrequency]
      }
    }
    const remaining = this.getRemainingAnnually(portfolio)
    depositInfo[this.bankAccount.name] = remaining
    depositInfo["percentage"] = percentage
    console.log(this.name, depositInfo)

  }
}
