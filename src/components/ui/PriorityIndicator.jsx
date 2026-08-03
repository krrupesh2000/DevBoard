const priorityStyles = {
  high: "bg-danger",
  medium: "bg-warning",
  low: "bg-success",
};

const priorityLabels = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

function PriorityIndicator({ priority }) {
  const dotStyle = priorityStyles[priority] ?? "bg-muted-foreground";

  const label = priorityLabels[priority] ?? priority;

  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
      <span
        className={["size-2 rounded-full", dotStyle].join(" ")}
        aria-hidden="true"
      />

      <span>{label}</span>
    </span>
  );
}

export default PriorityIndicator;
