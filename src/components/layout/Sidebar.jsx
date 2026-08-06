import { PiCode } from "react-icons/pi";
import UserPanel from "./UserPanel";
import SidebarNav from "./SidebarNav";

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-card lg:flex lg:flex-col">
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-border px-5">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <PiCode size={20} weight="bold" aria-hidden="true" />
          </div>

          <div>
            <p className="text-sm font-semibold leading-none">DevBoard</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Developer Workspace
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-5">
        <SidebarNav />
      </div>

      {/* Profile */}
      <UserPanel />
    </aside>
  );
}

export default Sidebar;
