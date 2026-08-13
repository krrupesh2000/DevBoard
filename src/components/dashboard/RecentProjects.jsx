import { Link } from "react-router";

import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";
import StatusBadge from "../ui/StatusBadge";

import { getProjectStats } from "../../utils/projectStats";

function RecentProjects({ projects, tasks }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">Recent Projects</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Recently updated development work.
          </p>
        </div>

        <Link
          to="/dashboard/projects"
          className="shrink-0 text-sm font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="mt-6 divide-y divide-border">
        {projects.map((project) => {
          const { progress } = getProjectStats(project.id, tasks);

          return (
            <div key={project.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{project.name}</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {project.technologies.slice(0, 2).join(" · ")}
                  </p>
                </div>

                <StatusBadge status={project.status} />
              </div>

              <div className="mt-3">
                <ProgressBar value={progress} showLabel={false} />
              </div>

              <div className="mt-2 text-right text-xs text-muted-foreground">
                {progress}%
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default RecentProjects;
