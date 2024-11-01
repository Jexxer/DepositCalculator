import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  PaperProps,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
//import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";
import AccountBalanceTwoToneIcon from "@mui/icons-material/AccountBalanceTwoTone";
import CelebrationTwoToneIcon from "@mui/icons-material/CelebrationTwoTone";
import QuestionMark from "@mui/icons-material/QuestionMark";
import { BankAccountType, IncomeType, PortfolioType } from "@/Types";
import Dinero from "dinero.js";
import { axiosInstance } from "@/Axios";
import { fetchPortfolio } from "@/Redux/Slices/PortfolioSlice";

type Props = {
  paperProps?: PaperProps;
};

const Overview = (props: Props) => {
  const { paperProps } = props;
  const dispatch = useAppDispatch();
  const format = "$0,0.00";
  const portfolio = useAppSelector((state) => state.portfolio);
  const splitMethod = portfolio.splitMethod;
  const { incomes, bankAccounts, expenses } = portfolio;
  const checkings = bankAccounts.filter((b) => b.type === 0);
  const savings = bankAccounts.filter((b) => b.type === 1);

  const handleSplitChange = async (
    _event: React.MouseEvent<HTMLElement>,
    newValue: number,
  ) => {
    if (newValue === null) return;
    const res = await axiosInstance.put(
      `/portfolios/${portfolio.id}/splitMethod?splitMethod=${newValue}`,
    );
    if (res.status === 200) {
      dispatch(fetchPortfolio());
    }
  };

  const getDepositAmountIncome = (
    income: IncomeType,
    bank: BankAccountType,
    portfolio: PortfolioType,
  ) => {
    const payFrequency = {
      0: 52,
      1: 26,
      2: 24,
    };
    const billFrequency = {
      0: 12,
      1: 4,
      2: 1,
    };

    let portfolioYearlyIncome = Dinero({ amount: 0, currency: "USD" });
    incomes.forEach((income) => {
      if (income.payFrequency === 0) {
        const combinedIncome = Dinero({
          amount: (income.amount + income.insuranceAmount) * 100,
          currency: "USD",
        });
        const yearlyIncome = combinedIncome.multiply(52);
        portfolioYearlyIncome = portfolioYearlyIncome.add(yearlyIncome);
      }
      if (income.payFrequency === 1) {
        const combinedIncome = Dinero({
          amount: (income.amount + income.insuranceAmount) * 100,
          currency: "USD",
        });
        const yearlyIncome = combinedIncome.multiply(26);
        portfolioYearlyIncome = portfolioYearlyIncome.add(yearlyIncome);
      }
      if (income.payFrequency === 2) {
        const combinedIncome = Dinero({
          amount: (income.amount + income.insuranceAmount) * 100,
          currency: "USD",
        });
        const yearlyIncome = combinedIncome.multiply(24);
        portfolioYearlyIncome = portfolioYearlyIncome.add(yearlyIncome);
      }
    });

    let yearlyInsurance = Dinero({ amount: 0, currency: "USD" });

    incomes.forEach((i) => {
      const temp = i.insuranceAmount * 100;
      let insuranceYR = Dinero({
        amount: temp,
        currency: "USD",
      });

      insuranceYR = insuranceYR.multiply(payFrequency[i.payFrequency]);
      yearlyInsurance = yearlyInsurance.add(insuranceYR);
    });

    const yearlyIncome = Dinero({
      amount: (income.amount + income.insuranceAmount) * 100,
      currency: "USD",
    }).multiply(payFrequency[income.payFrequency]);

    let incomePercentage =
      (yearlyIncome.getAmount() / portfolioYearlyIncome.getAmount()) * 100;
    incomePercentage = Math.round(incomePercentage * 100) / 100;

    let portfolioTotalExpenses = Dinero({ amount: 0, currency: "USD" });
    portfolio.expenses.forEach((e) => {
      let expenseAmount = Dinero({ amount: Math.trunc(e.amount * 100) });
      expenseAmount = expenseAmount.multiply(billFrequency[e.frequency]);
      portfolioTotalExpenses = portfolioTotalExpenses.add(expenseAmount);
    });

    let banksTotalYearlyExpenses = Dinero({ amount: 0, currency: "USD" });

    portfolio.expenses.forEach((e) => {
      if (e.bankAccountId === bank.id) {
        const expenseAmount = Dinero({ amount: Math.trunc(e.amount * 100) });

        const yearly = expenseAmount.multiply(billFrequency[e.frequency]);

        banksTotalYearlyExpenses = banksTotalYearlyExpenses.add(yearly);
      }
    });

    let banksPercentageOfExpenses =
      (banksTotalYearlyExpenses.getAmount() /
        portfolioTotalExpenses.getAmount()) *
      100;
    banksPercentageOfExpenses =
      Math.round(banksPercentageOfExpenses * 100) / 100;

    const amountBeforeInsurance = banksTotalYearlyExpenses
      .divide(payFrequency[income.payFrequency])
      .percentage(incomePercentage);

    const insuranceOffset = yearlyInsurance
      .percentage(incomePercentage)
      .divide(payFrequency[income.payFrequency])
      .percentage(banksPercentageOfExpenses);

    if (income.isInsuranceProvider) {
      const amount = amountBeforeInsurance.subtract(insuranceOffset);
      if (amount.isZero()) return Dinero({ amount: 0, currency: "USD" }); // sometimes values is -0, this removes the negative sign
      return amount;
    }

    const amount = amountBeforeInsurance.add(insuranceOffset);
    if (amount.isZero()) return Dinero({ amount: 0, currency: "USD" });
    return amount;
  };

  const getDepositAmountEqual = (
    income: IncomeType,
    bank: BankAccountType,
    portfolio: PortfolioType,
  ) => {
    const payFrequency = {
      0: 52,
      1: 26,
      2: 24,
    };
    const billFrequency = {
      0: 12,
      1: 4,
      2: 1,
    };

    let portfolioYearlyIncome = Dinero({ amount: 0, currency: "USD" });
    incomes.forEach((income) => {
      if (income.payFrequency === 0) {
        const combinedIncome = Dinero({
          amount: (income.amount + income.insuranceAmount) * 100,
          currency: "USD",
        });
        const yearlyIncome = combinedIncome.multiply(52);
        portfolioYearlyIncome = portfolioYearlyIncome.add(yearlyIncome);
      }
      if (income.payFrequency === 1) {
        const combinedIncome = Dinero({
          amount: (income.amount + income.insuranceAmount) * 100,
          currency: "USD",
        });
        const yearlyIncome = combinedIncome.multiply(26);
        portfolioYearlyIncome = portfolioYearlyIncome.add(yearlyIncome);
      }
      if (income.payFrequency === 2) {
        const combinedIncome = Dinero({
          amount: (income.amount + income.insuranceAmount) * 100,
          currency: "USD",
        });
        const yearlyIncome = combinedIncome.multiply(24);
        portfolioYearlyIncome = portfolioYearlyIncome.add(yearlyIncome);
      }
    });

    let yearlyInsurance = Dinero({ amount: 0, currency: "USD" });

    incomes.forEach((i) => {
      const temp = i.insuranceAmount * 100;
      let insuranceYR = Dinero({
        amount: temp,
        currency: "USD",
      });

      insuranceYR = insuranceYR.multiply(payFrequency[i.payFrequency]);
      yearlyInsurance = yearlyInsurance.add(insuranceYR);
    });

    const incomePercentage = (1 / incomes.length) * 100;

    let portfolioTotalExpenses = Dinero({ amount: 0, currency: "USD" });
    portfolio.expenses.forEach((e) => {
      let expenseAmount = Dinero({ amount: Math.trunc(e.amount * 100) });
      expenseAmount = expenseAmount.multiply(billFrequency[e.frequency]);
      portfolioTotalExpenses = portfolioTotalExpenses.add(expenseAmount);
    });

    let banksTotalYearlyExpenses = Dinero({ amount: 0, currency: "USD" });

    bank.expenses.forEach((e) => {
      const expenseAmount = Dinero({ amount: Math.trunc(e.amount * 100) });

      const yearly = expenseAmount.multiply(billFrequency[e.frequency]);

      banksTotalYearlyExpenses = banksTotalYearlyExpenses.add(yearly);
    });

    let banksPercentageOfExpenses =
      (banksTotalYearlyExpenses.getAmount() /
        portfolioTotalExpenses.getAmount()) *
      100;
    banksPercentageOfExpenses =
      Math.round(banksPercentageOfExpenses * 100) / 100;

    const amountBeforeInsurance = banksTotalYearlyExpenses
      .divide(payFrequency[income.payFrequency])
      .percentage(incomePercentage);

    const insuranceOffset = yearlyInsurance
      .percentage(incomePercentage)
      .divide(payFrequency[income.payFrequency])
      .percentage(banksPercentageOfExpenses);

    if (income.isInsuranceProvider) {
      const amount = amountBeforeInsurance.subtract(insuranceOffset);
      if (amount.isZero()) return Dinero({ amount: 0, currency: "USD" }); // sometimes values is -0, this removes the negative sign
      return amount;
    }

    const amount = amountBeforeInsurance.add(insuranceOffset);
    if (amount.isZero()) return Dinero({ amount: 0, currency: "USD" });
    return amount;
  };

  const getSavingsIncome = (income: IncomeType, bank: BankAccountType) => {
    const payFrequency = {
      0: 52,
      1: 26,
      2: 24,
    };

    let portfolioYearlyIncome = Dinero({ amount: 0, currency: "USD" });
    incomes.forEach((income) => {
      if (income.payFrequency === 0) {
        const combinedIncome = Dinero({
          amount: income.amount * 100,
          currency: "USD",
        });
        const yearlyIncome = combinedIncome.multiply(52);
        portfolioYearlyIncome = portfolioYearlyIncome.add(yearlyIncome);
      }
      if (income.payFrequency === 1) {
        const combinedIncome = Dinero({
          amount: income.amount * 100,
          currency: "USD",
        });
        const yearlyIncome = combinedIncome.multiply(26);
        portfolioYearlyIncome = portfolioYearlyIncome.add(yearlyIncome);
      }
      if (income.payFrequency === 2) {
        const combinedIncome = Dinero({
          amount: income.amount * 100,
          currency: "USD",
        });
        const yearlyIncome = combinedIncome.multiply(24);
        portfolioYearlyIncome = portfolioYearlyIncome.add(yearlyIncome);
      }
    });

    const yearlyIncome = Dinero({
      amount: income.amount * 100,
      currency: "USD",
    }).multiply(payFrequency[income.payFrequency]);

    let incomePercentage =
      (yearlyIncome.getAmount() / portfolioYearlyIncome.getAmount()) * 100;
    incomePercentage = Math.round(incomePercentage * 100) / 100;

    let banksTotalYearlySavings = Dinero({ amount: 0, currency: "USD" });
    if (bank.isPercentage) {
      banksTotalYearlySavings = banksTotalYearlySavings.add(
        portfolioYearlyIncome.percentage(bank.percentageAmount),
      );
    } else {
      banksTotalYearlySavings = Dinero({
        amount: bank.amount * 100,
        currency: "USD",
      }).multiply(12);
    }

    const amountBeforeInsurance = banksTotalYearlySavings
      .divide(payFrequency[income.payFrequency])
      .percentage(incomePercentage);

    return amountBeforeInsurance;
  };

  const getSavingsEqual = (income: IncomeType, bank: BankAccountType) => {
    const payFrequency = {
      0: 52,
      1: 26,
      2: 24,
    };

    let portfolioYearlyIncome = Dinero({ amount: 0, currency: "USD" });
    incomes.forEach((income) => {
      if (income.payFrequency === 0) {
        const combinedIncome = Dinero({
          amount: income.amount * 100,
          currency: "USD",
        });
        const yearlyIncome = combinedIncome.multiply(52);
        portfolioYearlyIncome = portfolioYearlyIncome.add(yearlyIncome);
      }
      if (income.payFrequency === 1) {
        const combinedIncome = Dinero({
          amount: income.amount * 100,
          currency: "USD",
        });
        const yearlyIncome = combinedIncome.multiply(26);
        portfolioYearlyIncome = portfolioYearlyIncome.add(yearlyIncome);
      }
      if (income.payFrequency === 2) {
        const combinedIncome = Dinero({
          amount: income.amount * 100,
          currency: "USD",
        });
        const yearlyIncome = combinedIncome.multiply(24);
        portfolioYearlyIncome = portfolioYearlyIncome.add(yearlyIncome);
      }
    });

    const incomePercentage = (1 / incomes.length) * 100;

    let banksTotalYearlySavings = Dinero({ amount: 0, currency: "USD" });
    if (bank.isPercentage) {
      banksTotalYearlySavings = banksTotalYearlySavings.add(
        portfolioYearlyIncome.percentage(bank.percentageAmount),
      );
    } else {
      banksTotalYearlySavings = Dinero({
        amount: bank.amount * 100,
        currency: "USD",
      }).multiply(12);
    }

    const amountBeforeInsurance = banksTotalYearlySavings
      .divide(payFrequency[income.payFrequency])
      .percentage(incomePercentage);

    return amountBeforeInsurance;
  };

  return (
    <Paper {...paperProps}>
      <Stack
        direction="row"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
        paddingTop={2}
        paddingX={2}
        paddingBottom={expenses.length > 0 ? 0 : 2}
      >
        <Typography variant="h6">Direct deposits</Typography>
        <Stack spacing={1} direction="row" alignItems="center">
          <Box>
            <Tooltip title="Method used to split expenses">
              <IconButton size="small" sx={{ backgroundColor: "#D8E8EB" }}>
                <QuestionMark fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <ToggleButtonGroup
            size="small"
            color="primary"
            exclusive
            value={splitMethod}
            onChange={handleSplitChange}
          >
            <ToggleButton value={0}>Income Based</ToggleButton>
            <ToggleButton value={1}>Equally</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>

      {expenses.length > 0 && (
        <Grid
          container
          spacing={2}
          height={{ sm: "auto", md: "100%", lg: "100%", xl: "100%" }}
          sx={{ p: 2 }}
        >
          {incomes.map((income) => {
            const incomeAmount = Dinero({
              amount: Math.trunc(income.amount * 100),
              currency: "USD",
            });
            let totalExpensesAmount = Dinero({ amount: 0, currency: "USD" });
            let totalSavingsAmount = Dinero({ amount: 0, currency: "USD" });
            return (
              <Grid key={income.id} item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Card
                  sx={{
                    height: "100%",
                    backgroundColor: "#D2E8F2",
                    border: "1px solid #81c784",
                  }}
                >
                  <CardContent>
                    <Stack spacing={1}>
                      <Stack
                        spacing={1}
                        width="100%"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {/* <MonetizationOnTwoToneIcon */}
                        {/*   color="success" */}
                        {/*   sx={{ fontSize: 60 }} */}
                        {/* /> */}
                        <Stack spacing={1} justifyContent="center">
                          <Typography alignSelf="center" variant="h6">
                            {income.name}
                          </Typography>
                          <Box alignSelf="center">
                            <Chip
                              sx={{ bgcolor: "#81c784" }}
                              label={"$ " + income.amount.toLocaleString()}
                            />
                          </Box>
                        </Stack>
                      </Stack>
                      <Divider />
                      {checkings.map((b) => {
                        if (b.isRemainder) {
                          return;
                        }
                        let amount = Dinero({ amount: 0, currency: "USD" });
                        if (splitMethod === 0) {
                          amount = getDepositAmountIncome(income, b, portfolio);
                        }
                        if (splitMethod === 1) {
                          amount = getDepositAmountEqual(income, b, portfolio);
                        }
                        totalExpensesAmount = totalExpensesAmount.add(amount);
                        return (
                          <Stack
                            key={b.id}
                            spacing={1}
                            direction="row"
                            width="100%"
                          >
                            <AccountBalanceTwoToneIcon color="info" />
                            <Typography width="60%" variant="body1">
                              {b.name}
                            </Typography>
                            <Typography width="40%" variant="body1">
                              {amount.toFormat(format)}
                            </Typography>
                          </Stack>
                        );
                      })}
                      {savings.map((b) => {
                        let amount = Dinero({ amount: 0, currency: "USD" });
                        if (splitMethod === 0) {
                          amount = getSavingsIncome(income, b);
                        }
                        if (splitMethod === 1) {
                          amount = getSavingsEqual(income, b);
                        }
                        totalSavingsAmount = totalSavingsAmount.add(amount);
                        return (
                          <Stack
                            key={b.id}
                            spacing={1}
                            direction="row"
                            width="100%"
                          >
                            <SavingsTwoToneIcon color="error" />
                            <Typography width="60%" variant="body1">
                              {b.name}
                            </Typography>
                            <Typography width="40%" variant="body1">
                              {amount.toFormat(format)}
                            </Typography>
                          </Stack>
                        );
                      })}
                      <Divider />
                      <Stack spacing={1} direction="row" width="100%">
                        <CelebrationTwoToneIcon color="success" />
                        <Typography width="60%" variant="body1">
                          {income.bankAccount?.name || "Remainder"}
                        </Typography>
                        <Typography width="40%" variant="body1">
                          {incomeAmount
                            .subtract(totalExpensesAmount)
                            .subtract(totalSavingsAmount)
                            .toFormat(format)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Paper>
  );
};

export default Overview;
