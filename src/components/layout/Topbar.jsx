import { PiBell, PiCode, PiList } from "react-icons/pi";

function Topbar({ onOpenSidebar }) {
  return (
    <header className="sticky top-0 z-20 h-16 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={onOpenSidebar}
            aria-label="Open navigation menu"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          >
            <PiList size={22} aria-hidden="true" />
          </button>

          {/* Mobile brand */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <PiCode size={18} weight="bold" aria-hidden="true" />
            </div>

            <p className="hidden text-sm font-semibold sm:block">DevBoard</p>
          </div>

          {/* Desktop context */}
          <div className="hidden lg:block">
            <p className="text-sm font-medium">Developer Workspace</p>

            <p className="text-xs text-muted-foreground">
              Manage projects and stay productive.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Notifications"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <PiBell size={20} aria-hidden="true" />
          </button>

          <div className="ml-1 flex size-9 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            RK
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
