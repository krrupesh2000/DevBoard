import EmptyState from "../ui/EmptyState";
import { PiFolder } from "react-icons/pi";

function EmptyProjectsState({ hasFilters = false, onClearFilters }) {
  if (hasFilters) {
    return (
      <EmptyState
        icon={PiFolder}
        title="No projects found"
        description="Try adjusting your search or filters."
        actionLabel="Clear filters"
        onAction={onClearFilters}
      />
    );
  }

  return (
    <EmptyState
      icon={PiFolder}
      title="No projects yet"
      description="Create your first project to get started."
    />
  );
}

export default EmptyProjectsState;
