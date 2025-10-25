'use client';

import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { categories } from '@/lib/data';
import { useTransactions } from '@/contexts/transactions-provider';
import { ChartContainer, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

const lineChartConfig = {
  income: {
    label: 'Income',
    color: 'hsl(var(--chart-1))',
  },
  expenses: {
    label: 'Expenses',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const pieChartConfig = {
  income: {
    label: 'Income',
    color: 'hsl(var(--chart-1))',
  },
  food: {
    label: 'Food',
    color: 'hsl(var(--chart-3))',
  },
  transport: {
    label: 'Transport',
    color: 'hsl(var(--chart-4))',
  },
  shopping: {
    label: 'Shopping',
    color: 'hsl(var(--chart-5))',
  },
  entertainment: {
    label: 'Entertainment',
    color: 'hsl(var(--chart-2))',
  },
  health: {
    label: 'Health',
    color: 'hsl(var(--chart-1))',
  },
  utilities: {
    label: 'Utilities',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;


export function AnalyticsCharts() {
  const { transactions } = useTransactions();
  const monthlyData = useMemo(() => {
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());
    const days = eachDayOfInterval({ start, end });

    return days.map(day => {
      const dailyIncome = transactions
        .filter(t => t.type === 'income' && new Date(t.date).toDateString() === day.toDateString())
        .reduce((acc, t) => acc + t.amount, 0);
      const dailyExpenses = transactions
        .filter(t => t.type === 'expense' && new Date(t.date).toDateString() === day.toDateString())
        .reduce((acc, t) => acc + t.amount, 0);
      return {
        date: format(day, 'MMM d'),
        income: dailyIncome,
        expenses: dailyExpenses,
      };
    });
  }, [transactions]);

  const categoryData = useMemo(() => {
    const expenseCategories = categories.filter((c) => c.name !== 'Income');
    return expenseCategories.map((category) => {
      const total = transactions
        .filter((t) => t.type === 'expense' && t.category === category.name)
        .reduce((acc, t) => acc + t.amount, 0);
      return {
        name: category.name.toLowerCase(),
        value: total,
        fill: `var(--color-${category.name.toLowerCase()})`,
      };
    }).filter(item => item.value > 0);
  }, [transactions]);

  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Income vs. Expenses</CardTitle>
            <CardDescription>This month's cash flow.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={lineChartConfig} className="min-h-[200px] w-full">
              <LineChart accessibilityLayer data={monthlyData}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip content={<ChartTooltipContent formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value as number)} />} />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="var(--color-income)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="expenses" stroke="var(--color-expenses)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="categories">
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>This month's expense breakdown.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={pieChartConfig} className="min-h-[200px] w-full">
                <PieChart accessibilityLayer>
                    <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x  = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                        const y = cy  + radius * Math.sin(-midAngle * Math.PI / 180);
                        return (percent > 0.05) ? <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                            {`${(percent * 100).toFixed(0)}%`}
                        </text> : null;
                    }}>
                        {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value as number)} />} />
                    <Legend />
                </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
