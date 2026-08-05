import ActivityList from "../components/activity/ActivityList";
import PageTransition from "../components/motion/PageTransition";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";

import { activities } from "../data/activities";
import { projects } from "../data/projects";
import { tasks } from "../data/tasks";

function ActivityPage() {
  const projectMap = new Map(projects.map((project) => [project.id, project]));

  const taskMap = new Map(tasks.map((task) => [task.id, task]));

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
  );

  return (
    <PageTransition>
      <div>
        <PageHeader
          title="Activity"
          description="Track recent updates across your projects and tasks."
        />

        <div className="mt-8 max-w-4xl">
          <Card className="p-5 sm:p-6">
            <div className="mb-6">
              <h2 className="text-base font-semibold">Recent Activity</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Latest changes across your workspace.
              </p>
            </div>

            <ActivityList
              activities={sortedActivities}
              projectMap={projectMap}
              taskMap={taskMap}
            />
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}

export default ActivityPage;
