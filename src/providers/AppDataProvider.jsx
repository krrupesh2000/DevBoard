
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
  const [activities] = useState(initialActivities);

  function createProject(projectData) {
    const project = buildProject(projectData);

    setProjects((previousProjects) => [
      project,
      ...previousProjects,
    ]);

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
  }

  function deleteProject(projectId) {
    setProjects((previousProjects) =>
      previousProjects.filter((project) => project.id !== projectId),
    );
  }

  function createTask(taskData) {
    const task = buildTask(taskData);

    setTasks((previousTasks) => [
      task,
      ...previousTasks,
    ]);

    return task;
  }

  function updateTask(taskId, taskData) {
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
  }

  function deleteTask(taskId) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );
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
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
}

export default AppDataProvider;

