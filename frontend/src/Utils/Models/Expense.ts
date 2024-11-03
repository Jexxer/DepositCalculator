import { ExpenseType } from "@/Types";
import { expenseFrequencyMap } from "@Utils"

export class Expense {
  id: number;
  name: string;
  amount: number;
  frequency: number;
  bankAccountId: number;

  constructor(expense: ExpenseType) {
    this.id = expense.id;
    this.name = expense.name;
    this.amount = expense.amount;
    this.frequency = expense.frequency;
    this.bankAccountId = expense.bankAccountId;
  }

  getAnnualExpense(): number {
    const frequency = expenseFrequencyMap[this.frequency];
    return this.amount * frequency;
  }
}
