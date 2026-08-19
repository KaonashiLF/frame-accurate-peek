import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Building2, LogOut, Mail, Shield, User } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/ui-bits";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil e configurações | Terra Contratos" },
      {
        name: "description",
        content: "Gerencie dados do usuário, preferências de alertas e configurações da conta corporativa.",
      },
      { property: "og:title", content: "Perfil e configurações | Terra Contratos" },
      { property: "og:description", content: "Configurações de conta, notificações e segurança da plataforma." },
    ],
  }),
  component: Perfil,
});

const prefs = [
  { icon: Bell, titulo: "Alertas de vencimento", desc: "Avisar 30 dias antes do vencimento de cada contrato", on: true },
  { icon: Mail, titulo: "Resumo diário por e-mail", desc: "Consolidado de cotações e movimentações às 7h", on: true },
  { icon: Shield, titulo: "Autenticação em dois fatores", desc: "Exigir código adicional no login", on: false },
];

function Perfil() {
  return (
    <AppShell title="Perfil" subtitle="Dados da conta e preferências">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="surface-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary font-display text-lg font-semibold text-primary-foreground">
              LF
            </div>
            <div>
              <p className="font-display text-base font-semibold">Lucas Francisco</p>
              <p className="text-sm text-muted-foreground">Analista de Originação</p>
            </div>
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <Mail className="size-4" /> lucas@terracontratos.com
            </div>
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <Building2 className="size-4" /> Terra Agro Trading
            </div>
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <User className="size-4" /> Perfil: gestor de contratos
            </div>
          </dl>
          <Link
            to="/"
            className="mt-6 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-border text-sm font-medium text-destructive"
          >
            <LogOut className="size-4" /> Sair da conta
          </Link>
        </div>

        <SectionCard title="Preferências" description="Notificações e segurança" className="lg:col-span-2">
          <ul className="divide-y divide-border">
            {prefs.map((p) => (
              <li key={p.titulo} className="flex items-center gap-4 px-4 py-4 sm:px-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <p.icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{p.titulo}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
                <span
                  className={`flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 ${p.on ? "bg-accent" : "bg-muted"}`}
                >
                  <span
                    className={`size-5 rounded-full bg-card shadow transition-transform ${p.on ? "translate-x-5" : ""}`}
                  />
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </AppShell>
  );
}
