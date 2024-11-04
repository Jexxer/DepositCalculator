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
    return Number(percentage.toFixed(4))

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
    const deposit = {
      aaaincome: this.name
    }
    // check for annual insurance amount
    const checkingAccounts = portfolio.bankAccounts.filter((b) => b.type === 0)
    const savingAccounts = portfolio.bankAccounts.filter((b) => b.type === 1)
    const incomesPercentage = this.getPercentageOfAllIncomes(portfolio);
    const totalAnnualInsuranceAmount = portfolio.getAnnualInsuranceAmount();

    // loop through all the banks and calc each amount
    for (const bank of checkingAccounts) {
      const banksPercentageOfExpenses = bank.getBanksPercentageOfTotalExpenses(portfolio)
      // get amount owed by percentage of income
      const amount = (bank.getTotalExpensesAnnually() * incomesPercentage) / payFrequencyMap[this.payFrequency]

      // add the amount owed for insurance insuranceAmount
      let insuranceAmount = 0;
      if (totalAnnualInsuranceAmount > 0) {
        const insuranceAmountAnnual = totalAnnualInsuranceAmount * incomesPercentage
        insuranceAmount = (insuranceAmountAnnual / payFrequencyMap[this.payFrequency]) * banksPercentageOfExpenses
      }
      deposit[bank.name] = amount + insuranceAmount;
    }

    return deposit;

  }
}
