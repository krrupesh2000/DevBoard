import SearchInput from "../ui/SearchInput";
import Select from "../ui/Select";

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
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <SearchInput
        value={search}
        onValueChange={onSearchChange}
        placeholder="Search projects..."
        className="min-w-0 flex-1"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:flex">
        <Select
          value={status}
          onValueChange={onStatusChange}
          ariaLabel="Filter projects by status"
          options={statusOptions}
          className="w-full sm:min-w-40"
        />

        <Select
          value={sort}
          onValueChange={onSortChange}
          ariaLabel="Sort projects"
          options={sortOptions}
          className="w-full sm:min-w-48"
        />
      </div>
    </div>
  );
}

export default ProjectToolbar;
