import { ArrowUpRight, Plus, Sparkles } from "lucide-react";
import { Badge, Button, Card, CardHeader, Page, PageHeader } from "@/components/ui";

// Datos de ejemplo hasta conectar la BD.
const DAYS = ["Lun 12", "Mar 13", "Mié 14", "Jue 15", "Vie 16"];
const HOURS = ["9:00", "10:00", "11:00", "12:00"];
const BLOCKS = [
  { day: 0, start: 0, span: 2, title: "Deep work: propuesta Nexo", tone: "accent" },
  { day: 1, start: 1, span: 1, title: "Call cliente Brava", tone: "neutral" },
  { day: 2, start: 0, span: 1, title: "Outreach 20 leads", tone: "success" },
  { day: 2, start: 2, span: 2, title: "Revisión boards", tone: "neutral" },
  { day: 3, start: 1, span: 2, title: "Deep work: funnel", tone: "accent" },
  { day: 4, start: 0, span: 1, title: "Facturación semanal", tone: "warning" },
] as const;

const BLOCK_TONES = {
  accent: "bg-accent-soft text-accent border-accent/20",
  neutral: "bg-surface-muted text-foreground border-border",
  success: "bg-success-soft text-success border-success/20",
  warning: "bg-warning-soft text-warning border-warning/20",
};

const STATS = [
  { label: "Facturado este mes", value: "18.400 €", delta: "+12%" },
  { label: "Pendiente de cobro", value: "4.250 €", delta: "3 facturas" },
  { label: "Leads activos", value: "37", delta: "+8 esta semana" },
  { label: "Proyectos en curso", value: "9", delta: "2 entregan hoy" },
];

const GOALS = [
  { title: "Llegar a 25k € MRR", progress: 72, status: "En camino" },
  { title: "Cerrar 4 clientes nuevos", progress: 50, status: "Ajustar" },
  { title: "Lanzar portal de clientes", progress: 28, status: "Desviado" },
] as const;

const GOAL_TONE = { "En camino": "success", Ajustar: "warning", Desviado: "danger" } as const;

const TASKS = [
  { title: "Enviar presupuesto a Nexo Studio", meta: "Ventas · 10:30", done: true },
  { title: "Revisar copy de la landing de Brava", meta: "Boards · 12:00", done: false },
  { title: "Seguimiento a 5 leads fríos", meta: "CRM · 16:00", done: false },
  { title: "Emitir factura de octubre", meta: "Finanzas · 18:00", done: false },
];

export default function Home() {
  return (
    <Page>
      <PageHeader
        title="Buenos días, Alberto"
        description="Tienes 4 tareas, 2 llamadas y 3h de deep work planificadas hoy."
        actions={
          <>
            <Button>Planificar semana</Button>
            <Button variant="primary">
              <Plus className="size-4" />
              Nueva tarea
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="text-xs font-medium text-muted">{s.label}</div>
            <div className="mt-2 font-serif text-3xl leading-none">{s.value}</div>
            <div className="mt-2 text-xs text-subtle">{s.delta}</div>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Plan de la semana"
            action={
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <Sparkles className="size-3.5 text-accent" />4 añadidas · 1 movida · 1 eliminada
              </span>
            }
          />
          <div className="px-5 pb-5">
            <div className="grid grid-cols-[3rem_repeat(5,1fr)] text-xs">
              <div />
              {DAYS.map((d, i) => (
                <div key={d} className={`pb-2 text-center font-medium ${i === 1 ? "text-accent" : "text-muted"}`}>
                  {d}
                </div>
              ))}
            </div>
            <div className="relative grid grid-cols-[3rem_repeat(5,1fr)] grid-rows-4">
              {HOURS.map((h, r) => (
                <div key={h} style={{ gridRow: r + 1, gridColumn: 1 }} className="h-14 pr-2 text-right text-[11px] text-subtle">
                  {h}
                </div>
              ))}
              {HOURS.map((h, r) =>
                DAYS.map((d, c) => (
                  <div
                    key={`${h}-${d}`}
                    style={{ gridRow: r + 1, gridColumn: c + 2 }}
                    className="border-t border-l border-border/70"
                  />
                )),
              )}
              {BLOCKS.map((b) => (
                <div
                  key={b.title}
                  style={{ gridRow: `${b.start + 1} / span ${b.span}`, gridColumn: b.day + 2 }}
                  className={`z-[1] m-1 rounded-lg border px-2 py-1.5 text-[11px] font-medium leading-snug ${BLOCK_TONES[b.tone]}`}
                >
                  {b.title}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Hoy" action={<span className="text-xs text-subtle">1 de 4</span>} />
          <ul className="px-3 pb-3">
            {TASKS.map((t) => (
              <li key={t.title} className="flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-surface-muted">
                <span
                  className={`mt-0.5 size-4 shrink-0 rounded-full border ${
                    t.done ? "border-accent bg-accent" : "border-subtle"
                  }`}
                />
                <span className="min-w-0">
                  <span className={`block text-sm ${t.done ? "text-subtle line-through" : ""}`}>{t.title}</span>
                  <span className="block text-xs text-subtle">{t.meta}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader
          title="Objetivos de la temporada"
          action={<span className="text-xs text-muted">Día 52 de 84</span>}
        />
        <div className="divide-y divide-border px-5 pb-2">
          {GOALS.map((g) => (
            <div key={g.title} className="flex items-center gap-4 py-3">
              <span className="w-56 truncate text-sm">{g.title}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-muted ring-1 ring-border">
                <div className="h-full rounded-full bg-foreground/80" style={{ width: `${g.progress}%` }} />
              </div>
              <span className="w-10 text-right text-xs text-muted">{g.progress}%</span>
              <span className="w-20 text-right">
                <Badge tone={GOAL_TONE[g.status]}>{g.status}</Badge>
              </span>
              <ArrowUpRight className="size-4 text-subtle" />
            </div>
          ))}
        </div>
      </Card>
    </Page>
  );
}
