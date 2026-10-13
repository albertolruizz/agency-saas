"use client";

import { usePathname } from "next/navigation";
import { Bell, Play } from "lucide-react";
import { findNav } from "@/lib/nav";
import { Button } from "@/components/ui";

export function Topbar() {
  const pathname = usePathname();
  const current = findNav(pathname);
  const today = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
  const todayLabel = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-8 backdrop-blur">
      <div className="flex min-w-0 flex-1 items-center gap-2 text-sm">
        {current && <span className="text-subtle">{current.group.title}</span>}
        {current && <span className="text-subtle">/</span>}
        <span className="truncate font-medium">{current?.item.label ?? "Agency SaaS"}</span>
      </div>
      <span className="hidden text-sm text-muted md:inline" suppressHydrationWarning>
        {todayLabel}
      </span>
      <button
        aria-label="Notificaciones"
        className="flex size-8 items-center justify-center rounded-lg text-muted hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.05]"
      >
        <Bell className="size-4" />
      </button>
      <Button variant="primary">
        <Play className="size-3.5 fill-current" />
        Empezar foco
      </Button>
      <span className="flex size-8 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
        AR
      </span>
    </header>
  );
}
