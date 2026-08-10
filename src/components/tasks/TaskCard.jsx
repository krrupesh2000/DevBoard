
import Card from "../ui/Card";
import PriorityIndicator from "../ui/PriorityIndicator";
import StatusBadge from "../ui/StatusBadge";
import { formatDate } from "../../utils/date";

function TaskCard({ task, project, onEdit, onDelete }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold tracking-tight">
            {task.title}
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            {project?.name ?? "Unknown project"}
          </p>
        </div>

        <div className="shrink-0">
          <StatusBadge status={task.status} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <PriorityIndicator priority={task.priority} />

        <time
          dateTime={task.dueDate}
          className="text-xs text-muted-foreground"
        >
          {formatDate(task.dueDate)}
        </time>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(task)}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Delete
        </button>
      </div>
    </Card>
  );
}

export default TaskCard;

