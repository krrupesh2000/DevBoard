import { motion, useReducedMotion } from "motion/react";
import { fadeUp } from "../../utils/motion";
import Card from "../ui/Card";
import PriorityIndicator from "../ui/PriorityIndicator";
import ProgressBar from "../ui/ProgressBar";
import StatusBadge from "../ui/StatusBadge";

function ProjectCard({ project, onEdit, onDelete }) {
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
      <Card className="flex h-full flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold tracking-tight">
              {project.name}
            </h2>

            <div className="mt-2">
              <PriorityIndicator priority={project.priority} />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <StatusBadge status={project.status} />

            <button
              type="button"
              onClick={() => onEdit(project)}
              className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete(project)}
              className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Delete
            </button>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {visibleTechnologies.map((technology) => (
            <span
              key={technology}
              className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
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
          <ProgressBar value={project.progress} />
        </div>
      </Card>
    </motion.div>
  );
}

export default ProjectCard;
