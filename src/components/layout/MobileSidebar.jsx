import { useEffect } from "react";
import { PiCode, PiX } from "react-icons/pi";
import UserPanel from "./UserPanel";
import SidebarNav from "./SidebarNav";

function MobileSidebar({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    function handleChange(event) {
      if (event.matches) {
        onClose();
      }
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      <aside className="absolute inset-y-0 left-0 z-10 flex w-[min(20rem,85vw)] flex-col border-r border-border bg-card">
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
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

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <PiX size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <SidebarNav onNavigate={onClose} />
        </div>

        <div className="border-t border-border p-4">
          <UserPanel onLogout={onClose} />
        </div>
      </aside>
    </div>
  );
}

export default MobileSidebar;
