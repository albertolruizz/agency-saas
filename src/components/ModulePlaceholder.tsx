import { Plus } from "lucide-react";
import { NAV } from "@/lib/nav";
import { Button, Card, Page, PageHeader } from "@/components/ui";

// Página provisional de cada módulo hasta que tenga su propia UI.
export function ModulePlaceholder({ href }: { href: string }) {
  const item = NAV.flatMap((g) => g.items).find((i) => i.href === href);
  if (!item) return null;
  const Icon = item.icon;

  return (
    <Page>
      <PageHeader
        title={item.label}
        description={item.description}
        actions={
          <Button variant="primary">
            <Plus className="size-4" />
            Nuevo
          </Button>
        }
      />
      <Card className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <span className="flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <h2 className="mt-4 font-serif text-2xl">Aún no hay nada aquí</h2>
        <p className="mt-1 max-w-sm text-sm text-muted">
          Este módulo está en construcción. Muy pronto podrás trabajar en {item.label} desde
          aquí.
        </p>
      </Card>
    </Page>
  );
}
