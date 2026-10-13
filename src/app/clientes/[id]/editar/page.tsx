import { notFound } from "next/navigation";
import { ClientForm } from "@/components/ClientForm";
import { Button, Page, PageHeader } from "@/components/ui";
import { getClient } from "@/lib/clients";
import { deleteClient, updateClient } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditarClientePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();

  return (
    <Page>
      <div className="mx-auto max-w-2xl">
        <PageHeader title={`Editar ${client.name}`} />
        <ClientForm action={updateClient.bind(null, id)} client={client} cancelHref={`/clientes/${id}`} />
        <form action={deleteClient.bind(null, id)} className="mt-10 border-t border-border pt-6">
          <p className="text-sm text-muted">
            Eliminar borra el cliente para siempre. Si solo ya no trabajas con él, mejor márcalo como archivado.
          </p>
          <Button type="submit" className="mt-3 text-danger">
            Eliminar cliente
          </Button>
        </form>
      </div>
    </Page>
  );
}
