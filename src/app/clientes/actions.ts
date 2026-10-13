"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentWorkspaceId, getDb } from "@/db";
import { clients } from "@/db/schema";
import { isClientStatus } from "@/lib/client-status";

export type ClientFormState = { error?: string; fields?: Record<string, string> };

function text(form: FormData, key: string) {
  const value = String(form.get(key) ?? "").trim();
  return value === "" ? null : value;
}

function parse(form: FormData) {
  const fields = Object.fromEntries(
    ["name", "contactName", "email", "phone", "website", "status", "monthlyFee", "notes"].map((k) => [
      k,
      String(form.get(k) ?? ""),
    ]),
  );
  const name = text(form, "name");
  if (!name) return { error: "El nombre es obligatorio.", fields };

  const email = text(form, "email");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "El email no es válido.", fields };

  const status = form.get("status");
  if (!isClientStatus(status)) return { error: "Estado no válido.", fields };

  const feeRaw = text(form, "monthlyFee");
  let monthlyFeeCents: number | null = null;
  if (feeRaw) {
    const fee = Number(feeRaw.replace(",", "."));
    if (!Number.isFinite(fee) || fee < 0) return { error: "El fee mensual debe ser un número positivo.", fields };
    monthlyFeeCents = Math.round(fee * 100);
  }

  return {
    values: {
      name,
      contactName: text(form, "contactName"),
      email,
      phone: text(form, "phone"),
      website: text(form, "website"),
      status,
      monthlyFeeCents,
      notes: text(form, "notes"),
    },
  };
}

export async function createClient(_prev: ClientFormState, form: FormData): Promise<ClientFormState> {
  const parsed = parse(form);
  if (!parsed.values) return parsed;
  const workspaceId = await getCurrentWorkspaceId();
  const [created] = await getDb()
    .insert(clients)
    .values({ ...parsed.values, workspaceId })
    .returning({ id: clients.id });
  revalidatePath("/clientes");
  redirect(`/clientes/${created.id}`);
}

export async function updateClient(id: string, _prev: ClientFormState, form: FormData): Promise<ClientFormState> {
  const parsed = parse(form);
  if (!parsed.values) return parsed;
  const workspaceId = await getCurrentWorkspaceId();
  await getDb()
    .update(clients)
    .set({ ...parsed.values, updatedAt: new Date() })
    .where(and(eq(clients.id, id), eq(clients.workspaceId, workspaceId)));
  revalidatePath("/clientes");
  redirect(`/clientes/${id}`);
}

export async function deleteClient(id: string) {
  const workspaceId = await getCurrentWorkspaceId();
  await getDb()
    .delete(clients)
    .where(and(eq(clients.id, id), eq(clients.workspaceId, workspaceId)));
  revalidatePath("/clientes");
  redirect("/clientes");
}
