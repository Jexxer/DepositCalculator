import expenseFrequencyMap from "../expenseFrequencyMap";
import payFrequencyMap from "../payFrequencyMap";
import { BankAccount } from "./BankAccount";
import { Income } from "./Income";
import { PortfolioType, ExpenseType } from "@/Types";

export class Portfolio {
  id: number;
  name: string;
  splitMethod: number;
  bankAccounts: BankAccount[];
  budgets: any[];
  expenses: ExpenseType[];
  incomes: Income[];

  constructor(portfolio: PortfolioType) {
    this.id = portfolio.id;
    this.name = portfolio.name;
    this.splitMethod = portfolio.splitMethod;
    this.bankAccounts = portfolio.bankAccounts.map(ba => new BankAccount(ba));
    this.budgets = portfolio.budgets;
    this.expenses = portfolio.expenses;
    this.incomes = portfolio.incomes.map(income => new Income(income));
  }

  getBankAccounts(): BankAccount[] {
    return this.bankAccounts;
  }

  getTotalExpensesAnnual(): number {
    let totalExpenses = 0;
    for (const expense of this.expenses) {
      const frequency = expenseFrequencyMap[expense.frequency]
      totalExpenses += expense.amount * frequency
    }
    return Number(totalExpenses.toFixed(2))
  }

  getTotalExpensesMonthly(): number {
    return Number((this.getTotalExpensesAnnual() / 12).toFixed(2))
  }

  getTotalIncomeAnnually(): number {
    let totalIncome = 0;
    for (const income of this.incomes) {
      const frequency = payFrequencyMap[income.payFrequency]
      totalIncome += income.amount * frequency
    }
    return Number(totalIncome.toFixed(2))
  }

  getTotalIncomeAnnuallyWithInsurance(): number {
    let totalIncome = 0;
    for (const income of this.incomes) {
      const frequency = payFrequencyMap[income.payFrequency]
      totalIncome += (income.amount * income.insuranceAmount) * frequency
    }
    return Number(totalIncome.toFixed(2))
  }

  getTotalIncomeMonthly(): number {
    let totalIncome = 0;
    for (const income of this.incomes) {
      const frequency = payFrequencyMap[income.payFrequency]
      totalIncome += (income.amount * frequency) / 12
    }
    return Number(totalIncome.toFixed(2))
  }

  getPercentageOfIncome(income: Income): number {
    const totalIncomeAnnual = this.getTotalIncomeAnnually()
    const incomeWithInsuranceAnnual = (income.amount + income.insuranceAmount) * payFrequencyMap[income.payFrequency]
    const percentage = (incomeWithInsuranceAnnual / totalIncomeAnnual) * 100
    return Number(percentage.toFixed(2));
  }

  getBanksPercentageOfTotalExpenses(bank: BankAccount): number {
    if (bank.isRemainder || bank.type === 1) return 0;
    const totalExpenses = this.getTotalExpensesAnnual()
    let banksTotalExpenses = 0;
    for (const expense of bank.expenses) {
      banksTotalExpenses += (expense.amount * expenseFrequencyMap[expense.frequency])
    }
    const percentage = (banksTotalExpenses / totalExpenses) * 100
    return Number(percentage.toFixed(2))
  }

  getTotalMonthlySavings(): number {
    let totalSavings = 0;
    for (const bank of this.bankAccounts) {
      if (bank.type === 1) {
        if (bank.isPercentage) {
          const totalIncome = this.getTotalIncomeAnnually()
          totalSavings += totalIncome * (bank.percentageAmount / 100)
        } else {
          totalSavings += bank.amount
        }
      }
    }
    return Number((totalSavings / 12).toFixed(2));
  }

  getTotalAnnualSavings(): number {
    let totalSavings = 0;
    for (const bank of this.bankAccounts) {
      if (bank.type === 1) {
        if (bank.isPercentage) {
          const totalIncome = this.getTotalIncomeAnnually()
          totalSavings += totalIncome * (bank.percentageAmount / 100)
        } else {
          totalSavings += bank.amount * 12
        }
      }
    }
    return Number((totalSavings).toFixed(2));
  }

}
