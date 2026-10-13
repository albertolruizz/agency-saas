// Branding configurable en build: NEXT_PUBLIC_BRAND=nexo|faro|tinta|orbita|brote.
// Sin variable (o con un valor desconocido) se usa el branding original.
// Los colores, radios, sombras y tipografías de cada marca viven en globals.css bajo [data-brand].

export const BRANDS = {
  default: { name: "Agency SaaS", wordmark: "Agency SaaS" },
  nexo: { name: "Nexo", wordmark: "nexo" },
  faro: { name: "Faro", wordmark: "Faro" },
  tinta: { name: "Tinta", wordmark: "Tinta." },
  orbita: { name: "Órbita", wordmark: "órbita" },
  brote: { name: "Brote", wordmark: "Brote" },
} as const;

export type BrandId = keyof typeof BRANDS;

const requested = process.env.NEXT_PUBLIC_BRAND ?? "";

export const BRAND_ID: BrandId = requested in BRANDS ? (requested as BrandId) : "default";
export const brand = BRANDS[BRAND_ID];
