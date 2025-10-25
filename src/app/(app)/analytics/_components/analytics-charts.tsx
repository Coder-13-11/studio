'use client';

import { useMemo } from 'react';
import { Pie, PieChart, Tooltip, Legend, Cell } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { categories } from '@/lib/data';
import { useTransactions } from '@/contexts/transactions-provider';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';

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

  const categoryData = useMemo(() => {
    const expenseCategories = categories.filter((c) => c.name !== 'Income');
    return expenseCategories
      .map((category) => {
        const total = (transactions ?? [])
          .filter((t) => t.type === 'expense' && t.category === category.name)
          .reduce((acc, t) => acc + t.amount, 0);
        return {
          name: category.name.toLowerCase(),
          value: total,
          fill: `var(--color-${category.name.toLowerCase()})`,
        };
      })
      .filter((item) => item.value > 0);
  }, [transactions]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>This month's expense breakdown.</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px] w-full flex items-center justify-center p-0">
        <ChartContainer config={pieChartConfig} className="h-full w-full">
          <PieChart accessibilityLayer>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={'80%'}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                percent,
              }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                return percent > 0.05 ? (
                  <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                ) : null;
              }}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(value as number)
                  }
                />
              }
            />
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
