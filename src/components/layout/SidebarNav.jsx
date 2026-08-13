import {
  PiArchive,
  PiChartPieSlice,
  PiCheckSquare,
  PiFolder,
  PiPulse,
  PiTrash,
} from "react-icons/pi";

import { NavLink } from "react-router";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: PiChartPieSlice,
    end: true,
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    icon: PiFolder,
  },
  {
    label: "Tasks",
    href: "/dashboard/tasks",
    icon: PiCheckSquare,
  },
  {
    label: "Activity",
    href: "/dashboard/activity",
    icon: PiPulse,
  },
  {
    label: "Archive",
    href: "/dashboard/archive",
    icon: PiArchive,
  },
  {
    label: "Trash",
    href: "/dashboard/trash",
    icon: PiTrash,
  },
];

function SidebarNav({ onNavigate }) {
  return (
    <nav aria-label="Main navigation">
      <ul className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  [
                    "group flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  ].join(" ")
                }
              >
                <Icon
                  size={20}
                  weight="regular"
                  className="shrink-0"
                  aria-hidden="true"
                />

                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SidebarNav;
