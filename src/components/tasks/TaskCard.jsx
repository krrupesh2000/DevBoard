import { PiArchive, PiNotePencil, PiTrash } from "react-icons/pi";

import Card from "../ui/Card";
import IconButton from "../ui/IconButton";
import PriorityIndicator from "../ui/PriorityIndicator";
import StatusBadge from "../ui/StatusBadge";

import { formatDate } from "../../utils/date";

function TaskCard({ task, project, onEdit, onArchive, onDelete }) {
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

        <time dateTime={task.dueDate} className="text-xs text-muted-foreground">
          {formatDate(task.dueDate)}
        </time>
      </div>

      <div className="mt-4 flex justify-end gap-1">
        <IconButton
          label="Edit task"
          icon={<PiNotePencil size={17} aria-hidden="true" />}
          onClick={() => onEdit(task)}
        />

        <IconButton
          label="Archive task"
          icon={<PiArchive size={17} aria-hidden="true" />}
          onClick={() => onArchive(task)}
        />

        <IconButton
          label="Move task to trash"
          variant="danger"
          icon={<PiTrash size={17} aria-hidden="true" />}
          onClick={() => onDelete(task)}
        />
      </div>
    </Card>
  );
}

export default TaskCard;
