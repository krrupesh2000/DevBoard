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

function removeProjectLifecycleState(task) {
  const cleanedTask = { ...task };

  delete cleanedTask.projectLifecycleState;

  return cleanedTask;
}

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

  // =========================
  // PROJECTS
  // =========================

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
    const existingProject = projects.find(
      (project) => project.id === projectId,
    );

    if (!existingProject) return;

    const updatedProject = {
      ...existingProject,
      ...projectData,
      updatedAt: new Date().toISOString(),
    };

    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        project.id === projectId ? updatedProject : project,
      ),
    );

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

  function archiveProject(projectId) {
    const project = projects.find((item) => item.id === projectId);

    if (!project) return;

    const timestamp = new Date().toISOString();

    setProjects((previousProjects) =>
      previousProjects.map((item) =>
        item.id === projectId
          ? {
              ...item,
              archivedAt: timestamp,
              deletedAt: null,
              updatedAt: timestamp,
            }
          : item,
      ),
    );

    setTasks((previousTasks) =>
      previousTasks.map((task) => {
        if (task.projectId !== projectId || task.archivedAt || task.deletedAt) {
          return task;
        }

        return {
          ...task,
          archivedAt: timestamp,
          updatedAt: timestamp,
          projectLifecycleState: "archived",
        };
      }),
    );

    addActivity(
      buildActivity({
        action: "archived",
        entityType: "project",
        entityId: project.id,
        entityName: project.name,
      }),
    );
  }

  function restoreProject(projectId) {
    const project = projects.find((item) => item.id === projectId);

    if (!project) return;

    const timestamp = new Date().toISOString();

    setProjects((previousProjects) =>
      previousProjects.map((item) =>
        item.id === projectId
          ? {
              ...item,
              archivedAt: null,
              deletedAt: null,
              updatedAt: timestamp,
            }
          : item,
      ),
    );

    setTasks((previousTasks) =>
      previousTasks.map((task) => {
        if (task.projectId !== projectId) {
          return task;
        }

        // Project was archived.
        if (task.projectLifecycleState === "archived") {
          const restoredTask = removeProjectLifecycleState(task);

          return {
            ...restoredTask,
            archivedAt: null,
            deletedAt: null,
            updatedAt: timestamp,
          };
        }

        // Project was moved to Trash while task was active.
        if (task.projectLifecycleState === "deleted-from-active") {
          const restoredTask = removeProjectLifecycleState(task);

          return {
            ...restoredTask,
            archivedAt: null,
            deletedAt: null,
            updatedAt: timestamp,
          };
        }

        // Project was moved to Trash while task was archived.
        if (task.projectLifecycleState === "deleted-from-archived") {
          const restoredTask = removeProjectLifecycleState(task);

          return {
            ...restoredTask,
            archivedAt: task.archivedAt ?? timestamp,
            deletedAt: null,
            updatedAt: timestamp,
          };
        }

        return task;
      }),
    );

    addActivity(
      buildActivity({
        action: "restored",
        entityType: "project",
        entityId: project.id,
        entityName: project.name,
      }),
    );
  }

  function deleteProject(projectId) {
    const project = projects.find((item) => item.id === projectId);

    if (!project) return;

    const timestamp = new Date().toISOString();

    setProjects((previousProjects) =>
      previousProjects.map((item) =>
        item.id === projectId
          ? {
              ...item,
              archivedAt: null,
              deletedAt: timestamp,
              updatedAt: timestamp,
            }
          : item,
      ),
    );

    setTasks((previousTasks) =>
      previousTasks.map((task) => {
        if (task.projectId !== projectId || task.deletedAt) {
          return task;
        }

        const previousState = task.archivedAt ? "archived" : "active";

        return {
          ...task,
          archivedAt: null,
          deletedAt: timestamp,
          updatedAt: timestamp,
          projectLifecycleState: `deleted-from-${previousState}`,
        };
      }),
    );

    addActivity(
      buildActivity({
        action: "deleted",
        entityType: "project",
        entityId: project.id,
        entityName: project.name,
      }),
    );
  }

  function permanentlyDeleteProject(projectId) {
    const project = projects.find((item) => item.id === projectId);

    if (!project) return;

    setProjects((previousProjects) =>
      previousProjects.filter((item) => item.id !== projectId),
    );

    // Permanently delete all tasks belonging to the project.
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.projectId !== projectId),
    );

    addActivity(
      buildActivity({
        action: "permanently-deleted",
        entityType: "project",
        entityId: project.id,
        entityName: project.name,
      }),
    );
  }

  // =========================
  // TASKS
  // =========================

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

    if (!existingTask) return;

    const updatedTask = {
      ...existingTask,
      ...taskData,
      updatedAt: new Date().toISOString(),
    };

    setTasks((previousTasks) =>
      previousTasks.map((task) => (task.id === taskId ? updatedTask : task)),
    );

    const action =
      updatedTask.status === "completed" && existingTask.status !== "completed"
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

  function archiveTask(taskId) {
    const task = tasks.find((item) => item.id === taskId);

    if (!task) return;

    const timestamp = new Date().toISOString();

    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === taskId
          ? {
              ...item,
              archivedAt: timestamp,
              deletedAt: null,
              updatedAt: timestamp,
              projectLifecycleState: null,
            }
          : item,
      ),
    );

    addActivity(
      buildActivity({
        action: "archived",
        entityType: "task",
        entityId: task.id,
        entityName: task.title,
        projectId: task.projectId,
      }),
    );
  }

  function restoreTask(taskId) {
    const task = tasks.find((item) => item.id === taskId);

    if (!task) return;

    const timestamp = new Date().toISOString();

    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === taskId
          ? {
              ...item,
              archivedAt: null,
              deletedAt: null,
              updatedAt: timestamp,
              projectLifecycleState: null,
            }
          : item,
      ),
    );

    addActivity(
      buildActivity({
        action: "restored",
        entityType: "task",
        entityId: task.id,
        entityName: task.title,
        projectId: task.projectId,
      }),
    );
  }

  function deleteTask(taskId) {
    const task = tasks.find((item) => item.id === taskId);

    if (!task) return;

    const timestamp = new Date().toISOString();

    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === taskId
          ? {
              ...item,
              archivedAt: null,
              deletedAt: timestamp,
              updatedAt: timestamp,
              projectLifecycleState: null,
            }
          : item,
      ),
    );

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

  function permanentlyDeleteTask(taskId) {
    const task = tasks.find((item) => item.id === taskId);

    if (!task) return;

    setTasks((previousTasks) =>
      previousTasks.filter((item) => item.id !== taskId),
    );

    addActivity(
      buildActivity({
        action: "permanently-deleted",
        entityType: "task",
        entityId: task.id,
        entityName: task.title,
        projectId: task.projectId,
      }),
    );
  }

  const value = {
    projects,
    tasks,
    activities,

    createProject,
    updateProject,
    archiveProject,
    restoreProject,
    deleteProject,
    permanentlyDeleteProject,

    createTask,
    updateTask,
    archiveTask,
    restoreTask,
    deleteTask,
    permanentlyDeleteTask,

    addActivity,
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export default AppDataProvider;
