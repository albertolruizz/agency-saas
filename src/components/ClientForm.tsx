"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { ClientFormState } from "@/app/clientes/actions";
import type { Client } from "@/db/schema";
import { CLIENT_STATUSES } from "@/lib/client-status";
import { Button, Card } from "@/components/ui";

const input =
  "h-9 w-full rounded-lg border border-border bg-surface px-3 text-sm shadow-card outline-none placeholder:text-subtle focus:border-accent focus:ring-2 focus:ring-accent/15";

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-subtle">{hint}</span>}
    </label>
  );
}

export function ClientForm({
  action,
  client,
  cancelHref,
}: {
  action: (state: ClientFormState, form: FormData) => Promise<ClientFormState>;
  client?: Client;
  cancelHref: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const value = (key: string, fallback: string | null | undefined) => state.fields?.[key] ?? fallback ?? "";
  const fee = client?.monthlyFeeCents != null ? String(client.monthlyFeeCents / 100) : "";

  return (
    <form action={formAction}>
      <Card className="p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Nombre del cliente *">
              <input name="name" required autoFocus className={input} defaultValue={value("name", client?.name)} placeholder="Nexo Studio" />
            </Field>
          </div>
          <Field label="Persona de contacto">
            <input name="contactName" className={input} defaultValue={value("contactName", client?.contactName)} placeholder="Laura Gómez" />
          </Field>
          <Field label="Email">
            <input name="email" type="email" className={input} defaultValue={value("email", client?.email)} placeholder="laura@nexo.studio" />
          </Field>
          <Field label="Teléfono">
            <input name="phone" className={input} defaultValue={value("phone", client?.phone)} placeholder="+34 600 000 000" />
          </Field>
          <Field label="Web">
            <input name="website" className={input} defaultValue={value("website", client?.website)} placeholder="nexo.studio" />
          </Field>
          <Field label="Estado">
            <select name="status" className={input} defaultValue={value("status", client?.status ?? "activo")}>
              {CLIENT_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Fee mensual (€)" hint="Retainer recurrente. Déjalo vacío si es por proyecto.">
            <input name="monthlyFee" type="number" min="0" step="0.01" className={input} defaultValue={value("monthlyFee", fee)} placeholder="1500" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Notas">
              <textarea
                name="notes"
                rows={4}
                className={`${input} h-auto py-2`}
                defaultValue={value("notes", client?.notes)}
                placeholder="Contexto, acuerdos, próximos pasos…"
              />
            </Field>
          </div>
        </div>
      </Card>

      <div className="mt-4 flex items-center justify-end gap-2">
        {state.error && <p className="mr-auto text-sm text-danger">{state.error}</p>}
        <Link href={cancelHref} className="inline-flex h-8 items-center rounded-lg px-3 text-sm font-medium text-muted hover:text-foreground">
          Cancelar
        </Link>
        <Button variant="primary" type="submit" disabled={pending}>
          {pending ? "Guardando…" : client ? "Guardar cambios" : "Crear cliente"}
        </Button>
      </div>
    </form>
  );
}
