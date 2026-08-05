import { PiListChecks } from "react-icons/pi";

import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import TaskCard from "./TaskCard";

function TaskList({ tasks, projectMap, hasFilters, onClearFilters }) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={PiListChecks}
        title={hasFilters ? "No matching tasks" : "No tasks yet"}
        description={
          hasFilters
            ? "Try changing your search or task filters."
            : "Tasks will appear here once they are created."
        }
        action={
          hasFilters ? (
            <Button variant="secondary" onClick={onClearFilters}>
              Clear filters
            </Button>
          ) : null
        }
      />
    );
  }

  return (
    <div className="grid gap-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          project={projectMap.get(task.projectId)}
        />
      ))}
    </div>
  );
}

export default TaskList;
