import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContractStatus } from "@/lib/mock-data";
import { statusLabel } from "@/lib/mock-data";

const statusStyles: Record<ContractStatus, string> = {
  ativo: "bg-success/12 text-success border-success/25",
  vencendo: "bg-warning/15 text-warning-foreground border-warning/40",
  encerrado: "bg-muted text-muted-foreground border-border",
  pendente: "bg-info/12 text-info border-info/25",
};

export function StatusPill({ status, className }: { status: ContractStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {statusLabel[status]}
    </span>
  );
}

export function Delta({ value, className }: { value: number; className?: string }) {
  const up = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-sm font-medium tabular-nums",
        up ? "text-success" : "text-destructive",
        className,
      )}
    >
      {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
      {up ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
}

export function KpiCard({
  label,
  value,
  hint,
  icon,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: ReactNode;
  icon: ReactNode;
  tone?: "default" | "warning" | "success";
}) {
  return (
    <div className="surface-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            tone === "warning" && "bg-warning/15 text-warning-foreground",
            tone === "success" && "bg-success/12 text-success",
            tone === "default" && "bg-primary/8 text-primary",
          )}
        >
          {icon}
        </span>
      </div>
      <p className="mt-3 font-display text-2xl font-semibold tabular-nums">{value}</p>
      {hint ? <div className="mt-1 text-xs text-muted-foreground">{hint}</div> : null}
    </div>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("surface-card overflow-hidden", className)}>
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3.5 sm:px-5">
        <div>
          <h2 className="font-display text-sm font-semibold sm:text-base">{title}</h2>
          {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
