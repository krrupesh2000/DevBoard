import buildActivity from "../utils/activityFactory";
import { useState } from "react";

import AppDataContext from "../context/AppDataContext";

import { projects as initialProjects } from "../data/projects";
import { tasks as initialTasks } from "../data/tasks";
import { activities as initialActivities } from "../data/activities";

import { buildProject } from "../utils/projectFactory";
import { buildTask } from "../utils/taskFactory";

function AppDataProvider({ children }) {
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [activities, setActivities] = useState(initialActivities);

  function addActivity(activity) {
    setActivities((previousActivities) => [activity, ...previousActivities]);
  }

  function createProject(projectData) {
    const project = buildProject(projectData);

    setProjects((previousProjects) => [project, ...previousProjects]);

    addActivity(
      buildActivity({
        action: "created",
        entityType: "project",
        entityId: project.id,
        entityName: project.name,
      }),
    );

    return project;
  }

  function updateProject(projectId, projectData) {
    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              ...projectData,
              updatedAt: new Date().toISOString(),
            }
          : project,
      ),
    );

    const updatedProjectName =
      projectData.name ??
      projects.find((project) => project.id === projectId)?.name ??
      "Project";

    addActivity(
      buildActivity({
        action: "updated",
        entityType: "project",
        entityId: projectId,
        entityName: updatedProjectName,
      }),
    );
  }

  function deleteProject(projectId) {
    const project = projects.find((item) => item.id === projectId);

    setProjects((previousProjects) =>
      previousProjects.filter((project) => project.id !== projectId),
    );

    if (project) {
      addActivity(
        buildActivity({
          action: "deleted",
          entityType: "project",
          entityId: project.id,
          entityName: project.name,
        }),
      );
    }
  }

  function createTask(taskData) {
    const task = buildTask(taskData);

    setTasks((previousTasks) => [task, ...previousTasks]);

    addActivity(
      buildActivity({
        action: "created",
        entityType: "task",
        entityId: task.id,
        entityName: task.title,
        projectId: task.projectId,
      }),
    );

    return task;
  }

  function updateTask(taskId, taskData) {
    const existingTask = tasks.find((task) => task.id === taskId);

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...taskData,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );

    if (existingTask) {
      const updatedTask = {
        ...existingTask,
        ...taskData,
      };

      const action =
        updatedTask.status === "completed" &&
        existingTask.status !== "completed"
          ? "completed"
          : "updated";

      addActivity(
        buildActivity({
          action,
          entityType: "task",
          entityId: taskId,
          entityName: updatedTask.title,
          projectId: updatedTask.projectId,
        }),
      );
    }
  }

  function deleteTask(taskId) {
    const task = tasks.find((item) => item.id === taskId);

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );

    if (task) {
      addActivity(
        buildActivity({
          action: "deleted",
          entityType: "task",
          entityId: task.id,
          entityName: task.title,
          projectId: task.projectId,
        }),
      );
    }
  }

  const value = {
    projects,
    tasks,
    activities,

    createProject,
    updateProject,
    deleteProject,

    createTask,
    updateTask,
    deleteTask,

    addActivity,
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export default AppDataProvider;
