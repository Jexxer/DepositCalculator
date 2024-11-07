import { BankAccount } from "./BankAccount";
import { IncomeType } from "@/Types";
import { payFrequencyMap } from "@Utils";
import { Portfolio } from "./Portfolio";
import Dinero from "dinero.js";

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
    this.amount = income.amount * 100;
    this.name = income.name;
    this.portfolioId = income.portfolioId;
    this.payFrequency = income.payFrequency;
    this.isInsuranceProvider = income.isInsuranceProvider;
    this.insuranceAmount = income.insuranceAmount * 100;
    this.bankAccount = new BankAccount(income.bankAccount);
  }

  getAnnualIncome(): Dinero.Dinero {
    const frequency = payFrequencyMap[this.payFrequency];
    const amount = Dinero({ amount: this.amount })
    return amount.multiply(frequency);
  }

  getAnnualIncomeWithInsurance(): Dinero.Dinero {
    const frequency = payFrequencyMap[this.payFrequency];
    const amount = Dinero({ amount: this.amount + this.insuranceAmount })
    return amount.multiply(frequency);
  }

  getPercentageOfAllIncomes(portfolio: Portfolio): number {
    const portfoliosTotalAnnualIncome = portfolio.getTotalIncomeAnnuallyWithInsurance()
    const incomesAnnualAmount = this.getAnnualIncomeWithInsurance()
    const percentage = incomesAnnualAmount.getAmount() / portfoliosTotalAnnualIncome.getAmount()
    return percentage
  }

  getRemainingAnnually(portfolio: Portfolio): Dinero.Dinero {
    let totalPortfolioIncome = portfolio.getTotalIncomeAnnually();
    const totalExpenses = portfolio.getTotalExpensesAnnual();
    const totalSavings = portfolio.getTotalAnnualSavings()
    const percentage = this.getPercentageOfAllIncomes(portfolio)
    const remainingAnnual = totalPortfolioIncome
      .subtract(totalExpenses)
      .subtract(totalSavings)
      .multiply(percentage)
    const payFrequency = payFrequencyMap[this.payFrequency]
    const remainingMonthly = remainingAnnual.divide(payFrequency)
    return remainingMonthly
  }

  getRemainingAccount(portfolio: Portfolio) {
    return portfolio.bankAccounts.find((b) => b.id === this.bankAccount.id)
  }

  generateDepositPercent(portfolio: Portfolio) {
    const deposit = {
      aaaincome: this.name
    }

    let remainder = this.amount
    const paychecksPerYear = payFrequencyMap[this.payFrequency]
    const percentageOfIncomes = this.getPercentageOfAllIncomes(portfolio)
    const totalAnnualInsuranceCost = portfolio.getAnnualInsuranceAmount().getAmount()
    const insuranceOwedAnnually = Math.round(portfolio.getAnnualInsuranceAmount().getAmount() * percentageOfIncomes)

    for (const bank of portfolio.bankAccounts) {
      // Expenses
      if (bank.type === 0) {
        const totalBankExpenses = bank.getTotalExpensesAnnually()
        const percentageOfAllExpenses = bank.getBanksPercentageOfTotalExpenses(portfolio)
        const annualOwed = totalBankExpenses.getAmount() * percentageOfIncomes

        // important
        const banksDepositPreInsuranceAdjustment = Math.round(annualOwed / payFrequencyMap[this.payFrequency])


        if (this.isInsuranceProvider) {
          const insurancePerPayPeriod = (totalAnnualInsuranceCost - insuranceOwedAnnually) / paychecksPerYear
          const insuranceAdjustment = insurancePerPayPeriod * percentageOfAllExpenses
          const depositAmount = banksDepositPreInsuranceAdjustment - insuranceAdjustment
          remainder -= depositAmount
          deposit[bank.name] = Math.round(depositAmount) / 100
        } else {
          const insurancePerPayPeriod = insuranceOwedAnnually / paychecksPerYear
          const insuranceAdjustment = insurancePerPayPeriod * percentageOfAllExpenses
          const depositAmount = banksDepositPreInsuranceAdjustment + insuranceAdjustment
          remainder -= depositAmount
          deposit[bank.name] = Math.round(depositAmount) / 100
        }
      }

      // Savings
      if (bank.type === 1) {
        if (bank.isPercentage) {
          const totalPortfolioIncome = portfolio.getTotalIncomeAnnually().getAmount()
          const annuallyOwed = totalPortfolioIncome * (bank.percentageAmount / 100)
          const portionResponsibleFor = annuallyOwed * percentageOfIncomes
          const owedPerPayCheck = Math.round(portionResponsibleFor / paychecksPerYear)
          remainder -= owedPerPayCheck
          deposit[bank.name] = owedPerPayCheck / 100
        } else {
          const annuallyOwed = bank.amount * 12
          const portionResponsibleFor = annuallyOwed * percentageOfIncomes
          const owedPerPayCheck = Math.round(portionResponsibleFor / paychecksPerYear)
          remainder -= owedPerPayCheck
          deposit[bank.name] = owedPerPayCheck / 100
        }
      }
    }


    const remainingAccountName = this.getRemainingAccount(portfolio)?.name
    if (remainingAccountName) {
      deposit[remainingAccountName] = Math.round(remainder) / 100
    }
    return deposit;
  }

  generateDepositEqual(portfolio: Portfolio) {
    const deposit = {
      aaaincome: this.name
    }

    let remainder = this.amount
    const paychecksPerYear = payFrequencyMap[this.payFrequency]
    const percentageOfIncomes = 1 / portfolio.incomes.length
    const totalAnnualInsuranceCost = portfolio.getAnnualInsuranceAmount().getAmount()
    const insuranceOwedAnnually = Math.round(portfolio.getAnnualInsuranceAmount().getAmount() * percentageOfIncomes)

    for (const bank of portfolio.bankAccounts) {
      // Expenses
      if (bank.type === 0) {
        const totalBankExpenses = bank.getTotalExpensesAnnually()
        const percentageOfAllExpenses = bank.getBanksPercentageOfTotalExpenses(portfolio)
        const annualOwed = totalBankExpenses.getAmount() * percentageOfIncomes

        // important
        const banksDepositPreInsuranceAdjustment = Math.round(annualOwed / payFrequencyMap[this.payFrequency])


        if (this.isInsuranceProvider) {
          const insurancePerPayPeriod = (totalAnnualInsuranceCost - insuranceOwedAnnually) / paychecksPerYear
          const insuranceAdjustment = insurancePerPayPeriod * percentageOfAllExpenses
          const depositAmount = banksDepositPreInsuranceAdjustment - insuranceAdjustment
          remainder -= depositAmount
          deposit[bank.name] = Math.round(depositAmount) / 100
        } else {
          const insurancePerPayPeriod = insuranceOwedAnnually / paychecksPerYear
          const insuranceAdjustment = insurancePerPayPeriod * percentageOfAllExpenses
          const depositAmount = banksDepositPreInsuranceAdjustment + insuranceAdjustment
          remainder -= depositAmount
          deposit[bank.name] = Math.round(depositAmount) / 100
        }
      }

      // Savings
      if (bank.type === 1) {
        if (bank.isPercentage) {
          const totalPortfolioIncome = portfolio.getTotalIncomeAnnually().getAmount()
          const annuallyOwed = totalPortfolioIncome * (bank.percentageAmount / 100)
          const portionResponsibleFor = annuallyOwed * percentageOfIncomes
          const owedPerPayCheck = Math.round(portionResponsibleFor / paychecksPerYear)
          remainder -= owedPerPayCheck
          deposit[bank.name] = owedPerPayCheck / 100
        } else {
          const annuallyOwed = bank.amount * 12
          const portionResponsibleFor = annuallyOwed * percentageOfIncomes
          const owedPerPayCheck = Math.round(portionResponsibleFor / paychecksPerYear)
          remainder -= owedPerPayCheck
          deposit[bank.name] = owedPerPayCheck / 100
        }
      }
    }


    const remainingAccountName = this.getRemainingAccount(portfolio)?.name
    if (remainingAccountName) {
      deposit[remainingAccountName] = Math.round(remainder) / 100
    }
    return deposit;

  }

  generateDeposit(portfolio: Portfolio) {
    const splitMethod = portfolio.splitMethod
    if (splitMethod === 0) return this.generateDepositPercent(portfolio)
    if (splitMethod === 1) return this.generateDepositEqual(portfolio)
  }
}

