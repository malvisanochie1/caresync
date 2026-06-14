import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Accessibility,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Patients", href: "/patients", icon: Users },
  { label: "Care Logs", href: "/care-logs", icon: ClipboardList },
  { label: "Accessibility", href: "/accessibility", icon: Accessibility },
] as const;
