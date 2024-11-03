import { BankAccountType, ExpenseType } from "@/Types";
import { expenseFrequencyMap } from "@Utils";

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

  getTotalExpenses(): number {
    return this.expenses.reduce((total, expense) => {
      const frequency = expenseFrequencyMap[expense.frequency];
      return total + expense.amount * frequency;
    }, 0);
  }
}
