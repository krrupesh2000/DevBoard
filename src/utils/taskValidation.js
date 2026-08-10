export function validateTask(task) {
  const errors = {};

  if (!task.title.trim()) {
    errors.title = "Task title is required.";
  }

  if (!task.projectId) {
    errors.projectId = "Project is required.";
  }

  if (!task.status) {
    errors.status = "Status is required.";
  }

  if (!task.priority) {
    errors.priority = "Priority is required.";
  }

  return errors;
}
