import { motion } from "motion/react";

import ProjectCard from "./ProjectCard";
import EmptyProjectsState from "./EmptyProjectsState";

import { staggerContainer } from "../../utils/motion";
import { getProjectStats } from "../../utils/projectStats";

function ProjectGrid({
  projects,
  tasks,
  hasFilters,
  onClearFilters,
  onEdit,
  onArchive,
  onDelete,
}) {
  if (projects.length === 0) {
    return (
      <EmptyProjectsState
        hasFilters={hasFilters}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <motion.div
      className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project) => {
        const { progress } = getProjectStats(project.id, tasks);

        return (
          <ProjectCard
            key={project.id}
            project={project}
            progress={progress}
            onEdit={onEdit}
            onArchive={onArchive}
            onDelete={onDelete}
          />
        );
      })}
    </motion.div>
  );
}

export default ProjectGrid;
