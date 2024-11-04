import { BankAccountType, ExpenseType } from "@/Types";
import { expenseFrequencyMap } from "@Utils";
import { Portfolio } from "./Portfolio";

export class BankAccount {
  id: number;
  name: string;
  portfolioId: number;
  type: number;
  isRemainder: boolean;
  amount: number;
  isPercentage: boolean;
  percentageAmount: number;
  expenses: ExpenseType[];

  constructor(bankAccount: BankAccountType) {
    this.id = bankAccount.id;
    this.name = bankAccount.name;
    this.portfolioId = bankAccount.portfolioId;
    this.type = bankAccount.type;
    this.isRemainder = bankAccount.isRemainder;
    this.amount = bankAccount.amount;
    this.isPercentage = bankAccount.isPercentage;
    this.percentageAmount = bankAccount.percentageAmount;
    this.expenses = bankAccount.expenses;
  }

  getTotalExpensesAnnually(): number {
    return this.expenses.reduce((total, expense) => {
      const frequency = expenseFrequencyMap[expense.frequency];
      return total + expense.amount * frequency;
    }, 0);
  }

  getTotalExpensesMonthly(): number {
    return Number((this.getTotalExpensesAnnually() / 12).toFixed(2))
  }

  getBanksPercentageOfTotalExpenses(portfolio: Portfolio): number {
    const totalExpensesAnnually = portfolio.getTotalExpensesAnnual()
    const banksExpenses = this.getTotalExpensesAnnually()
    return Number((banksExpenses / totalExpensesAnnually).toFixed(2))
  }

}
