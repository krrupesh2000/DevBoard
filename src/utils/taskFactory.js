export function buildTask(taskData) {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    projectId: taskData.projectId,
    title: taskData.title.trim(),
    description: taskData.description.trim(),
    status: taskData.status,
    priority: taskData.priority,
    dueDate: taskData.dueDate,
    createdAt: now,
    updatedAt: now,

    // Lifecycle state
    archivedAt: null,
    deletedAt: null,
  };
}