import { PiSignOut } from "react-icons/pi";

import useAuth from "../../auth/useAuth";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function UserPanel({ onLogout }) {
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    onLogout?.();
  }

  const initials = getInitials(user.name);

  return (
    <div className="border-t border-border p-4">
      <div className="flex items-center gap-3 px-2 py-2">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{user.name}</p>

          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-2 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <PiSignOut size={18} aria-hidden="true" />
        Sign out
      </button>
    </div>
  );
}

export default UserPanel;
