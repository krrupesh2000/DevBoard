import { PiArchive, PiNotePencil, PiTrash } from "react-icons/pi";

import Card from "../ui/Card";
import IconButton from "../ui/IconButton";
import PriorityIndicator from "../ui/PriorityIndicator";
import StatusBadge from "../ui/StatusBadge";

import { formatDate } from "../../utils/date";

import TaskEmptyState from "./TaskEmptyState";

function TaskTable({
  tasks,
  projectMap,
  hasFilters,
  onClearFilters,
  onEdit,
  onArchive,
  onDelete,
}) {
  if (tasks.length === 0) {
    return (
      <TaskEmptyState hasFilters={hasFilters} onClearFilters={onClearFilters} />
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-190">
          <thead className="border-b border-border bg-muted/30">
            <tr>
              <th
                scope="col"
                className="w-[30%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:px-5"
              >
                Task
              </th>

              <th
                scope="col"
                className="w-[20%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:px-5"
              >
                Project
              </th>

              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:px-5"
              >
                Status
              </th>

              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:px-5"
              >
                Priority
              </th>

              <th
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:px-5"
              >
                Due Date
              </th>

              <th
                scope="col"
                className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:px-5"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {tasks.map((task) => {
              const project = projectMap.get(task.projectId);

              return (
                <tr
                  key={task.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="px-4 py-4 lg:px-5">
                    <p className="max-w-sm wrap-break-word text-sm font-medium">
                      {task.title}
                    </p>
                  </td>

                  <td className="px-4 py-4 lg:px-5">
                    <span className="block max-w-45 truncate text-sm text-muted-foreground">
                      {project?.name ?? "Unknown project"}
                    </span>
                  </td>

                  <td className="px-4 py-4 lg:px-5">
                    <StatusBadge status={task.status} />
                  </td>

                  <td className="px-4 py-4 lg:px-5">
                    <PriorityIndicator priority={task.priority} />
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 lg:px-5">
                    <time
                      dateTime={task.dueDate}
                      className="text-sm text-muted-foreground"
                    >
                      {formatDate(task.dueDate)}
                    </time>
                  </td>

                  <td className="px-4 py-4 lg:px-5">
                    <div className="flex justify-end gap-1">
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default TaskTable;
