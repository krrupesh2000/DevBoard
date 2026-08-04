import { PiFolderOpen } from "react-icons/pi";

import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import ProjectCard from "./ProjectCard";

function ProjectGrid({ projects, hasFilters, onClearFilters }) {
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
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectGrid;
