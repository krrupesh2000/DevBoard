import TaskCard from "./TaskCard";
import TaskEmptyState from "./TaskEmptyState";

function TaskList({ tasks, projectMap, hasFilters, onClearFilters, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <TaskEmptyState hasFilters={hasFilters} onClearFilters={onClearFilters} />
    );
  }

  return (
    <div className="grid gap-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          project={projectMap.get(task.projectId)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
