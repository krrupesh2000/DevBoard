export function getProjectStats(projectId, tasks) {
  const projectTasks = tasks.filter((task) => task.projectId === projectId);

  const totalTasks = projectTasks.length;

  const completedTasks = projectTasks.filter(
    (task) => task.status === "completed",
  ).length;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return {
    totalTasks,
    completedTasks,
    progress,
  };
}
