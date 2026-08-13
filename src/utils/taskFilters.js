const priorityRank = {
  high: 3,
  medium: 2,
  low: 1,
};

export function filterAndSortTasks({
  tasks,
  projects,
  search,
  project,
  status,
  priority,
  sort,
}) {
  const normalizedSearch = search.trim().toLowerCase();

  const projectMap = new Map(projects.map((item) => [item.id, item]));

  const visibleTasks = tasks
    .filter((task) => {
      const relatedProject = projectMap.get(task.projectId);

      const projectName = relatedProject?.name?.toLowerCase() ?? "";

      const matchesSearch =
        normalizedSearch === "" ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        projectName.includes(normalizedSearch);

      const matchesProject = project === "all" || task.projectId === project;

      const matchesStatus = status === "all" || task.status === status;

      const matchesPriority = priority === "all" || task.priority === priority;

      return (
        matchesSearch && matchesProject && matchesStatus && matchesPriority
      );
    })
    .sort((a, b) => {
      switch (sort) {
        case "due-desc":
          return new Date(b.dueDate) - new Date(a.dueDate);

        case "priority-desc":
          return priorityRank[b.priority] - priorityRank[a.priority];

        case "title-asc":
          return a.title.localeCompare(b.title);

        case "due-asc":
        default:
          return new Date(a.dueDate) - new Date(b.dueDate);
      }
    });

  return {
    visibleTasks,
    normalizedSearch,
    projectMap,
  };
}

export function getActiveTasks(tasks) {
  return tasks.filter((task) => !task.archivedAt && !task.deletedAt);
}

export function getArchivedTasks(tasks) {
  return tasks.filter((task) => task.archivedAt && !task.deletedAt);
}

export function getDeletedTasks(tasks) {
  return tasks.filter((task) => task.deletedAt);
}
