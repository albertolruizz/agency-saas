# agency-app-mainsaas

La app todo-en-uno para dueños de agencias: desde el founder en solitario que factura 0 € hasta la agencia con equipo. Pensada como "el ecommchess de las agencias": máximo de herramientas útiles desde el día uno, sin la curva de aprender 30 softwares distintos.

## Visión

- **Para todos los tamaños.** Si un founder de 0k siente que es solo para agencias grandes, no entra. El producto debe ser útil para una persona sola y escalar a equipos.
- **Agencia + founder.** Herramientas para operar la agencia y también para la productividad personal del founder.
- **Mejor experiencia para el cliente final**, para reducir el churn al mínimo.

## Módulos

| Módulo | Qué hace |
|---|---|
| Boards | Gestión de proyectos y tareas (kanban/listas) por cliente y equipo |
| Calendario | Calendario del founder y del equipo, con tareas y reuniones |
| Links de agendado | Páginas de reserva para que los clientes agenden meetings directamente |
| Facturas | Emisión, envío y seguimiento de cobros |
| Presupuestos | Propuestas/presupuestos que se convierten en factura o proyecto |
| CRM de outreach | Pipeline de leads y secuencias de prospección |
| Portal de clientes | Espacio donde el cliente ve proyectos, entregables, facturas y se comunica con la agencia |
| Panel del founder | Dashboard personal con lo útil del día a día (como el panel actual de iurop) |

## Referencias

- https://www.superfocus.me/ (SaaS actual de iurop)
- https://www.flozy.com/ (plataforma todo-en-uno para agencias; incluye portal de clientes)

## Arrancar en local

Requisitos: Node 20+.

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Cada pestaña de la sidebar es una ruta en `src/app/<ruta>/page.tsx`; la sidebar se define en `src/lib/nav.ts`.

## Stack

Next.js 15 (App Router) + TypeScript + Tailwind CSS 4.

## Planteamiento de desarrollo

1. **Esqueleto (este MVP):** layout con sidebar y una ruta por módulo.
2. **Base:** auth + multi-workspace (agencia) + modelo de datos de Clientes (Postgres/Supabase + Drizzle o Prisma). Todo cuelga de *cliente*.
3. **Núcleo operativo:** Boards y Mis tareas, Calendario.
4. **Dinero:** Presupuestos → Facturas (Stripe para cobros), Ingresos y gastos.
5. **Captación:** CRM outreach y Links de agendado.
6. **Cliente final:** Portal de clientes (proyectos, entregables, facturas, mensajes).
7. **Founder:** Inicio (panel del día), Objetivos y hábitos.
