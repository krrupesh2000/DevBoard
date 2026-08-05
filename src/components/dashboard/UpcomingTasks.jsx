import { Link } from "react-router";

import Card from "../ui/Card";
import PriorityIndicator from "../ui/PriorityIndicator";
import StatusBadge from "../ui/StatusBadge";
import { formatDate } from "../../utils/date";

function UpcomingTasks({ tasks, projectMap }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">Upcoming Tasks</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Next deadlines across your projects.
          </p>
        </div>

        <Link
          to="/dashboard/tasks"
          className="shrink-0 text-sm font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="mt-6 divide-y divide-border">
        {tasks.map((task) => {
          const project = projectMap.get(task.projectId);

          return (
            <div key={task.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-medium">
                    {task.title}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {project?.name ?? "Unknown project"}
                  </p>
                </div>

                <StatusBadge status={task.status} />
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <PriorityIndicator priority={task.priority} />

                <time
                  dateTime={task.dueDate}
                  className="text-sm text-muted-foreground"
                >
                  {formatDate(task.dueDate)}
                </time>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default UpcomingTasks;
