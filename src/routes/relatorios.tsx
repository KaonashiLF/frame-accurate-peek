import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FileSpreadsheet } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/ui-bits";
import { compact, contracts, contractValue } from "@/lib/mock-data";

export const Route = createFileRoute("/relatorios")({
  head: () => ({
    meta: [
      { title: "Relatórios da carteira | Terra Contratos" },
      {
        name: "description",
        content: "Relatórios de exposição por commodity, distribuição de status e valor contratado por contraparte.",
      },
      { property: "og:title", content: "Relatórios da carteira | Terra Contratos" },
      { property: "og:description", content: "Análises consolidadas dos contratos de commodities." },
    ],
  }),
  component: Relatorios,
});

const porCommodity = Object.values(
  contracts.reduce<Record<string, { nome: string; valor: number }>>((acc, c) => {
    const v = contractValue(c) * (c.moeda === "USD" ? 5.4 : 1);
    acc[c.commodity] = { nome: c.commodity, valor: (acc[c.commodity]?.valor ?? 0) + v };
    return acc;
  }, {}),
);

const porStatus = Object.values(
  contracts.reduce<Record<string, { nome: string; qtd: number }>>((acc, c) => {
    acc[c.status] = { nome: c.status, qtd: (acc[c.status]?.qtd ?? 0) + 1 };
    return acc;
  }, {}),
);

function Relatorios() {
  return (
    <AppShell
      title="Relatórios"
      subtitle="Análises consolidadas da carteira"
      actions={
        <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium">
          <FileSpreadsheet className="size-4" /> Exportar planilha
        </button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Valor por commodity" description="Em BRL equivalente" className="lg:col-span-2">
          <div className="h-72 px-2 py-4 sm:px-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={porCommodity} margin={{ top: 8, right: 8, left: -4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="nome" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis
                  tickFormatter={(v: number) => compact(v)}
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  stroke="var(--muted-foreground)"
                  width={56}
                />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  formatter={(v: number) => `R$ ${compact(v)}`}
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.75rem",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="valor" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Distribuição por status" description="Quantidade de contratos">
          <div className="h-72 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={porStatus} dataKey="qtd" nameKey="nome" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {porStatus.map((_, i) => (
                    <Cell key={i} fill={`var(--chart-${(i % 5) + 1})`} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.75rem",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard className="mt-4" title="Exposição por contraparte" description="Valor equivalente em BRL">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-2.5 font-medium sm:px-5">Contraparte</th>
                <th className="px-4 py-2.5 font-medium sm:px-5">Commodity</th>
                <th className="px-4 py-2.5 text-right font-medium sm:px-5">Valor</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((c) => (
                <tr key={c.id} className="border-b border-border/70 last:border-0">
                  <td className="px-4 py-3 sm:px-5">{c.contraparte}</td>
                  <td className="px-4 py-3 text-muted-foreground sm:px-5">{c.commodity}</td>
                  <td className="px-4 py-3 text-right tabular-nums sm:px-5">
                    R$ {compact(contractValue(c) * (c.moeda === "USD" ? 5.4 : 1))}
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
