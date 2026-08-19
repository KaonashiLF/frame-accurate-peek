import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  FileText,
  LineChart,
  BarChart3,
  Settings,
  Bell,
  Search,
  Sprout,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/contratos", label: "Contratos", icon: FileText },
  { to: "/mercado", label: "Mercado", icon: LineChart },
  { to: "/relatorios", label: "Relatórios", icon: BarChart3 },
  { to: "/perfil", label: "Perfil", icon: Settings },
] as const;

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col brand-gradient text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-3 px-6 py-6">
          <span className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Sprout className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-base font-semibold text-sidebar-accent-foreground">Terra Contratos</p>
            <p className="text-xs text-sidebar-foreground/70">Gestão de commodities</p>
          </div>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          {nav.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="size-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="m-3 rounded-xl bg-sidebar-accent/60 p-4">
          <p className="text-xs text-sidebar-foreground/70">Safra 2026/27</p>
          <p className="mt-1 font-display text-sm font-semibold text-sidebar-accent-foreground">
            8 contratos monitorados
          </p>
        </div>
      </aside>

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 border-b border-border bg-card/85 backdrop-blur">
          <div className="flex items-center gap-4 px-4 py-3.5 sm:px-6">
            <div className="min-w-0 flex-1">
              <h1 className="truncate font-display text-lg font-semibold sm:text-xl">{title}</h1>
              {subtitle ? <p className="truncate text-xs text-muted-foreground sm:text-sm">{subtitle}</p> : null}
            </div>
            <div className="hidden items-center gap-2 md:flex">{actions}</div>
            <button
              aria-label="Buscar"
              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted"
            >
              <Search className="size-4" />
            </button>
            <button
              aria-label="Notificações"
              className="relative flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted"
            >
              <Bell className="size-4" />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-warning" />
            </button>
            <div className="flex size-9 items-center justify-center rounded-full bg-primary font-display text-xs font-semibold text-primary-foreground">
              LF
            </div>
          </div>
          {actions ? <div className="flex gap-2 overflow-x-auto px-4 pb-3 md:hidden">{actions}</div> : null}
        </header>

        <main className="px-4 pb-24 pt-5 sm:px-6 lg:pb-10">{children}</main>
      </div>

      {/* Bottom nav — mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur lg:hidden">
        <div className="grid grid-cols-5">
          {nav.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
