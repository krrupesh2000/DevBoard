import { PiTrash } from "react-icons/pi";

import PageHeader from "../components/ui/PageHeader";
import PageTransition from "../components/motion/PageTransition";
import TrashItem from "../components/trash/TrashItem";

import useAppData from "../hooks/useAppData";

import { getDeletedProjects } from "../utils/projectFilters";
import { getDeletedTasks } from "../utils/taskFilters";

function TrashPage() {
  const {
    projects,
    tasks,
    restoreProject,
    permanentlyDeleteProject,
    restoreTask,
    permanentlyDeleteTask,
  } = useAppData();

  const deletedProjects = getDeletedProjects(projects);

  const deletedTasks = getDeletedTasks(tasks);

  const hasDeletedItems = deletedProjects.length > 0 || deletedTasks.length > 0;

  function handlePermanentProjectDelete(project) {
    const confirmed = window.confirm(
      `Permanently delete "${project.name}"? This cannot be undone.`,
    );

    if (!confirmed) return;

    permanentlyDeleteProject(project.id);
  }

  function handlePermanentTaskDelete(task) {
    const confirmed = window.confirm(
      `Permanently delete "${task.title}"? This cannot be undone.`,
    );

    if (!confirmed) return;

    permanentlyDeleteTask(task.id);
  }

  return (
    <PageTransition>
      <div>
        <PageHeader
          title="Trash"
          description="Deleted items stay here until you permanently remove them or restore them."
        />

        {!hasDeletedItems ? (
          <div className="mt-8 rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <PiTrash size={24} aria-hidden="true" />
            </div>

            <h2 className="mt-4 text-base font-semibold">Trash is empty</h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Deleted projects and tasks will appear here. You can restore them
              or permanently delete them.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            {deletedProjects.length > 0 && (
              <section aria-labelledby="trash-projects-heading">
                <div className="mb-4">
                  <h2
                    id="trash-projects-heading"
                    className="text-lg font-semibold"
                  >
                    Projects
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {deletedProjects.length} deleted{" "}
                    {deletedProjects.length === 1 ? "project" : "projects"}
                  </p>
                </div>

                <div className="grid gap-3">
                  {deletedProjects.map((project) => (
                    <TrashItem
                      key={project.id}
                      item={project}
                      type="project"
                      onRestore={() => restoreProject(project.id)}
                      onDeletePermanently={() =>
                        handlePermanentProjectDelete(project)
                      }
                    />
                  ))}
                </div>
              </section>
            )}

            {deletedTasks.length > 0 && (
              <section aria-labelledby="trash-tasks-heading">
                <div className="mb-4">
                  <h2
                    id="trash-tasks-heading"
                    className="text-lg font-semibold"
                  >
                    Tasks
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {deletedTasks.length} deleted{" "}
                    {deletedTasks.length === 1 ? "task" : "tasks"}
                  </p>
                </div>

                <div className="grid gap-3">
                  {deletedTasks.map((task) => (
                    <TrashItem
                      key={task.id}
                      item={task}
                      type="task"
                      onRestore={() => restoreTask(task.id)}
                      onDeletePermanently={() =>
                        handlePermanentTaskDelete(task)
                      }
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default TrashPage;
