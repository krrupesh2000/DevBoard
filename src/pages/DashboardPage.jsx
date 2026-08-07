import { motion } from "motion/react";
import {
  PiCheckCircle,
  PiFolder,
  PiFolderOpen,
  PiListChecks,
} from "react-icons/pi";

import MetricCard from "../components/dashboard/MetricCard";
import ProjectProgressChart from "../components/dashboard/ProjectProgressChart";
import RecentProjects from "../components/dashboard/RecentProjects";
import TaskDistributionChart from "../components/dashboard/TaskDistributionChart";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import PageTransition from "../components/motion/PageTransition";
import PageHeader from "../components/ui/PageHeader";
import useAppData from "../hooks/useAppData";

import { staggerContainer } from "../utils/motion";

function DashboardPage() {
  const { projects, tasks } = useAppData();
  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) => project.status === "active",
  ).length;

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const metrics = [
    {
      label: "Total Projects",
      value: totalProjects,
      icon: PiFolder,
      description: "Across your workspace",
    },
    {
      label: "Active Projects",
      value: activeProjects,
      icon: PiFolderOpen,
      description: "Currently in progress",
    },
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: PiListChecks,
      description: "Across all projects",
    },
    {
      label: "Completed Tasks",
      value: completedTasks,
      icon: PiCheckCircle,
      description: "Finished successfully",
    },
  ];

  const taskDistribution = [
    {
      name: "To Do",
      value: tasks.filter((task) => task.status === "todo").length,
    },
    {
      name: "In Progress",
      value: tasks.filter((task) => task.status === "in-progress").length,
    },
    {
      name: "Completed",
      value: completedTasks,
    },
  ];

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 4);

  const upcomingTasks = [...tasks]
    .filter((task) => task.status !== "completed")
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const projectMap = new Map(projects.map((project) => [project.id, project]));

  return (
    <PageTransition>
      <div>
        <PageHeader
          title="Dashboard"
          description="Overview of your projects, tasks, and recent development activity."
        />

        {/* Metrics */}
        <motion.section
          aria-label="Workspace metrics"
          className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </motion.section>

        {/* Charts */}
        <section
          aria-label="Project and task analytics"
          className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)]"
        >
          <ProjectProgressChart projects={projects} />

          <TaskDistributionChart data={taskDistribution} total={totalTasks} />
        </section>

        {/* Summaries */}
        <section
          aria-label="Recent projects and upcoming tasks"
          className="mt-6 grid gap-6 xl:grid-cols-2"
        >
          <RecentProjects projects={recentProjects} />

          <UpcomingTasks tasks={upcomingTasks} projectMap={projectMap} />
        </section>
      </div>
    </PageTransition>
  );
}

export default DashboardPage;
