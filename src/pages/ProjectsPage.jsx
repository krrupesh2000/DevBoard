
import { useState } from "react";
import ProjectGrid from "../components/projects/ProjectGrid";
import ProjectToolbar from "../components/projects/ProjectToolbar";
import PageHeader from "../components/ui/PageHeader";
import useAppData from "../hooks/useAppData";
import PageTransition from "../components/motion/PageTransition";
import AddProjectDialog from "../components/projects/dialogs/AddProjectDialog";
import EditProjectDialog from "../components/projects/dialogs/EditProjectDialog";
import DeleteProjectDialog from "../components/projects/dialogs/DeleteProjectDialog";

function ProjectsPage() {
  const { projects, updateProject, deleteProject } = useAppData();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("updated-desc");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);

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

  function handleEditProject(project) {
    setEditingProject(project);
  }

  function handleUpdateProject(projectData) {
    updateProject(editingProject.id, projectData);
    setEditingProject(null);
  }

  function handleDeleteProject(project) {
    setDeletingProject(project);
  }

  function handleConfirmDelete() {
    deleteProject(deletingProject.id);
    setDeletingProject(null);
  }

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
            onAddProject={() => setIsAddDialogOpen(true)}
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
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
          />
        </div>
        <AddProjectDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
        />
        <EditProjectDialog
          project={editingProject}
          open={Boolean(editingProject)}
          onClose={() => setEditingProject(null)}
          onSubmit={handleUpdateProject}
        />
        <DeleteProjectDialog
          project={deletingProject}
          open={Boolean(deletingProject)}
          onClose={() => setDeletingProject(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </PageTransition>
  );
}

export default ProjectsPage;
