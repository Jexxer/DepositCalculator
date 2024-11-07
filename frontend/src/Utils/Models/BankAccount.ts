import { BankAccountType, ExpenseType } from "@/Types";
import { expenseFrequencyMap } from "@Utils";
import { Portfolio } from "./Portfolio";
import Dinero from "dinero.js";

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
    this.amount = Math.round(bankAccount.amount * 100);
    this.isPercentage = bankAccount.isPercentage;
    this.percentageAmount = bankAccount.percentageAmount;
    this.expenses = bankAccount.expenses;
  }

  getTotalExpensesAnnually(): Dinero.Dinero {
    let expenseTotal = Dinero({ amount: 0 })
    for (const expense of this.expenses) {
      const amount = Dinero({ amount: Math.round(expense.amount * 100) })
      const frequency = expenseFrequencyMap[expense.frequency]
      const annualAmount = amount.multiply(frequency)
      expenseTotal = expenseTotal.add(annualAmount)
    }
    return expenseTotal
  }

  getTotalExpensesMonthly(): Dinero.Dinero {
    return this.getTotalExpensesAnnually().divide(12)
  }

  getBanksPercentageOfTotalExpenses(portfolio: Portfolio): number {
    const totalExpensesAnnually = portfolio.getTotalExpensesAnnual()
    const banksExpenses = this.getTotalExpensesAnnually()
    return banksExpenses.getAmount() / totalExpensesAnnually.getAmount()
  }

}
