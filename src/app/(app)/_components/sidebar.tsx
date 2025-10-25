'use client';

import { usePathname } from 'next/navigation';
import { BarChart3, LayoutDashboard, Sparkles, Trophy, CalendarClock } from 'lucide-react';
import { useAuth } from '@/firebase';

import { FinwellLogo } from '@/components/finwell-logo';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { UserNav } from './user-nav';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/goals', icon: Trophy, label: 'Goals' },
  { href: '/scheduled', icon: CalendarClock, label: 'Scheduled' },
  { href: '/insights', icon: Sparkles, label: 'Insights' },
];

export function AppSidebar() {
  const pathname = usePathname();
  const auth = useAuth();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 p-2">
          <FinwellLogo className="h-8 w-8 text-sidebar-primary" />
          <span className="font-headline text-lg font-semibold text-sidebar-foreground">
            FinWell
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, side: 'right' }}
              >
                <a href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
