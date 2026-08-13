import TaskCard from "./TaskCard";
import TaskEmptyState from "./TaskEmptyState";

function TaskList({
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
    <div className="grid gap-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          project={projectMap.get(task.projectId)}
          onEdit={onEdit}
          onArchive={onArchive}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
