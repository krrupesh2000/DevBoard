import { useState } from "react";

import TaskList from "../components/tasks/TaskList";
import TaskTable from "../components/tasks/TaskTable";
import TaskToolbar from "../components/tasks/TaskToolbar";
import PageHeader from "../components/ui/PageHeader";

import { projects } from "../data/projects";
import useAppData from "../hooks/useAppData";
import PageTransition from "../components/motion/PageTransition";

const priorityRank = {
  high: 3,
  medium: 2,
  low: 1,
};

function TasksPage() {
  const { tasks } = useAppData();
  const [search, setSearch] = useState("");
  const [project, setProject] = useState("all");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [sort, setSort] = useState("due-asc");

  const normalizedSearch = search.trim().toLowerCase();

  const projectMap = new Map(projects.map((item) => [item.id, item]));

  const visibleTasks = tasks
    .filter((task) => {
      const relatedProject = projectMap.get(task.projectId);

      const projectName = relatedProject?.name?.toLowerCase() ?? "";

      const matchesSearch =
        normalizedSearch === "" ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        projectName.includes(normalizedSearch);

      const matchesProject = project === "all" || task.projectId === project;

      const matchesStatus = status === "all" || task.status === status;

      const matchesPriority = priority === "all" || task.priority === priority;

      return (
        matchesSearch && matchesProject && matchesStatus && matchesPriority
      );
    })
    .sort((a, b) => {
      switch (sort) {
        case "due-desc":
          return new Date(b.dueDate) - new Date(a.dueDate);

        case "priority-desc":
          return priorityRank[b.priority] - priorityRank[a.priority];

        case "title-asc":
          return a.title.localeCompare(b.title);

        case "due-asc":
        default:
          return new Date(a.dueDate) - new Date(b.dueDate);
      }
    });

  const hasFilters =
    normalizedSearch !== "" ||
    project !== "all" ||
    status !== "all" ||
    priority !== "all";

  function handleClearFilters() {
    setSearch("");
    setProject("all");
    setStatus("all");
    setPriority("all");
  }

  return (
    <PageTransition>
      <div>
        <PageHeader
          title="Tasks"
          description="Manage tasks, priorities, and deadlines across your projects."
        />

        <div className="mt-8">
          <TaskToolbar
            search={search}
            onSearchChange={setSearch}
            project={project}
            onProjectChange={setProject}
            status={status}
            onStatusChange={setStatus}
            priority={priority}
            onPriorityChange={setPriority}
            sort={sort}
            onSortChange={setSort}
            projects={projects}
          />
        </div>

        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
          {visibleTasks.length} {visibleTasks.length === 1 ? "task" : "tasks"}
        </p>

        <div className="mt-4">
          <div className="xl:hidden">
            <TaskList
              tasks={visibleTasks}
              projectMap={projectMap}
              hasFilters={hasFilters}
              onClearFilters={handleClearFilters}
            />
          </div>

          <div className="hidden xl:block">
            <TaskTable
              tasks={visibleTasks}
              projectMap={projectMap}
              hasFilters={hasFilters}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default TasksPage;
