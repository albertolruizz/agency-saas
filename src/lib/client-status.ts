import type { ClientStatus } from "@/db/schema";

export const CLIENT_STATUSES: { value: ClientStatus; label: string; tone: "accent" | "success" | "warning" | "neutral" }[] = [
  { value: "activo", label: "Activo", tone: "success" },
  { value: "lead", label: "Lead", tone: "accent" },
  { value: "pausado", label: "Pausado", tone: "warning" },
  { value: "archivado", label: "Archivado", tone: "neutral" },
];

export function statusMeta(status: ClientStatus) {
  return CLIENT_STATUSES.find((s) => s.value === status)!;
}

export function isClientStatus(value: unknown): value is ClientStatus {
  return CLIENT_STATUSES.some((s) => s.value === value);
}

export function formatEuros(cents: number | null) {
  if (cents == null) return "—";
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
    cents / 100,
  );
}
