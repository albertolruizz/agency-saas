import "server-only";
import { and, asc, desc, eq, ilike, or, sql, type SQL } from "drizzle-orm";
import { getCurrentWorkspaceId, getDb } from "@/db";
import { clients, type ClientStatus } from "@/db/schema";

export async function listClients({ q, status }: { q?: string; status?: ClientStatus }) {
  const workspaceId = await getCurrentWorkspaceId();
  const filters: (SQL | undefined)[] = [eq(clients.workspaceId, workspaceId)];
  if (status) filters.push(eq(clients.status, status));
  if (q) {
    const term = `%${q}%`;
    filters.push(or(ilike(clients.name, term), ilike(clients.contactName, term), ilike(clients.email, term)));
  }
  return getDb()
    .select()
    .from(clients)
    .where(and(...filters))
    .orderBy(asc(sql`${clients.status} = 'archivado'`), desc(clients.updatedAt));
}

export async function getClientStats() {
  const workspaceId = await getCurrentWorkspaceId();
  const [row] = await getDb()
    .select({
      active: sql<number>`count(*) filter (where ${clients.status} = 'activo')`.mapWith(Number),
      leads: sql<number>`count(*) filter (where ${clients.status} = 'lead')`.mapWith(Number),
      mrrCents: sql<number>`coalesce(sum(${clients.monthlyFeeCents}) filter (where ${clients.status} = 'activo'), 0)`.mapWith(Number),
    })
    .from(clients)
    .where(eq(clients.workspaceId, workspaceId));
  return row;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getClient(id: string) {
  if (!UUID.test(id)) return null;
  const workspaceId = await getCurrentWorkspaceId();
  const [row] = await getDb()
    .select()
    .from(clients)
    .where(and(eq(clients.id, id), eq(clients.workspaceId, workspaceId)));
  return row ?? null;
}
