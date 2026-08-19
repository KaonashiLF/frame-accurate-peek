import { createFileRoute, Link } from "@tanstack/react-router";
import { Sprout, ShieldCheck, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Terra Contratos — Acesso à plataforma" },
      {
        name: "description",
        content:
          "Entre na Terra Contratos para acompanhar contratos de commodities, preços de mercado e indicadores em tempo real.",
      },
      { property: "og:title", content: "Terra Contratos — Acesso à plataforma" },
      {
        property: "og:description",
        content: "Plataforma corporativa para gestão de contratos e preços de commodities.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden flex-col justify-between brand-gradient p-12 text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            <Sprout className="size-5" />
          </span>
          <p className="font-display text-lg font-semibold text-sidebar-accent-foreground">Terra Contratos</p>
        </div>

        <div className="max-w-md">
          <h2 className="font-display text-4xl font-semibold leading-tight text-sidebar-accent-foreground">
            Contratos e mercado de commodities em uma única visão.
          </h2>
          <p className="mt-4 text-sm text-sidebar-foreground/75">
            Acompanhe status, prazos, volumes e a variação diária dos preços com clareza executiva.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-sidebar-foreground/85">
            <li className="flex items-center gap-3">
              <TrendingUp className="size-4 text-sidebar-primary" /> Preços atualizados por praça e bolsa
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="size-4 text-sidebar-primary" /> Alertas de vencimento e exposição
            </li>
          </ul>
        </div>

        <p className="text-xs text-sidebar-foreground/50">© 2026 Terra Contratos. Todos os direitos reservados.</p>
      </section>

      <section className="flex items-center justify-center bg-background px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sprout className="size-5" />
            </span>
            <p className="font-display text-lg font-semibold">Terra Contratos</p>
          </div>

          <h1 className="font-display text-2xl font-semibold">Entrar na plataforma</h1>
          <p className="mt-1 text-sm text-muted-foreground">Use suas credenciais corporativas para continuar.</p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/dashboard";
            }}
          >
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                E-mail corporativo
              </label>
              <input
                id="email"
                type="email"
                defaultValue="lucas@terracontratos.com"
                className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="senha" className="text-sm font-medium">
                  Senha
                </label>
                <a href="#" className="text-xs font-medium text-primary hover:underline">
                  Esqueci minha senha
                </a>
              </div>
              <input
                id="senha"
                type="password"
                defaultValue="demonstracao"
                className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </div>

            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-primary font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Mockup de demonstração —{" "}
            <Link to="/dashboard" className="font-medium text-primary hover:underline">
              acessar sem login
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
