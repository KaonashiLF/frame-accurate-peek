import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowLeft, FileDown, MapPin } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SectionCard, StatusPill } from "@/components/ui-bits";
import { commodities, contracts, contractValue, currency, dateBR } from "@/lib/mock-data";

export const Route = createFileRoute("/contratos/$id")({
  loader: ({ params }) => {
    const contrato = contracts.find((c) => c.id === params.id);
    if (!contrato) throw notFound();
    return contrato;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Contrato ${loaderData?.numero ?? ""} | Terra Contratos` },
      {
        name: "description",
        content: `Detalhes do contrato ${loaderData?.numero ?? ""}: contraparte, volume, preço negociado, prazos e comparação com o mercado.`,
      },
      { property: "og:title", content: `Contrato ${loaderData?.numero ?? ""} | Terra Contratos` },
      { property: "og:description", content: "Ficha completa do contrato de commodity com histórico e mercado." },
    ],
  }),
  component: Detalhe,
});

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}

function Detalhe() {
  const c = Route.useLoaderData();
  const mercado = commodities.find((m) => m.nome === c.commodity);
  const precoMercado = mercado?.preco ?? c.preco;
  const diff = ((precoMercado - c.preco) / c.preco) * 100;

  const comparativo = [
    { nome: "Contratado", valor: c.preco },
    { nome: "Mercado", valor: precoMercado },
  ];

  return (
    <AppShell
      title={`Contrato ${c.numero}`}
      subtitle={`${c.tipo} de ${c.commodity} · ${c.contraparte}`}
      actions={
        <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium">
          <FileDown className="size-4" /> Baixar PDF
        </button>
      }
    >
      <Link to="/contratos" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Voltar para contratos
      </Link>

      <div className="mt-4 surface-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-xl font-semibold">{c.numero}</h2>
              <StatusPill status={c.status} />
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">{c.tipo}</span>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5" /> {c.local} · {c.incoterm}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Valor total</p>
            <p className="font-display text-2xl font-semibold tabular-nums">{currency(contractValue(c), c.moeda)}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Contraparte" value={c.contraparte} />
          <Field label="Commodity" value={c.commodity} />
          <Field label="Volume" value={`${c.volume.toLocaleString("pt-BR")} ${c.unidade}`} />
          <Field label="Preço negociado" value={`${currency(c.preco, c.moeda)} / ${c.unidade}`} />
          <Field label="Moeda" value={c.moeda} />
          <Field label="Assinatura" value={dateBR(c.assinatura)} />
          <Field label="Início da vigência" value={dateBR(c.inicio)} />
          <Field label="Vencimento" value={dateBR(c.vencimento)} />
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <SectionCard
          title="Contratado x mercado"
          description={`Preço de mercado ${diff >= 0 ? "acima" : "abaixo"} em ${Math.abs(diff).toFixed(1)}%`}
          className="lg:col-span-2"
        >
          <div className="h-64 px-2 py-4 sm:px-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparativo} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="nome" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" width={60} />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.75rem",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="valor" fill="var(--chart-1)" radius={[8, 8, 0, 0]} barSize={72} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-3 border-t border-border p-4 sm:grid-cols-3 sm:p-5">
            <Field label="Condição de pagamento" value={c.pagamento} />
            <Field label="Incoterm" value={c.incoterm} />
            <Field label="Referência de mercado" value={mercado?.bolsa ?? "—"} />
          </div>
        </SectionCard>

        <SectionCard title="Histórico e eventos" description="Movimentações registradas">
          <ol className="space-y-0 divide-y divide-border">
            {c.eventos.map((e) => (
              <li key={e.titulo} className="px-4 py-3.5 sm:px-5">
                <p className="text-xs text-muted-foreground">{dateBR(e.data)}</p>
                <p className="mt-0.5 text-sm font-medium">{e.titulo}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{e.descricao}</p>
              </li>
            ))}
          </ol>
          <div className="border-t border-border p-4 sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Observações</p>
            <p className="mt-2 text-sm text-muted-foreground">{c.observacoes}</p>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
