import { ClientForm } from "@/components/ClientForm";
import { Page, PageHeader } from "@/components/ui";
import { createClient } from "../actions";

export default function NuevoClientePage() {
  return (
    <Page>
      <div className="mx-auto max-w-2xl">
        <PageHeader title="Nuevo cliente" description="Lo básico para empezar. Podrás completarlo después." />
        <ClientForm action={createClient} cancelHref="/clientes" />
      </div>
    </Page>
  );
}
