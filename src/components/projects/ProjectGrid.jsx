import { PiFolderOpen } from "react-icons/pi";

import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import ProjectCard from "./ProjectCard";
import { motion } from "motion/react";
import { staggerContainer } from "../../utils/motion";

function ProjectGrid({ projects, hasFilters, onClearFilters, onEdit, onDelete }) {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon={PiFolderOpen}
        title={hasFilters ? "No matching projects" : "No projects yet"}
        description={
          hasFilters
            ? "Try changing your search or status filter."
            : "Your projects will appear here once they are created."
        }
        action={
          hasFilters ? (
            <Button variant="secondary" onClick={onClearFilters}>
              Clear filters
            </Button>
          ) : null
        }
      />
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </motion.div>
  );
}

export default ProjectGrid;
