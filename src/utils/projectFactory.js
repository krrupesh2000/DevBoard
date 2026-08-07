export function buildProject(projectData) {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name: projectData.name.trim(),
    description: projectData.description.trim(),
    status: projectData.status,
    priority: projectData.priority,
    technologies: projectData.technologies ?? [],
    dueDate: projectData.dueDate,
    progress: 0,
    createdAt: now,
    updatedAt: now,
  };
}
