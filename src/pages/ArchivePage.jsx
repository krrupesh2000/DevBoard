import { PiArchive } from "react-icons/pi";

import PageHeader from "../components/ui/PageHeader";
import PageTransition from "../components/motion/PageTransition";
import ArchiveItem from "../components/archive/ArchiveItem";

import useAppData from "../hooks/useAppData";

import { getArchivedProjects } from "../utils/projectFilters";
import { getArchivedTasks } from "../utils/taskFilters";

function ArchivePage() {
  const {
    projects,
    tasks,
    restoreProject,
    deleteProject,
    restoreTask,
    deleteTask,
  } = useAppData();

  const archivedProjects = getArchivedProjects(projects);

  const archivedTasks = getArchivedTasks(tasks);

  const hasArchivedItems =
    archivedProjects.length > 0 || archivedTasks.length > 0;

  return (
    <PageTransition>
      <div>
        <PageHeader
          title="Archive"
          description="Keep older projects and tasks out of your active workspace without deleting them."
        />

        {!hasArchivedItems ? (
          <div className="mt-8 rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <PiArchive size={24} aria-hidden="true" />
            </div>

            <h2 className="mt-4 text-base font-semibold">Archive is empty</h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Archived projects and tasks will appear here. They remain
              available and can be restored at any time.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            {archivedProjects.length > 0 && (
              <section aria-labelledby="archived-projects-heading">
                <div className="mb-4">
                  <h2
                    id="archived-projects-heading"
                    className="text-lg font-semibold"
                  >
                    Projects
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {archivedProjects.length} archived{" "}
                    {archivedProjects.length === 1 ? "project" : "projects"}
                  </p>
                </div>

                <div className="grid gap-3">
                  {archivedProjects.map((project) => (
                    <ArchiveItem
                      key={project.id}
                      item={project}
                      type="project"
                      onRestore={() => restoreProject(project.id)}
                      onDelete={() => deleteProject(project.id)}
                    />
                  ))}
                </div>
              </section>
            )}

            {archivedTasks.length > 0 && (
              <section aria-labelledby="archived-tasks-heading">
                <div className="mb-4">
                  <h2
                    id="archived-tasks-heading"
                    className="text-lg font-semibold"
                  >
                    Tasks
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {archivedTasks.length} archived{" "}
                    {archivedTasks.length === 1 ? "task" : "tasks"}
                  </p>
                </div>

                <div className="grid gap-3">
                  {archivedTasks.map((task) => (
                    <ArchiveItem
                      key={task.id}
                      item={task}
                      type="task"
                      onRestore={() => restoreTask(task.id)}
                      onDelete={() => deleteTask(task.id)}
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

export default ArchivePage;
