import { HelpCircle } from 'lucide-react';
import { categories } from '@/lib/data';
import { cn } from '@/lib/utils';

interface CategoryIconProps {
  category: string;
  className?: string;
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
  const categoryInfo = categories.find((c) => c.name === category);
  const Icon = categoryInfo ? categoryInfo.icon : HelpCircle;

  return (
    <div
      className={cn('flex h-10 w-10 items-center justify-center rounded-lg', className)}
      style={{
        backgroundColor: categoryInfo?.color ? `${categoryInfo.color}33` : 'hsl(var(--muted))',
        color: categoryInfo?.color || 'hsl(var(--muted-foreground))',
      }}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
}
