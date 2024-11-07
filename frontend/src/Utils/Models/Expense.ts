import { ExpenseType } from "@/Types";
import { expenseFrequencyMap } from "@Utils"
import Dinero from "dinero.js";

export class Expense {
  id: number;
  name: string;
  amount: number;
  frequency: number;
  bankAccountId: number;

  constructor(expense: ExpenseType) {
    this.id = expense.id;
    this.name = expense.name;
    this.amount = expense.amount * 100;
    this.frequency = expense.frequency;
    this.bankAccountId = expense.bankAccountId;
  }

  getAnnualExpense(): Dinero.Dinero {
    const frequency = expenseFrequencyMap[this.frequency];
    const amount = Dinero({ amount: this.amount })
    return amount.multiply(frequency);
  }
}
