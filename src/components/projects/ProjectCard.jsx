import { motion, useReducedMotion } from "motion/react";
import { PiArchive, PiNotePencil, PiTrash } from "react-icons/pi";

import { fadeUp } from "../../utils/motion";

import Card from "../ui/Card";
import IconButton from "../ui/IconButton";
import PriorityIndicator from "../ui/PriorityIndicator";
import ProgressBar from "../ui/ProgressBar";
import StatusBadge from "../ui/StatusBadge";

function ProjectCard({ project, progress = 0, onEdit, onArchive, onDelete }) {
  const visibleTechnologies = project.technologies.slice(0, 3);

  const remainingTechnologies =
    project.technologies.length - visibleTechnologies.length;

  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={fadeUp}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="flex h-full flex-col p-4 sm:p-5">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="break-words text-base font-semibold tracking-tight sm:text-lg">
              {project.name}
            </h2>

            <div className="mt-2">
              <PriorityIndicator priority={project.priority} />
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2 min-[480px]:flex-row min-[480px]:items-center">
            <StatusBadge status={project.status} />

            <div className="flex items-center gap-1">
              <IconButton
                label="Edit project"
                icon={<PiNotePencil size={17} aria-hidden="true" />}
                onClick={() => onEdit(project)}
              />

              <IconButton
                label="Archive project"
                icon={<PiArchive size={17} aria-hidden="true" />}
                onClick={() => onArchive(project)}
              />

              <IconButton
                label="Move project to trash"
                variant="danger"
                icon={<PiTrash size={17} aria-hidden="true" />}
                onClick={() => onDelete(project)}
              />
            </div>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {visibleTechnologies.map((technology) => (
            <span
              key={technology}
              className="max-w-full rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {technology}
            </span>
          ))}

          {remainingTechnologies > 0 && (
            <span className="rounded-md border border-dashed border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
              +{remainingTechnologies}
            </span>
          )}
        </div>

        <div className="mt-auto pt-6">
          <ProgressBar value={progress} />
        </div>
      </Card>
    </motion.div>
  );
}

export default ProjectCard;
