import type { ComponentProps, ReactNode } from "react";

// Componentes base del sistema visual. Mantener pequeños y sin dependencias.

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cx("rounded-2xl border border-border bg-surface shadow-card", className)}
      {...props}
    />
  );
}

export function CardHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 pt-4 pb-3">
      <h2 className="text-sm font-semibold">{title}</h2>
      {action}
    </div>
  );
}

const buttonVariants = {
  primary: "bg-foreground text-background hover:opacity-90",
  secondary: "border border-border bg-surface text-foreground shadow-card hover:bg-surface-muted",
  ghost: "text-muted hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.05]",
};

export function buttonStyles(variant: keyof typeof buttonVariants = "secondary", className?: string) {
  return cx(
    "inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition disabled:opacity-60",
    buttonVariants[variant],
    className,
  );
}

export function Button({
  variant = "secondary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: keyof typeof buttonVariants }) {
  return (
    <button className={buttonStyles(variant, className)} {...props} />
  );
}

const badgeTones = {
  neutral: "bg-surface-muted text-muted ring-border",
  accent: "bg-accent-soft text-accent ring-transparent",
  success: "bg-success-soft text-success ring-transparent",
  warning: "bg-warning-soft text-warning ring-transparent",
  danger: "bg-danger-soft text-danger ring-transparent",
};

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: keyof typeof badgeTones;
  children: ReactNode;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1",
        badgeTones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 pb-8">
      <div>
        <h1 className="font-serif text-4xl leading-tight tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-8 py-10">{children}</div>;
}
