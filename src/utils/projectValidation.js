export function validateProject(project) {
  const errors = {};

  if (!project.name.trim()) {
    errors.name = "Project name is required.";
  }

  if (!project.status) {
    errors.status = "Status is required.";
  }

  if (!project.priority) {
    errors.priority = "Priority is required.";
  }

  return errors;
}
