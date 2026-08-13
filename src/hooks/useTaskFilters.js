import { useState } from "react";

const INITIAL_FILTERS = {
  search: "",
  project: "all",
  status: "all",
  priority: "all",
  sort: "due-asc",
};

function useTaskFilters() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  function updateFilter(name, value) {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function clearFilters() {
    setFilters(INITIAL_FILTERS);
  }

  return {
    filters,
    updateFilter,
    clearFilters,
  };
}

export default useTaskFilters;
