import SearchInput from "../ui/SearchInput";
import Select from "../ui/Select";
import Button from "../ui/Button";

const statusOptions = [
  {
    value: "all",
    label: "All statuses",
  },
  {
    value: "planning",
    label: "Planning",
  },
  {
    value: "active",
    label: "Active",
  },
  {
    value: "on-hold",
    label: "On Hold",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

const sortOptions = [
  {
    value: "updated-desc",
    label: "Recently updated",
  },
  {
    value: "progress-desc",
    label: "Highest progress",
  },
  {
    value: "progress-asc",
    label: "Lowest progress",
  },
  {
    value: "name-asc",
    label: "Name A–Z",
  },
];

function ProjectToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
  onAddProject,
}) {
  return (
    <div className="space-y-3">
      <SearchInput
        value={search}
        onValueChange={onSearchChange}
        placeholder="Search projects..."
        className="w-full"
      />

      <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
        <Select
          value={status}
          onValueChange={onStatusChange}
          ariaLabel="Filter projects by status"
          options={statusOptions}
          className="w-full min-w-0"
        />

        <Select
          value={sort}
          onValueChange={onSortChange}
          ariaLabel="Sort projects"
          options={sortOptions}
          className="w-full min-w-0"
        />

        <Button
          type="button"
          onClick={onAddProject}
          className="w-full sm:col-span-2 lg:col-span-1 lg:w-auto"
        >
          + New Project
        </Button>
      </div>
    </div>
  );
}

export default ProjectToolbar;
