import Link from "next/link";
import { Plus, Search, Users } from "lucide-react";
import { Badge, Card, Page, PageHeader, buttonStyles } from "@/components/ui";
import { getClientStats, listClients } from "@/lib/clients";
import { CLIENT_STATUSES, formatEuros, isClientStatus, statusMeta } from "@/lib/client-status";

export const dynamic = "force-dynamic";

export default async function ClientesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; estado?: string }>;
}) {
  const { q, estado } = await searchParams;
  const status = isClientStatus(estado) ? estado : undefined;
  const [rows, stats] = await Promise.all([listClients({ q: q?.trim() || undefined, status }), getClientStats()]);

  const filterHref = (value?: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (value) params.set("estado", value);
    const qs = params.toString();
    return qs ? `/clientes?${qs}` : "/clientes";
  };

  return (
    <Page>
      <PageHeader
        title="Clientes"
        description="Todas tus cuentas en un sitio."
        actions={
          <Link href="/clientes/nuevo" className={buttonStyles("primary")}>
            <Plus className="size-4" />
            Nuevo cliente
          </Link>
        }
      />

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Clientes activos", value: String(stats.active) },
          { label: "Leads", value: String(stats.leads) },
          { label: "MRR de retainers", value: formatEuros(stats.mrrCents) },
        ].map((s) => (
          <Card key={s.label} className="p-5">
            <div className="text-xs font-medium text-muted">{s.label}</div>
            <div className="mt-2 font-serif text-3xl leading-none">{s.value}</div>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <form className="relative" action="/clientes">
          {status && <input type="hidden" name="estado" value={status} />}
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-subtle" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Buscar por nombre, contacto o email"
            className="h-8 w-72 rounded-lg border border-border bg-surface pr-3 pl-8 text-sm shadow-card outline-none placeholder:text-subtle focus:border-accent"
          />
        </form>
        <div className="flex gap-1 rounded-lg bg-black/[0.04] p-0.5 text-sm dark:bg-white/[0.05]">
          {[{ value: undefined, label: "Todos" }, ...CLIENT_STATUSES].map((s) => {
            const active = s.value === status;
            return (
              <Link
                key={s.label}
                href={filterHref(s.value)}
                className={`rounded-md px-2.5 py-1 ${
                  active ? "bg-surface font-medium shadow-card" : "text-muted hover:text-foreground"
                }`}
              >
                {s.label}
              </Link>
            );
          })}
        </div>
      </div>

      <Card className="mt-4 overflow-hidden">
        {rows.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Users className="size-5" strokeWidth={1.75} />
            </span>
            <h2 className="mt-4 font-serif text-2xl">
              {q || status ? "Sin resultados" : "Tu primer cliente"}
            </h2>
            <p className="mt-1 max-w-sm text-sm text-muted">
              {q || status
                ? "Prueba con otra búsqueda o quita el filtro."
                : "Añade un cliente y desde aquí colgarán sus boards, facturas y portal."}
            </p>
            {!q && !status && (
              <Link href="/clientes/nuevo" className={buttonStyles("primary", "mt-5")}>
                <Plus className="size-4" />
                Nuevo cliente
              </Link>
            )}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium">Contacto</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 text-right font-medium">Fee mensual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((c) => {
                const meta = statusMeta(c.status);
                return (
                  <tr key={c.id} className="group hover:bg-surface-muted">
                    <td className="px-5 py-3">
                      <Link href={`/clientes/${c.id}`} className="flex items-center gap-3">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft font-serif text-base text-accent">
                          {c.name.charAt(0).toUpperCase()}
                        </span>
                        <span className="font-medium group-hover:underline">{c.name}</span>
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-muted">
                      <div>{c.contactName ?? "—"}</div>
                      {c.email && <div className="text-xs text-subtle">{c.email}</div>}
                    </td>
                    <td className="px-5 py-3">
                      <Badge tone={meta.tone}>{meta.label}</Badge>
                    </td>
                    <td className="px-5 py-3 text-right tabular-nums">{formatEuros(c.monthlyFeeCents)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
    </Page>
  );
}
