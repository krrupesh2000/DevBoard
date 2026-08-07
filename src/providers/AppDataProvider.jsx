import { useState } from "react";

import AppDataContext from "../context/AppDataContext";

import { projects as initialProjects } from "../data/projects";
import { tasks as initialTasks } from "../data/tasks";
import { activities as initialActivities } from "../data/activities";

import { buildProject } from "../utils/projectFactory";

function AppDataProvider({ children }) {
  const [projects, setProjects] = useState(initialProjects);
  const [tasks] = useState(initialTasks);
  const [activities] = useState(initialActivities);

  function createProject(projectData) {
    const project = buildProject(projectData);

    setProjects((previousProjects) => [project, ...previousProjects]);

    return project;
  }

  const value = {
    projects,
    tasks,
    activities,
    createProject,
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export default AppDataProvider;
