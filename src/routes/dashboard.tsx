import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, ArrowRight, CalendarClock, FileText, Info, Layers, ShieldCheck, Wallet } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Delta, KpiCard, SectionCard, StatusPill } from "@/components/ui-bits";
import { alertas, commodities, compact, contracts, currency, dateBR, kpis } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard de contratos | Terra Contratos" },
      {
        name: "description",
        content: "Visão executiva de contratos ativos, valores, volumes e evolução dos preços de commodities.",
      },
      { property: "og:title", content: "Dashboard de contratos | Terra Contratos" },
      { property: "og:description", content: "Indicadores, alertas e preços de commodities em uma única tela." },
    ],
  }),
  component: Dashboard,
});

const chartData = commodities[0].serie.map((point, i) => ({
  mes: point.data,
  Soja: point.valor,
  Milho: commodities[1].serie[i].valor,
  Trigo: Number((commodities[5].serie[i].valor / 10).toFixed(2)),
}));

const alertIcon = { warning: AlertTriangle, info: Info, success: ShieldCheck };
const alertTone = {
  warning: "bg-warning/15 text-warning-foreground",
  info: "bg-info/12 text-info",
  success: "bg-success/12 text-success",
};

function Dashboard() {
  const k = kpis();
  const recentes = [...contracts].sort((a, b) => b.inicio.localeCompare(a.inicio)).slice(0, 5);

  return (
    <AppShell
      title="Dashboard"
      subtitle="Visão geral da carteira de contratos e do mercado"
      actions={
        <Link
          to="/contratos"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
        >
          Ver contratos <ArrowRight className="size-4" />
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Total de contratos" value={String(k.total)} hint="Carteira completa" icon={<FileText className="size-4" />} />
        <KpiCard label="Contratos ativos" value={String(k.ativos)} hint="Em vigência" tone="success" icon={<ShieldCheck className="size-4" />} />
        <KpiCard
          label="Próx. vencimento"
          value={String(k.vencendo)}
          hint="Até 30 dias"
          tone="warning"
          icon={<CalendarClock className="size-4" />}
        />
        <KpiCard label="Valor contratado" value={`R$ ${compact(k.valorTotal)}`} hint="Convertido em BRL" icon={<Wallet className="size-4" />} />
        <KpiCard label="Volume contratado" value={`${compact(k.volumeTotal)} ton`} hint="Contratos vigentes" icon={<Layers className="size-4" />} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <SectionCard
          title="Evolução de preços"
          description="Últimos 12 meses — R$ por saca (trigo em R$/100kg)"
          className="xl:col-span-2"
        >
          <div className="h-72 px-2 py-4 sm:px-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -14, bottom: 0 }}>
                <defs>
                  {["Soja", "Milho", "Trigo"].map((k2, i) => (
                    <linearGradient id={`g-${k2}`} key={k2} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={`var(--chart-${i + 1})`} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={`var(--chart-${i + 1})`} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" width={52} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.75rem",
                    fontSize: 12,
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                {["Soja", "Milho", "Trigo"].map((k2, i) => (
                  <Area
                    key={k2}
                    type="monotone"
                    dataKey={k2}
                    stroke={`var(--chart-${i + 1})`}
                    strokeWidth={2}
                    fill={`url(#g-${k2})`}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Alertas e destaques" description="Itens que exigem atenção">
          <ul className="divide-y divide-border">
            {alertas.map((a) => {
              const Icon = alertIcon[a.tipo];
              return (
                <li key={a.titulo} className="flex gap-3 px-4 py-3.5 sm:px-5">
                  <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${alertTone[a.tipo]}`}>
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{a.titulo}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{a.descricao}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-border p-4 sm:p-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Mercado hoje</p>
            <ul className="space-y-2.5">
              {commodities.slice(0, 4).map((c) => (
                <li key={c.id} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{c.nome}</span>
                  <span className="flex items-center gap-3">
                    <span className="tabular-nums">{currency(c.preco, c.moeda)}</span>
                    <Delta value={c.variacaoDia} className="text-xs" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        className="mt-4"
        title="Contratos recentes"
        description="Últimos contratos iniciados"
        action={
          <Link to="/contratos" className="text-sm font-medium text-primary hover:underline">
            Ver todos
          </Link>
        }
      >
        {/* Tabela — desktop */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-2.5 font-medium">Contrato</th>
                <th className="px-5 py-2.5 font-medium">Contraparte</th>
                <th className="px-5 py-2.5 font-medium">Commodity</th>
                <th className="px-5 py-2.5 text-right font-medium">Volume</th>
                <th className="px-5 py-2.5 text-right font-medium">Preço</th>
                <th className="px-5 py-2.5 font-medium">Status</th>
                <th className="px-5 py-2.5 font-medium">Vencimento</th>
              </tr>
            </thead>
            <tbody>
              {recentes.map((c) => (
                <tr key={c.id} className="border-b border-border/70 transition-colors last:border-0 hover:bg-muted/50">
                  <td className="px-5 py-3">
                    <Link to="/contratos/$id" params={{ id: c.id }} className="font-medium text-primary hover:underline">
                      {c.numero}
                    </Link>
                  </td>
                  <td className="px-5 py-3">{c.contraparte}</td>
                  <td className="px-5 py-3 text-muted-foreground">{c.commodity}</td>
                  <td className="px-5 py-3 text-right tabular-nums">
                    {c.volume.toLocaleString("pt-BR")} {c.unidade}
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums">{currency(c.preco, c.moeda)}</td>
                  <td className="px-5 py-3">
                    <StatusPill status={c.status} />
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{dateBR(c.vencimento)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards — mobile */}
        <ul className="divide-y divide-border md:hidden">
          {recentes.map((c) => (
            <li key={c.id}>
              <Link to="/contratos/$id" params={{ id: c.id }} className="flex flex-col gap-2 px-4 py-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{c.numero}</span>
                  <StatusPill status={c.status} />
                </div>
                <p className="text-sm text-muted-foreground">{c.contraparte}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{c.commodity}</span>
                  <span className="tabular-nums">{currency(c.preco, c.moeda)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </SectionCard>
    </AppShell>
  );
}
