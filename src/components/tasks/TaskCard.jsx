import Card from "../ui/Card";
import PriorityIndicator from "../ui/PriorityIndicator";
import StatusBadge from "../ui/StatusBadge";
import { formatDate } from "../../utils/date";

function TaskCard({ task, project }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold leading-6">{task.title}</h2>

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

        <time dateTime={task.dueDate} className="text-xs text-muted-foreground">
          {formatDate(task.dueDate)}
        </time>
      </div>
    </Card>
  );
}

export default TaskCard;
