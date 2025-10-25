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
import { transactions, categories } from '@/lib/data';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  total: {
    label: 'Total',
  },
};

categories.forEach((category) => {
  if (category.name !== 'Income') {
    chartConfig[category.name as keyof typeof chartConfig] = {
      label: category.name,
      color: category.color,
    };
  }
});


export function SpendingChart() {
  const data = useMemo(() => {
    const expenseCategories = categories.filter((c) => c.name !== 'Income');
    return expenseCategories.map((category) => {
      const total = transactions
        .filter((t) => t.type === 'expense' && t.category === category.name)
        .reduce((acc, t) => acc + t.amount, 0);
      return {
        name: category.name,
        total,
        fill: `var(--color-${category.name})`,
      };
    });
  }, []);

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
                formatter={(value, name) => {
                  return (
                    <div className="flex flex-col">
                      <span>{name}</span>
                      <span className="font-bold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value as number)}</span>
                    </div>
                  );
                }}
              />}
            />
            <Bar dataKey="total" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
