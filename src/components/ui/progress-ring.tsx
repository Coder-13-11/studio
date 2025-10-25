'use client';

import { Pie, PieChart, Cell } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: number;
}

const chartConfig = {
  progress: {
    label: 'Progress',
    color: 'hsl(var(--chart-1))',
  },
  remaining: {
    label: 'Remaining',
    color: 'hsl(var(--muted))',
  },
} satisfies ChartConfig;

export function ProgressRing({ progress, size = 100 }: ProgressRingProps) {
  const data = [
    { name: 'progress', value: progress, fill: 'var(--color-progress)' },
    { name: 'remaining', value: 100 - progress, fill: 'var(--color-remaining)' },
  ];
  
  const innerRadius = size * 0.35;
  const outerRadius = size * 0.45;
  const fontSize = Math.max(14, size / 5);


  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ChartContainer config={chartConfig} className="absolute inset-0">
        <PieChart width={size} height={size}>
          <Pie
            data={data}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            cx="50%"
            cy="50%"
            strokeWidth={0}
          >
            <Cell />
            <Cell />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          className="font-headline font-bold text-foreground"
          style={{ fontSize: `${fontSize}px` }}
        >
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
