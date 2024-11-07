import Dinero from "dinero.js";
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

  getTotalExpensesAnnual(): Dinero.Dinero {
    let totalExpenses = Dinero({ amount: 0 });
    for (const expense of this.expenses) {
      const frequency = expenseFrequencyMap[expense.frequency]
      const amount = Dinero({ amount: Math.round(expense.amount * 100) })
      const annualAmount = amount.multiply(frequency)
      totalExpenses = totalExpenses.add(annualAmount)
    }
    return totalExpenses
  }

  getTotalExpensesMonthly(): Dinero.Dinero {
    return this.getTotalExpensesAnnual().divide(12)
  }

  getTotalIncomeAnnually(): Dinero.Dinero {
    let totalIncome = Dinero({ amount: 0 })
    for (const income of this.incomes) {
      const frequency = payFrequencyMap[income.payFrequency]
      const amount = Dinero({ amount: income.amount })
      const annualAmount = amount.multiply(frequency)
      totalIncome = totalIncome.add(annualAmount)
    }
    return totalIncome
  }

  getTotalIncomeAnnuallyWithInsurance(): Dinero.Dinero {
    let totalIncome = Dinero({ amount: 0 })
    for (const income of this.incomes) {
      const frequency = payFrequencyMap[income.payFrequency]
      const amount = Dinero({ amount: income.amount + income.insuranceAmount })
      const annualAmount = amount.multiply(frequency)
      totalIncome = totalIncome.add(annualAmount)
    }
    return totalIncome
  }

  getTotalIncomeMonthly(): Dinero.Dinero {
    return this.getTotalIncomeAnnually().divide(12)
  }

  getPercentageOfIncome(income: Income): number {
    // Get total income of portfolio
    const totalIncomeAnnual = this.getTotalIncomeAnnuallyWithInsurance()

    // calculate this incomes total annual amount with insurance
    const amount = Dinero({ amount: income.amount })
    const insuranceAmount = Dinero({ amount: income.insuranceAmount })
    const totalAmount = amount.add(insuranceAmount)
    const frequency = payFrequencyMap[income.payFrequency]
    const totalAnnualAmount = totalAmount.multiply(frequency)

    const percentage = (totalAnnualAmount.getAmount() / totalIncomeAnnual.getAmount()) * 100
    return percentage;
  }

  getBanksPercentageOfTotalExpenses(bank: BankAccount): number {
    if (bank.isRemainder || bank.type === 1) return 0;
    const totalExpenses = this.getTotalExpensesAnnual()
    const banksTotalExpenses = Dinero({ amount: 0 });
    for (const expense of bank.expenses) {
      const frequency = expenseFrequencyMap[expense.frequency]
      const amount = Dinero({ amount: bank.amount })
      const yearlyAmount = amount.multiply(frequency)
      banksTotalExpenses.add(yearlyAmount)
    }
    const percentage = (banksTotalExpenses.getAmount() / totalExpenses.getAmount()) * 100
    return percentage
  }

  getTotalAnnualSavings(): Dinero.Dinero {
    const totalSavings = Dinero({ amount: 0 });
    for (const bank of this.bankAccounts) {
      if (bank.type === 1) {
        if (bank.isPercentage) {
          const totalIncome = this.getTotalIncomeAnnually()
          const banksPercentage = totalIncome.percentage(bank.percentageAmount)
          totalSavings.add(banksPercentage)
        } else {
          const staticSavingAmount = Dinero({ amount: bank.amount })
          const annualSavingsAmount = staticSavingAmount.multiply(12) // 12 months
          totalSavings.add(annualSavingsAmount)
        }
      }
    }
    return totalSavings;
  }

  getTotalMonthlySavings(): Dinero.Dinero {
    return this.getTotalAnnualSavings().divide(12);
  }


  getAnnualInsuranceAmount(): Dinero.Dinero {
    let amount = Dinero({ amount: 0 });
    for (const income of this.incomes) {
      if (income.isInsuranceProvider) {
        const incomeAmount = Dinero({ amount: income.insuranceAmount })
        const frequency = payFrequencyMap[income.payFrequency]
        const annualAmount = incomeAmount.multiply(frequency)
        amount = amount.add(annualAmount)
      }
    }
    return amount;
  }

}
