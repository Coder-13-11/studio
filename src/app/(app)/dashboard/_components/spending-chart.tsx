'use client';

import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { categories } from '@/lib/data';
import { useTransactions } from '@/contexts/transactions-provider';
import { ChartContainer, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  total: {
    label: 'Total',
  },
} satisfies ChartConfig;

categories.forEach((category) => {
  if (category.name !== 'Income') {
    const key = category.name.toLowerCase();
    chartConfig[key as keyof typeof chartConfig] = {
      label: category.name,
      color: `hsl(var(--chart-${Object.keys(chartConfig).length}))`,
    };
  }
});


export function SpendingChart() {
  const { transactions } = useTransactions();
  const data = useMemo(() => {
    const expenseCategories = categories.filter((c) => c.name !== 'Income');
    return expenseCategories.map((category) => {
      const total = (transactions ?? [])
        .filter((t) => t.type === 'expense' && t.category === category.name)
        .reduce((acc, t) => acc + t.amount, 0);
      return {
        name: category.name,
        total,
        fill: `var(--color-${category.name.toLowerCase()})`,
      };
    });
  }, [transactions]);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>This month's expenses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              content={<ChartTooltipContent
                formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value as number)}
                nameKey='name'
              />}
            />
            <Bar dataKey="total" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
