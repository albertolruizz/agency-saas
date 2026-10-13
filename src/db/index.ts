import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import * as schema from "./schema";

function connect() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Falta DATABASE_URL. Abre el túnel (./ops/db-tunnel.sh) y revisa .env.local");
  }
  return drizzle(postgres(url, { max: 5 }), { schema });
}

// Conexión perezosa (el build no necesita BD) y reutilizada entre recargas en desarrollo.
const globalForDb = globalThis as unknown as { db?: ReturnType<typeof connect> };

export function getDb() {
  globalForDb.db ??= connect();
  return globalForDb.db;
}

const DEFAULT_WORKSPACE_SLUG = "mi-agencia";

// Hasta que haya auth, todo va al workspace por defecto (lo crea la migración 0001).
export async function getCurrentWorkspaceId() {
  const ws = await getDb().query.workspaces.findFirst({
    where: eq(schema.workspaces.slug, DEFAULT_WORKSPACE_SLUG),
  });
  if (!ws) throw new Error("No existe el workspace por defecto. Ejecuta npm run db:migrate");
  return ws.id;
}
