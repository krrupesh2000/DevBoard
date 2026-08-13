function buildActivity({
  action,
  entityType,
  entityId,
  entityName,
  projectId,
}) {
  const timestamp = new Date().toISOString();

  const type = `${entityType}-${action}`;

  let message;

  if (entityType === "project") {
    switch (action) {
      case "created":
        message = `Created the ${entityName} project.`;
        break;

      case "updated":
        message = `Updated the ${entityName} project.`;
        break;

      case "deleted":
        message = `Moved the ${entityName} project to trash.`;
        break;

      case "archived":
        message = `Archived the ${entityName} project.`;
        break;

      case "restored":
        message = `Restored the ${entityName} project.`;
        break;

      case "completed":
        message = `${entityName} marked as completed.`;
        break;

      case "permanently-deleted":
        message = `Permanently deleted the ${entityName} project.`;
        break;

      default:
        message = `${entityName} project ${action}.`;
    }
  }

  if (entityType === "task") {
    switch (action) {
      case "created":
        message = `Created the ${entityName} task.`;
        break;

      case "updated":
        message = `Updated the ${entityName} task.`;
        break;

      case "deleted":
        message = `Moved the ${entityName} task to trash.`;
        break;

      case "archived":
        message = `Archived the ${entityName} task.`;
        break;

      case "restored":
        message = `Restored the ${entityName} task.`;
        break;

      case "completed":
        message = `Completed ${entityName}.`;
        break;

      case "permanently-deleted":
        message = `Permanently deleted the ${entityName} task.`;
        break;

      default:
        message = `${entityName} task ${action}.`;
    }
  }

  return {
    id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,

    type,
    entityType,
    entityId,

    ...(entityType === "project"
      ? {
          projectId: entityId,
        }
      : {
          taskId: entityId,
          projectId,
        }),

    message,
    createdAt: timestamp,
  };
}

export default buildActivity;
