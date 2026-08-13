import { useState } from "react";

import TaskList from "../components/tasks/TaskList";
import TaskTable from "../components/tasks/TaskTable";
import TaskToolbar from "../components/tasks/TaskToolbar";
import AddTaskDialog from "../components/tasks/dialogs/AddTaskDialog";
import EditTaskDialog from "../components/tasks/dialogs/EditTaskDialog";
import DeleteTaskDialog from "../components/tasks/dialogs/DeleteTaskDialog";

import { filterAndSortTasks } from "../utils/taskFilters";

import PageHeader from "../components/ui/PageHeader";
import PageTransition from "../components/motion/PageTransition";

import useAppData from "../hooks/useAppData";
import useTaskFilters from "../hooks/useTaskFilters";

function TasksPage() {
  const { tasks, projects, createTask, updateTask, deleteTask } = useAppData();

  const { filters, updateFilter, clearFilters } = useTaskFilters();

  const { search, project, status, priority, sort } = filters;

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const { visibleTasks, normalizedSearch, projectMap } = filterAndSortTasks({
    tasks,
    projects,
    search,
    project,
    status,
    priority,
    sort,
  });

  const hasFilters =
    normalizedSearch !== "" ||
    project !== "all" ||
    status !== "all" ||
    priority !== "all";

  function handleClearFilters() {
    clearFilters();
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
          description="Manage and track your project tasks."
        />

        <div className="mt-8">
          <TaskToolbar
            search={search}
            onSearchChange={(value) => updateFilter("search", value)}
            project={project}
            onProjectChange={(value) => updateFilter("project", value)}
            status={status}
            onStatusChange={(value) => updateFilter("status", value)}
            priority={priority}
            onPriorityChange={(value) => updateFilter("priority", value)}
            sort={sort}
            onSortChange={(value) => updateFilter("sort", value)}
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
