import { BankAccount } from "./BankAccount";
import { IncomeType } from "@/Types";
import { payFrequencyMap } from "@Utils";

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
}
