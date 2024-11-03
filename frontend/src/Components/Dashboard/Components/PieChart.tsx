import { useAppSelector } from '@/Redux/hooks';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import { expenseFrequencyMap, payFrequencyMap } from '@Utils';
import { Paper, Stack, Typography } from '@mui/material';
import { Portfolio } from '@/Utils/Models/Portfolio';
payFrequencyMap

type PieChartData = {
  id: number;
  value: number;
  label: string;
};

const PieCharts = () => {
  const portfolio = useAppSelector((state) => state.portfolio);
  const [incomeData, setIncomeData] = useState<PieChartData[]>([])
  const [expenseData, setExpenseData] = useState<PieChartData[]>([])
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Generate Pie data
  useEffect(() => {
    const port = new Portfolio(portfolio)

    const generateIncomePieChartData = () => {
      const data: PieChartData[] = [];
      for (const income of port.incomes) {
        const percentage = port.getPercentageOfIncome(income)
        data.push({
          id: income.id,
          value: percentage,
          label: income.name
        })
      }
      setIncomeData(data)
    }

    // const generateBankPieChartData = () => {
    //   const data: PieChartData[] = [];
    //   for (const bank of port.bankAccounts) {
    //     if (bank.isRemainder) continue;
    //     if (bank.type === 1) continue;
    //     const percentage = port.getBanksPercentageOfTotalExpenses(bank)
    //     data.push({
    //       id: bank.id,
    //       value: percentage,
    //       label: bank.name
    //     })
    //   }
    //   setExpenseData(data)
    // }


    const generateBankPieChartData = () => {
      let totalAmountPerMonth = 0;
      const data: PieChartData[] = [];
      for (const bank of port.bankAccounts) {
        if (bank.isRemainder) continue;
        // handle savings
        if (bank.type === 1) {
          if (bank.isPercentage) {
            const annualIncome = port.getTotalIncomeAnnually();
            const annualSavingsForAccount = (annualIncome * (bank.percentageAmount / 100))
            const amount = annualSavingsForAccount / 12
            totalAmountPerMonth += Number(amount.toFixed(2))
            data.push({
              id: bank.id,
              value: Number(amount.toFixed(2)),
              label: bank.name
            })
          }
          if (!bank.isPercentage && bank.amount !== 0) {
            totalAmountPerMonth += Number(bank.amount.toFixed(2))
            data.push({
              id: bank.id,
              value: bank.amount,
              label: bank.name
            })
          }
        }
        if (bank.type === 0) {

          let bankExpenses = 0;
          for (const expense of bank.expenses) {
            const annualExpenseAmount = Number((expense.amount * expenseFrequencyMap[expense.frequency]).toFixed(2))
            bankExpenses += annualExpenseAmount;
          }
          const monthlyExpenses = Number((bankExpenses / 12).toFixed(2))
          if (monthlyExpenses === 0) continue;
          totalAmountPerMonth += monthlyExpenses;
          data.push({
            id: bank.id,
            value: monthlyExpenses,
            label: bank.name
          })
        }
      }

      const remainingAmount = port.getTotalIncomeMonthly() - totalAmountPerMonth
      totalAmountPerMonth += remainingAmount;

      data.push({
        id: 999,
        value: remainingAmount,
        label: "Remaining"
      })

      setTotalAmount(Number(totalAmountPerMonth.toFixed(2)))
      setExpenseData(data)
    }


    if (portfolio.incomes.length > 0)
      generateIncomePieChartData();
    if (portfolio.bankAccounts.length > 0)
      generateBankPieChartData();

  }, [portfolio])

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h6'>Data</Typography>
      <Stack direction="column" spacing={3}>
        {incomeData.length > 0 &&
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.value}%`,
                arcLabelMinAngle: 35,
                arcLabelRadius: '60%',
                highlightScope: {
                  fade: 'global',
                  highlight: 'item'
                },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: 'gray'
                },
                data: incomeData
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: 'bold',
              },
            }}
            // slotProps={{
            //   legend: {
            //     hidden: true
            //   }
            // }}
            height={300}
          />}

        {expenseData.length > 0 &&
          <PieChart
            series={[
              {
                arcLabel: (item) => `${((item.value / totalAmount) * 100).toFixed(2)}%`,
                arcLabelMinAngle: 35,
                arcLabelRadius: '60%',
                highlightScope: {
                  fade: 'global',
                  highlight: 'item'
                },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: 'gray'
                },
                data: expenseData
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: 'bold',
              },
            }}
            height={300}
          />}
      </Stack>
    </Paper>
  );
}


export default PieCharts;
