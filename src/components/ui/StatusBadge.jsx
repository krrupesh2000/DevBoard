const statusStyles = {
  active: "border-primary/20 bg-primary/10 text-primary",

  planning: "border-violet-500/20 bg-violet-500/10 text-violet-400",

  "on-hold": "border-warning/20 bg-warning/10 text-warning",

  completed: "border-success/20 bg-success/10 text-success",

  todo: "border-border bg-muted text-muted-foreground",

  "in-progress": "border-primary/20 bg-primary/10 text-primary",
};

const statusLabels = {
  active: "Active",
  planning: "Planning",
  "on-hold": "On Hold",
  completed: "Completed",
  todo: "To Do",
  "in-progress": "In Progress",
};

function StatusBadge({ status }) {
  const styles =
    statusStyles[status] ?? "border-border bg-muted text-muted-foreground";

  const label = statusLabels[status] ?? status;

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        styles,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

export default StatusBadge;
