export type UserType = {
  id: number;
  userName: string;
  firstName: string;
  lastname: string;
  email: string;
};
export type IncomeType = {
  id: number;
  name: string;
  amount: number;
  payFrequency: number;
  portfolioId: number;
  isInsuranceProvider: boolean;
  insuranceAmount: number;
};

export type ExpenseType = {
  id: number;
  name: string;
  amount: number;
  frequency: number;
  bankAccountId: number;
};

export type BudgetType = {
  id: number;
  name: string;
  amount: number;
};

export type BankAccountType = {
  id: number;
  name: string;
  type: number;
  amount: number;
  isRemainder: boolean;
  isPercentage: boolean;
  percentageAmount: number;
  portfolioId: number;
  expenses: ExpenseType[];
};

export type PortfolioType = {
  id: number;
  name: string;
  bankAccounts: BankAccountType[];
  budgets: BudgetType[];
  expenses: ExpenseType[];
  incomes: IncomeType[];
  userAccess: UserType[];
};
