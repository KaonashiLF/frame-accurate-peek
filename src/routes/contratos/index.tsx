import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, Download, Search, SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SectionCard, StatusPill } from "@/components/ui-bits";
import { contracts, currency, dateBR, statusLabel, type ContractStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/contratos/")({
  head: () => ({
    meta: [
      { title: "Contratos de commodities | Terra Contratos" },
      {
        name: "description",
        content: "Liste, filtre e busque contratos de commodities por status, produto, período e contraparte.",
      },
      { property: "og:title", content: "Contratos de commodities | Terra Contratos" },
      { property: "og:description", content: "Todos os contratos da carteira com filtros e busca rápida." },
    ],
  }),
  component: Contratos,
});

const selectClass =
  "h-9 rounded-lg border border-input bg-card px-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20";

function Contratos() {
  const [busca, setBusca] = useState("");
  const [commodity, setCommodity] = useState("todas");
  const [status, setStatus] = useState("todos");
  const [periodo, setPeriodo] = useState("todos");
  const [contraparte, setContraparte] = useState("todas");

  const commodityOpts = useMemo(() => [...new Set(contracts.map((c) => c.commodity))], []);
  const contraparteOpts = useMemo(() => [...new Set(contracts.map((c) => c.contraparte))], []);

  const filtrados = contracts.filter((c) => {
    const q = busca.trim().toLowerCase();
    if (q && !(`${c.numero} ${c.contraparte} ${c.commodity}`.toLowerCase().includes(q))) return false;
    if (commodity !== "todas" && c.commodity !== commodity) return false;
    if (status !== "todos" && c.status !== status) return false;
    if (contraparte !== "todas" && c.contraparte !== contraparte) return false;
    if (periodo !== "todos" && !c.vencimento.startsWith(periodo)) return false;
    return true;
  });

  return (
    <AppShell
      title="Contratos"
      subtitle={`${filtrados.length} de ${contracts.length} contratos exibidos`}
      actions={
        <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium">
          <Download className="size-4" /> Exportar
        </button>
      }
    >
      <div className="surface-card p-4 sm:p-5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <SlidersHorizontal className="size-3.5" /> Filtros
        </div>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por número, contraparte ou commodity"
              className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <select value={commodity} onChange={(e) => setCommodity(e.target.value)} className={selectClass} aria-label="Commodity">
              <option value="todas">Commodity</option>
              {commodityOpts.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass} aria-label="Status">
              <option value="todos">Status</option>
              {(Object.keys(statusLabel) as ContractStatus[]).map((s) => (
                <option key={s} value={s}>
                  {statusLabel[s]}
                </option>
              ))}
            </select>
            <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className={selectClass} aria-label="Período">
              <option value="todos">Vencimento</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
            <select
              value={contraparte}
              onChange={(e) => setContraparte(e.target.value)}
              className={selectClass}
              aria-label="Contraparte"
            >
              <option value="todas">Contraparte</option>
              {contraparteOpts.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <SectionCard className="mt-4" title="Carteira de contratos" description="Clique em um contrato para ver os detalhes">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-2.5 font-medium">Número</th>
                <th className="px-5 py-2.5 font-medium">Contraparte</th>
                <th className="px-5 py-2.5 font-medium">Commodity</th>
                <th className="px-5 py-2.5 text-right font-medium">Volume</th>
                <th className="px-5 py-2.5 text-right font-medium">Preço</th>
                <th className="px-5 py-2.5 font-medium">Status</th>
                <th className="px-5 py-2.5 font-medium">Início</th>
                <th className="px-5 py-2.5 font-medium">Vencimento</th>
                <th className="px-5 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {filtrados.map((c) => (
                <tr key={c.id} className="border-b border-border/70 transition-colors last:border-0 hover:bg-muted/50">
                  <td className="px-5 py-3 font-medium">{c.numero}</td>
                  <td className="px-5 py-3">{c.contraparte}</td>
                  <td className="px-5 py-3 text-muted-foreground">{c.commodity}</td>
                  <td className="px-5 py-3 text-right tabular-nums">
                    {c.volume.toLocaleString("pt-BR")} {c.unidade}
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums">{currency(c.preco, c.moeda)}</td>
                  <td className="px-5 py-3">
                    <StatusPill status={c.status} />
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{dateBR(c.inicio)}</td>
                  <td className="px-5 py-3 text-muted-foreground">{dateBR(c.vencimento)}</td>
                  <td className="px-5 py-3 text-right">
                    <Link to="/contratos/$id" params={{ id: c.id }} className="text-primary hover:underline">
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="divide-y divide-border md:hidden">
          {filtrados.map((c) => (
            <li key={c.id}>
              <Link to="/contratos/$id" params={{ id: c.id }} className="flex items-center gap-3 px-4 py-3.5">
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{c.numero}</span>
                    <StatusPill status={c.status} />
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{c.contraparte}</p>
                  <div className="flex flex-wrap gap-x-4 text-xs text-muted-foreground">
                    <span>{c.commodity}</span>
                    <span className="tabular-nums">
                      {c.volume.toLocaleString("pt-BR")} {c.unidade}
                    </span>
                    <span className="tabular-nums">{currency(c.preco, c.moeda)}</span>
                    <span>Venc. {dateBR(c.vencimento)}</span>
                  </div>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>

        {filtrados.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted-foreground">
            Nenhum contrato encontrado com os filtros aplicados.
          </p>
        ) : null}
      </SectionCard>
    </AppShell>
  );
}
