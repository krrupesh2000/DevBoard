
import Card from "../ui/Card";
import PriorityIndicator from "../ui/PriorityIndicator";
import StatusBadge from "../ui/StatusBadge";
import { formatDate } from "../../utils/date";
import TaskEmptyState from "./TaskEmptyState";

function TaskTable({ tasks, projectMap, hasFilters, onClearFilters }) {
  if (tasks.length === 0) {
    return (
      <TaskEmptyState hasFilters={hasFilters} onClearFilters={onClearFilters} />
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-left">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th
                scope="col"
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Task
              </th>

              <th
                scope="col"
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Project
              </th>

              <th
                scope="col"
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Status
              </th>

              <th
                scope="col"
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Priority
              </th>

              <th
                scope="col"
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Due Date
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
                  <td className="px-5 py-4">
                    <p className="max-w-sm text-sm font-medium">{task.title}</p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-sm text-muted-foreground">
                      {project?.name ?? "Unknown project"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={task.status} />
                  </td>

                  <td className="px-5 py-4">
                    <PriorityIndicator priority={task.priority} />
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <time
                      dateTime={task.dueDate}
                      className="text-sm text-muted-foreground"
                    >
                      {formatDate(task.dueDate)}
                    </time>
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
