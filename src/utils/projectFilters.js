import { getProjectStats } from "./projectStats";

function sortProjects(projects, tasks, sort) {
  return [...projects].sort((a, b) => {
    switch (sort) {
      case "progress-desc":
        return (
          getProjectStats(b.id, tasks).progress -
          getProjectStats(a.id, tasks).progress
        );

      case "progress-asc":
        return (
          getProjectStats(a.id, tasks).progress -
          getProjectStats(b.id, tasks).progress
        );

      case "name-asc":
        return a.name.localeCompare(b.name);

      case "updated-desc":
      default:
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    }
  });
}

export function filterAndSortProjects({
  projects,
  tasks,
  search,
  status,
  sort,
}) {
  const normalizedSearch = search.trim().toLowerCase();

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      normalizedSearch === "" ||
      project.name.toLowerCase().includes(normalizedSearch) ||
      project.description.toLowerCase().includes(normalizedSearch) ||
      project.technologies.some((technology) =>
        technology.toLowerCase().includes(normalizedSearch),
      );

    const matchesStatus = status === "all" || project.status === status;

    return matchesSearch && matchesStatus;
  });

  return {
    visibleProjects: sortProjects(filteredProjects, tasks, sort),
    normalizedSearch,
  };
}
