import { PiListChecks } from "react-icons/pi";

import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

function TaskEmptyState({ hasFilters, onClearFilters }) {
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

export default TaskEmptyState;
