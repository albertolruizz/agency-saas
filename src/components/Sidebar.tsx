"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsUpDown, Search, Timer } from "lucide-react";
import { NAV } from "@/lib/nav";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="px-3 pt-3">
        <button className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left hover:bg-black/[0.04] dark:hover:bg-white/[0.05]">
          <span className="flex size-7 items-center justify-center rounded-md bg-accent font-serif text-lg leading-none text-white">
            a
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold">Mi agencia</span>
            <span className="block truncate text-xs text-muted">Plan founder</span>
          </span>
          <ChevronsUpDown className="size-4 text-subtle" />
        </button>

        <button className="mt-3 flex w-full items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm text-muted shadow-card hover:text-foreground">
          <Search className="size-4" />
          <span className="flex-1 text-left">Buscar</span>
          <kbd className="rounded border border-border px-1.5 font-sans text-[11px] text-subtle">⌘K</kbd>
        </button>
      </div>

      <nav className="mt-4 flex-1 overflow-y-auto px-3 pb-4">
        {NAV.map((group) => (
          <div key={group.title} className="mb-5">
            <div className="px-2 pb-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">
              {group.title}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                      active
                        ? "bg-surface font-medium text-foreground shadow-card ring-1 ring-border"
                        : "text-muted hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    <Icon className={`size-4 ${active ? "text-accent" : ""}`} strokeWidth={1.75} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <div className="rounded-xl border border-border bg-surface p-3 shadow-card">
          <div className="flex items-center gap-2 text-xs font-medium text-muted">
            <Timer className="size-3.5 text-accent" />
            Foco de hoy
          </div>
          <div className="mt-1 font-serif text-2xl leading-tight">2h 15m</div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-muted ring-1 ring-border">
            <div className="h-full w-[56%] rounded-full bg-accent" />
          </div>
          <div className="mt-1.5 text-xs text-subtle">56% de tu objetivo de 4h</div>
        </div>
      </div>
    </aside>
  );
}
