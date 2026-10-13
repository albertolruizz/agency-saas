import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Globe, KanbanSquare, Mail, Pencil, Phone, Receipt, UserRound } from "lucide-react";
import { Badge, Card, CardHeader, Page, buttonStyles } from "@/components/ui";
import { getClient } from "@/lib/clients";
import { formatEuros, statusMeta } from "@/lib/client-status";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" });

export default async function ClientePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();
  const meta = statusMeta(client.status);
  const websiteHref = client.website && (client.website.startsWith("http") ? client.website : `https://${client.website}`);

  const contact = [
    { icon: UserRound, value: client.contactName },
    { icon: Mail, value: client.email, href: client.email && `mailto:${client.email}` },
    { icon: Phone, value: client.phone, href: client.phone && `tel:${client.phone.replace(/\s/g, "")}` },
    { icon: Globe, value: client.website, href: websiteHref },
  ];

  return (
    <Page>
      <Link href="/clientes" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="size-4" />
        Clientes
      </Link>

      <div className="flex items-end justify-between gap-4 pb-8">
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-accent-soft font-serif text-3xl text-accent">
            {client.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-4xl leading-tight tracking-tight">{client.name}</h1>
              <Badge tone={meta.tone}>{meta.label}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted">Cliente desde el {dateFmt.format(client.createdAt)}</p>
          </div>
        </div>
        <Link href={`/clientes/${id}/editar`} className={buttonStyles()}>
          <Pencil className="size-3.5" />
          Editar
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4">
          <Card>
            <CardHeader title="Contacto" />
            <ul className="space-y-3 px-5 pb-5 text-sm">
              {contact.map(({ icon: Icon, value, href }, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Icon className="size-4 shrink-0 text-subtle" strokeWidth={1.75} />
                  {value ? (
                    href ? (
                      <a href={href} className="truncate hover:underline" target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                        {value}
                      </a>
                    ) : (
                      <span className="truncate">{value}</span>
                    )
                  ) : (
                    <span className="text-subtle">—</span>
                  )}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <div className="text-xs font-medium text-muted">Fee mensual</div>
            <div className="mt-2 font-serif text-3xl leading-none">{formatEuros(client.monthlyFeeCents)}</div>
            <div className="mt-2 text-xs text-subtle">
              {client.monthlyFeeCents != null ? "Retainer recurrente" : "Trabajo por proyecto"}
            </div>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader title="Notas" />
            <p className="px-5 pb-5 text-sm whitespace-pre-wrap text-muted">{client.notes || "Sin notas todavía."}</p>
          </Card>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: KanbanSquare, label: "Boards" },
              { icon: Receipt, label: "Facturas" },
              { icon: FileText, label: "Presupuestos" },
            ].map(({ icon: Icon, label }) => (
              <Card key={label} className="p-5">
                <Icon className="size-4 text-subtle" strokeWidth={1.75} />
                <div className="mt-3 text-sm font-medium">{label}</div>
                <div className="text-xs text-subtle">Próximamente</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}
