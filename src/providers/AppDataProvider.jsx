import { useEffect, useState } from "react";

import AppDataContext from "../context/AppDataContext";

import { projects as initialProjects } from "../data/projects";
import { tasks as initialTasks } from "../data/tasks";
import { activities as initialActivities } from "../data/activities";

import { buildProject } from "../utils/projectFactory";
import { buildTask } from "../utils/taskFactory";
import buildActivity from "../utils/activityFactory";

import { loadFromStorage, saveToStorage } from "../utils/storage";

const STORAGE_KEYS = {
  projects: "devboard.projects",
  tasks: "devboard.tasks",
  activities: "devboard.activities",
};

function AppDataProvider({ children }) {
  const [projects, setProjects] = useState(() =>
    loadFromStorage(STORAGE_KEYS.projects, initialProjects),
  );

  const [tasks, setTasks] = useState(() =>
    loadFromStorage(STORAGE_KEYS.tasks, initialTasks),
  );

  const [activities, setActivities] = useState(() =>
    loadFromStorage(STORAGE_KEYS.activities, initialActivities),
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.projects, projects);
  }, [projects]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.tasks, tasks);
  }, [tasks]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.activities, activities);
  }, [activities]);

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

    const existingProject = projects.find(
      (project) => project.id === projectId,
    );

    if (existingProject) {
      const updatedProject = {
        ...existingProject,
        ...projectData,
      };

      const action =
        updatedProject.status === "completed" &&
        existingProject.status !== "completed"
          ? "completed"
          : "updated";

      addActivity(
        buildActivity({
          action,
          entityType: "project",
          entityId: projectId,
          entityName: updatedProject.name,
        }),
      );
    }
  }

  function deleteProject(projectId) {
    const project = projects.find((item) => item.id === projectId);

    setProjects((previousProjects) =>
      previousProjects.filter((project) => project.id !== projectId),
    );

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.projectId !== projectId),
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
