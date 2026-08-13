import SearchInput from "../ui/SearchInput";
import Select from "../ui/Select";
import Button from "../ui/Button";

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const priorityOptions = [
  { value: "all", label: "All priorities" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const sortOptions = [
  { value: "due-asc", label: "Due date: earliest" },
  { value: "due-desc", label: "Due date: latest" },
  { value: "priority-desc", label: "Priority: highest" },
  { value: "title-asc", label: "Task: A–Z" },
];

function TaskToolbar({
  search,
  onSearchChange,
  project,
  onProjectChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  sort,
  onSortChange,
  projects,
  onAddTask,
}) {
  const projectOptions = [
    { value: "all", label: "All projects" },
    ...projects.map((item) => ({
      value: item.id,
      label: item.name,
    })),
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <SearchInput
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks..."
            className="w-full sm:max-w-md"
          />
        </div>

        <Button
          type="button"
          onClick={onAddTask}
          className="w-full shrink-0 sm:w-auto"
        >
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4">
        <Select
          value={project}
          onValueChange={onProjectChange}
          ariaLabel="Filter tasks by project"
          options={projectOptions}
          className="w-full min-w-0"
        />

        <Select
          value={status}
          onValueChange={onStatusChange}
          ariaLabel="Filter tasks by status"
          options={statusOptions}
          className="w-full min-w-0"
        />

        <Select
          value={priority}
          onValueChange={onPriorityChange}
          ariaLabel="Filter tasks by priority"
          options={priorityOptions}
          className="w-full min-w-0"
        />

        <Select
          value={sort}
          onValueChange={onSortChange}
          ariaLabel="Sort tasks"
          options={sortOptions}
          className="w-full min-w-0"
        />
      </div>
    </div>
  );
}

export default TaskToolbar;
