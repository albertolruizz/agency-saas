import { BRAND_ID, brand } from "@/lib/brand";

// Isotipo de cada marca. Usa currentColor y los tokens del tema para heredar la paleta.
function Mark() {
  switch (BRAND_ID) {
    case "nexo":
      return (
        <svg viewBox="0 0 28 28" className="size-7" aria-hidden>
          <rect width="28" height="28" rx="6" className="fill-accent" />
          <circle cx="11" cy="14" r="5.5" fill="none" stroke="var(--on-accent)" strokeWidth="2.2" />
          <circle cx="17" cy="14" r="5.5" fill="none" stroke="var(--on-accent)" strokeWidth="2.2" />
        </svg>
      );
    case "faro":
      return (
        <svg viewBox="0 0 28 28" className="size-7" aria-hidden>
          <rect width="28" height="28" rx="8" className="fill-surface-muted" />
          <path d="M13 6h2l2 16h-6z" className="fill-foreground" />
          <path d="M16 9 26 5v10z" className="fill-accent" opacity="0.9" />
          <circle cx="14" cy="9" r="1.6" className="fill-accent" />
        </svg>
      );
    case "tinta":
      return (
        <svg viewBox="0 0 28 28" className="size-7" aria-hidden>
          <rect x="0.75" y="0.75" width="26.5" height="26.5" className="fill-surface" stroke="var(--foreground)" strokeWidth="1.5" />
          <path d="M14 5c4 5.5 6 8.6 6 11.3a6 6 0 0 1-12 0C8 13.6 10 10.5 14 5z" className="fill-accent" />
        </svg>
      );
    case "orbita":
      return (
        <svg viewBox="0 0 28 28" className="size-7" aria-hidden>
          <circle cx="14" cy="14" r="14" className="fill-accent" />
          <ellipse cx="14" cy="14" rx="10" ry="4" fill="none" stroke="var(--on-accent)" strokeWidth="1.6" transform="rotate(-28 14 14)" opacity="0.85" />
          <circle cx="14" cy="14" r="4" fill="var(--on-accent)" />
          <circle cx="22.5" cy="9.5" r="1.8" fill="var(--on-accent)" />
        </svg>
      );
    case "brote":
      return (
        <svg viewBox="0 0 28 28" className="size-7" aria-hidden>
          <rect width="28" height="28" rx="14" className="fill-accent" />
          <path d="M14 21v-7" stroke="var(--on-accent)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14 14c0-4 2.6-6.5 7-6.5 0 4.4-2.6 6.5-7 6.5z" fill="var(--on-accent)" />
          <path d="M14 16.5c0-3-2-5-5.5-5 0 3.3 2 5 5.5 5z" fill="var(--on-accent)" opacity="0.75" />
        </svg>
      );
    default:
      return null;
  }
}

// Cabecera de marca del producto en la sidebar. El branding original no la muestra.
export function BrandLogo() {
  if (BRAND_ID === "default") return null;
  return (
    <div className="flex items-center gap-2.5 px-2 pb-3">
      <Mark />
      <span className="brand-wordmark font-serif text-xl leading-none">{brand.wordmark}</span>
    </div>
  );
}
