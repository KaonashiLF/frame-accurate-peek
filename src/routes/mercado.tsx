import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Delta, SectionCard } from "@/components/ui-bits";
import { commodities, currency } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mercado")({
  head: () => ({
    meta: [
      { title: "Preços de commodities | Terra Contratos" },
      {
        name: "description",
        content: "Acompanhe preços atuais, variação diária e tendência das principais commodities agrícolas.",
      },
      { property: "og:title", content: "Preços de commodities | Terra Contratos" },
      { property: "og:description", content: "Cotações, variação e evolução por período em visual executivo." },
    ],
  }),
  component: Mercado,
});

function Mercado() {
  const [sel, setSel] = useState(commodities[0].id);
  const ativa = commodities.find((c) => c.id === sel)!;

  return (
    <AppShell title="Mercado" subtitle="Cotações e tendências das commodities acompanhadas">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {commodities.map((c) => {
          const up = c.variacaoDia >= 0;
          return (
            <button
              key={c.id}
              onClick={() => setSel(c.id)}
              className={cn(
                "surface-card p-4 text-left transition-colors",
                sel === c.id ? "border-primary ring-2 ring-ring/20" : "hover:bg-muted/40",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-sm font-semibold">{c.nome}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.bolsa} · {c.unidade}
                  </p>
                </div>
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-lg",
                    up ? "bg-success/12 text-success" : "bg-destructive/10 text-destructive",
                  )}
                >
                  {up ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                </span>
              </div>
              <div className="mt-3 flex items-end justify-between">
                <p className="font-display text-xl font-semibold tabular-nums">{currency(c.preco, c.moeda)}</p>
                <div className="text-right">
                  <Delta value={c.variacaoDia} />
                  <p className="text-xs text-muted-foreground">mês {c.variacaoMes > 0 ? "+" : ""}{c.variacaoMes}%</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <SectionCard
        className="mt-4"
        title={`Evolução — ${ativa.nome}`}
        description={`${ativa.bolsa} · últimos 12 meses (${ativa.moeda}/${ativa.unidade})`}
        action={
          <select
            value={sel}
            onChange={(e) => setSel(e.target.value)}
            aria-label="Filtrar commodity"
            className="h-9 rounded-lg border border-input bg-card px-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
          >
            {commodities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        }
      >
        <div className="h-80 px-2 py-4 sm:px-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ativa.serie} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="mkt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="data" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" width={64} domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.75rem",
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="valor" name={ativa.nome} stroke="var(--chart-2)" strokeWidth={2} fill="url(#mkt)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard className="mt-4" title="Tabela de cotações" description="Fechamento do dia">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-2.5 font-medium sm:px-5">Commodity</th>
                <th className="px-4 py-2.5 font-medium sm:px-5">Praça / Bolsa</th>
                <th className="px-4 py-2.5 text-right font-medium sm:px-5">Preço</th>
                <th className="px-4 py-2.5 text-right font-medium sm:px-5">Dia</th>
                <th className="px-4 py-2.5 text-right font-medium sm:px-5">Mês</th>
              </tr>
            </thead>
            <tbody>
              {commodities.map((c) => (
                <tr key={c.id} className="border-b border-border/70 last:border-0">
                  <td className="px-4 py-3 font-medium sm:px-5">{c.nome}</td>
                  <td className="px-4 py-3 text-muted-foreground sm:px-5">{c.bolsa}</td>
                  <td className="px-4 py-3 text-right tabular-nums sm:px-5">{currency(c.preco, c.moeda)}</td>
                  <td className="px-4 py-3 text-right sm:px-5">
                    <Delta value={c.variacaoDia} />
                  </td>
                  <td className="px-4 py-3 text-right sm:px-5">
                    <Delta value={c.variacaoMes} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </AppShell>
  );
}
