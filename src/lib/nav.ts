import {
  BarChart3,
  CalendarDays,
  CheckSquare,
  DoorOpen,
  FileText,
  FolderOpen,
  House,
  KanbanSquare,
  Link2,
  Receipt,
  Send,
  Settings,
  Target,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon; description: string };
export type NavGroup = { title: string; items: NavItem[] };

// Fuente única de verdad de la sidebar. Cada item tiene su ruta en src/app/<href>/page.tsx.
export const NAV: NavGroup[] = [
  {
    title: "Founder",
    items: [
      { href: "/", label: "Inicio", icon: House, description: "Tu día de un vistazo" },
      { href: "/calendario", label: "Calendario", icon: CalendarDays, description: "Planifica tu semana" },
      { href: "/tareas", label: "Mis tareas", icon: CheckSquare, description: "Lo que tienes entre manos" },
      { href: "/objetivos", label: "Objetivos y hábitos", icon: Target, description: "Temporadas de 12 semanas" },
    ],
  },
  {
    title: "Operaciones",
    items: [
      { href: "/boards", label: "Boards", icon: KanbanSquare, description: "Proyectos y entregables" },
      { href: "/clientes", label: "Clientes", icon: Users, description: "Todas tus cuentas" },
      { href: "/portal", label: "Portal de clientes", icon: DoorOpen, description: "Lo que ve cada cliente" },
      { href: "/archivos", label: "Archivos", icon: FolderOpen, description: "Documentos y assets" },
    ],
  },
  {
    title: "Ventas",
    items: [
      { href: "/crm", label: "CRM outreach", icon: Send, description: "Prospección y seguimiento" },
      { href: "/agendado", label: "Links de agendado", icon: Link2, description: "Reservas de llamadas" },
      { href: "/presupuestos", label: "Presupuestos", icon: FileText, description: "Propuestas y estimaciones" },
    ],
  },
  {
    title: "Finanzas",
    items: [
      { href: "/facturas", label: "Facturas", icon: Receipt, description: "Emitidas y pendientes" },
      { href: "/finanzas", label: "Ingresos y gastos", icon: BarChart3, description: "Salud financiera" },
    ],
  },
  {
    title: "Agencia",
    items: [
      { href: "/equipo", label: "Equipo", icon: UserRound, description: "Personas y capacidad" },
      { href: "/ajustes", label: "Ajustes", icon: Settings, description: "Cuenta y preferencias" },
    ],
  },
];

export function findNav(pathname: string) {
  for (const group of NAV) {
    for (const item of group.items) {
      const match = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
      if (match) return { group, item };
    }
  }
  return null;
}
