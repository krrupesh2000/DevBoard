import { useState } from "react";

import ProjectGrid from "../components/projects/ProjectGrid";
import ProjectToolbar from "../components/projects/ProjectToolbar";
import PageHeader from "../components/ui/PageHeader";

import { projects } from "../data/projects";
import PageTransition from "../components/motion/PageTransition";

function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("updated-desc");

  const normalizedSearch = search.trim().toLowerCase();

  const visibleProjects = projects
    .filter((project) => {
      const matchesSearch =
        normalizedSearch === "" ||
        project.name.toLowerCase().includes(normalizedSearch) ||
        project.description.toLowerCase().includes(normalizedSearch) ||
        project.technologies.some((technology) =>
          technology.toLowerCase().includes(normalizedSearch),
        );

      const matchesStatus = status === "all" || project.status === status;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sort) {
        case "progress-desc":
          return b.progress - a.progress;

        case "progress-asc":
          return a.progress - b.progress;

        case "name-asc":
          return a.name.localeCompare(b.name);

        case "updated-desc":
        default:
          return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });

  const hasFilters = normalizedSearch !== "" || status !== "all";

  function handleClearFilters() {
    setSearch("");
    setStatus("all");
  }

  return (
    <PageTransition>
      <div>
        <PageHeader
          title="Projects"
          description="Track progress and manage your development projects."
        />

        <div className="mt-8">
          <ProjectToolbar
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            sort={sort}
            onSortChange={setSort}
          />
        </div>

        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
          {visibleProjects.length}{" "}
          {visibleProjects.length === 1 ? "project" : "projects"}
        </p>

        <div className="mt-4">
          <ProjectGrid
            projects={visibleProjects}
            hasFilters={hasFilters}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>
    </PageTransition>
  );
}

export default ProjectsPage;
