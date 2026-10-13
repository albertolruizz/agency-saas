export type NavItem = { href: string; label: string; icon: string };
export type NavGroup = { title: string; items: NavItem[] };

// Fuente única de verdad de la sidebar. Cada item tiene su ruta en src/app/<href>/page.tsx.
export const NAV: NavGroup[] = [
  {
    title: "Founder",
    items: [
      { href: "/", label: "Inicio", icon: "🏠" },
      { href: "/calendario", label: "Calendario", icon: "📅" },
      { href: "/tareas", label: "Mis tareas", icon: "✅" },
      { href: "/objetivos", label: "Objetivos y hábitos", icon: "🎯" },
    ],
  },
  {
    title: "Operaciones",
    items: [
      { href: "/boards", label: "Boards", icon: "🗂️" },
      { href: "/clientes", label: "Clientes", icon: "👥" },
      { href: "/portal", label: "Portal de clientes", icon: "🚪" },
      { href: "/archivos", label: "Archivos", icon: "📁" },
    ],
  },
  {
    title: "Ventas",
    items: [
      { href: "/crm", label: "CRM outreach", icon: "📨" },
      { href: "/agendado", label: "Links de agendado", icon: "🔗" },
      { href: "/presupuestos", label: "Presupuestos", icon: "📝" },
    ],
  },
  {
    title: "Finanzas",
    items: [
      { href: "/facturas", label: "Facturas", icon: "🧾" },
      { href: "/finanzas", label: "Ingresos y gastos", icon: "📈" },
    ],
  },
  {
    title: "Agencia",
    items: [
      { href: "/equipo", label: "Equipo", icon: "🧑‍💻" },
      { href: "/ajustes", label: "Ajustes", icon: "⚙️" },
    ],
  },
];
