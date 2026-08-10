
import { useState } from "react";

import TaskList from "../components/tasks/TaskList";
import TaskTable from "../components/tasks/TaskTable";
import TaskToolbar from "../components/tasks/TaskToolbar";
import AddTaskDialog from "../components/tasks/dialogs/AddTaskDialog";
import EditTaskDialog from "../components/tasks/dialogs/EditTaskDialog";
import DeleteTaskDialog from "../components/tasks/dialogs/DeleteTaskDialog";

import PageHeader from "../components/ui/PageHeader";
import PageTransition from "../components/motion/PageTransition";
import useAppData from "../hooks/useAppData";

const priorityRank = {
  high: 3,
  medium: 2,
  low: 1,
};

function TasksPage() {
  const {
    tasks,
    projects,
    createTask,
    updateTask,
    deleteTask,
  } = useAppData();

  const [search, setSearch] = useState("");
  const [project, setProject] = useState("all");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [sort, setSort] = useState("due-asc");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const normalizedSearch = search.trim().toLowerCase();

  const projectMap = new Map(
    projects.map((item) => [item.id, item]),
  );

  const visibleTasks = tasks
    .filter((task) => {
      const relatedProject = projectMap.get(task.projectId);

      const projectName =
        relatedProject?.name?.toLowerCase() ?? "";

      const matchesSearch =
        normalizedSearch === "" ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        projectName.includes(normalizedSearch);

      const matchesProject =
        project === "all" || task.projectId === project;

      const matchesStatus =
        status === "all" || task.status === status;

      const matchesPriority =
        priority === "all" || task.priority === priority;

      return (
        matchesSearch &&
        matchesProject &&
        matchesStatus &&
        matchesPriority
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

  function handleCreateTask(taskData) {
    createTask(taskData);
    setIsAddDialogOpen(false);
  }

  function handleEditTask(task) {
    setEditingTask(task);
  }

  function handleUpdateTask(taskData) {
    if (!editingTask) return;

    updateTask(editingTask.id, taskData);
    setEditingTask(null);
  }

  function handleDeleteTask(task) {
    setDeletingTask(task);
  }

  function handleConfirmDelete() {
    if (!deletingTask) return;

    deleteTask(deletingTask.id);
    setDeletingTask(null);
  }

  return (
    <PageTransition>
      <div>
        <PageHeader
          title="Tasks"
          description="Manage tasks, priorities, deadlines, and project progress."
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
            onAddTask={() => setIsAddDialogOpen(true)}
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
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          </div>

          <div className="hidden xl:block">
            <TaskTable
              tasks={visibleTasks}
              projectMap={projectMap}
              hasFilters={hasFilters}
              onClearFilters={handleClearFilters}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          </div>
        </div>

        <AddTaskDialog
          open={isAddDialogOpen}
          projects={projects}
          onClose={() => setIsAddDialogOpen(false)}
          onSubmit={handleCreateTask}
        />

        <EditTaskDialog
          open={Boolean(editingTask)}
          task={editingTask}
          projects={projects}
          onClose={() => setEditingTask(null)}
          onSubmit={handleUpdateTask}
        />

        <DeleteTaskDialog
          open={Boolean(deletingTask)}
          task={deletingTask}
          onClose={() => setDeletingTask(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </PageTransition>
  );
}

export default TasksPage;