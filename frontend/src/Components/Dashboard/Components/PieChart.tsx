import { useAppSelector } from '@/Redux/hooks';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import { expenseFrequencyMap, payFrequencyMap } from '@Utils';
import { Paper, Stack, Typography } from '@mui/material';
payFrequencyMap

type PieChartData = {
  id: number;
  value: number;
  label: string;
};

const PieCharts = () => {
  const portfolio = useAppSelector((state) => state.portfolio);
  const [incomeData, setIncomeData] = useState<PieChartData[]>([])
  const [expenseData, setExpenseData] = useState([])


  // Generate Pie data
  useEffect(() => {
    const generateIncomePieChartData = () => {
      let totalIncome = 0;
      const incomes = portfolio.incomes;
      for (const i in incomes) {
        const income = portfolio.incomes[i]
        totalIncome += (income.amount + income.insuranceAmount) * payFrequencyMap[income.payFrequency]
      }

      const data = incomes.map((income, index) => {
        const incomePercentage = ((((income.amount + income.insuranceAmount) * payFrequencyMap[income.payFrequency]) / totalIncome) * 100).toFixed(1)
        return {
          id: index,
          value: Number(incomePercentage),
          label: income.name
        }
      })
      setIncomeData(data)
    }

    const generateExpensePieChartData = () => {
      let totalAnnualExpenses = 0;
      portfolio.expenses.forEach((expense) => {
        console.log(`Expense: ${expense.name} - ${((expense.amount * expenseFrequencyMap[expense.frequency]) / 12).toFixed(2)}`)
        const amount = expense.amount * expenseFrequencyMap[expense.frequency];
        totalAnnualExpenses += amount;
        console.log(`Total: ${(totalAnnualExpenses / 12).toFixed(2)}`)
      })

    }
    generateIncomePieChartData();
    generateExpensePieChartData();

  }, [portfolio])

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h6'>Data</Typography>
      {incomeData.length > 0 &&
        <Stack direction="row">
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.value}%`,
                arcLabelMinAngle: 35,
                arcLabelRadius: '50%',
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
            slotProps={{
              legend: {
                hidden: true
              }
            }}
            height={200}
          />
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.value}%`,
                arcLabelMinAngle: 35,
                arcLabelRadius: '50%',
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
            height={200}
          />
        </Stack>}
    </Paper>
  );
}


export default PieCharts;
