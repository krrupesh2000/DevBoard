import {
  PiCheckCircle,
  PiFolderPlus,
  PiFolderSimple,
  PiListChecks,
  PiPencilSimple,
  PiPlusCircle,
  PiTrash,
} from "react-icons/pi";

import { formatDateTime } from "../../utils/date";
import { motion } from "motion/react";
import { fadeUp } from "../../utils/motion";

const activityConfig = {
  "task-created": {
    icon: PiPlusCircle,
    label: "Task created",
  },

  "task-completed": {
    icon: PiCheckCircle,
    label: "Task completed",
  },

  "task-updated": {
    icon: PiListChecks,
    label: "Task updated",
  },

  "task-deleted": {
    icon: PiTrash,
    label: "Task deleted",
  },

  "project-created": {
    icon: PiFolderPlus,
    label: "Project created",
  },

  "project-updated": {
    icon: PiPencilSimple,
    label: "Project updated",
  },

  "project-deleted": {
    icon: PiTrash,
    label: "Project deleted",
  },

  "project-completed": {
    icon: PiCheckCircle,
    label: "Project completed",
  },
};

const fallbackConfig = {
  icon: PiFolderSimple,
  label: "Activity",
};

function ActivityItem({ activity, project, task, isLast = false }) {
  const config = activityConfig[activity.type] ?? fallbackConfig;

  const Icon = config.icon;

  return (
    <motion.li variants={fadeUp} className="relative flex gap-4">
      {/* Timeline */}
      <div className="relative flex shrink-0 justify-center">
        <div
          className="flex size-9 items-center justify-center rounded-full border border-border bg-background"
          aria-hidden="true"
        >
          <Icon size={18} />
        </div>

        {!isLast && (
          <div
            className="absolute bottom-0 top-9 w-px bg-border"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pb-7">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium">{activity.message}</p>

            {(project || task) && (
              <p className="mt-1 text-sm text-muted-foreground">
                {project?.name ?? task?.title}

                {project && task && <span aria-hidden="true"> · </span>}

                {project && task?.title}
              </p>
            )}
          </div>

          <time
            dateTime={activity.createdAt}
            className="shrink-0 text-xs text-muted-foreground"
          >
            {formatDateTime(activity.createdAt)}
          </time>
        </div>

        <p className="mt-2 text-xs font-medium text-muted-foreground">
          {config.label}
        </p>
      </div>
    </motion.li>
  );
}

export default ActivityItem;
