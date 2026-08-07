import Dialog from "../../ui/Dialog";
import ProjectForm from "../forms/ProjectForm";

import useAppData from "../../../hooks/useAppData";

function AddProjectDialog({ open, onClose }) {
  const { createProject } = useAppData();

  function handleSubmit(projectData) {
    createProject(projectData);

    onClose();
  }

  return (
    <Dialog open={open} title="Add Project" onClose={onClose}>
      <ProjectForm
        project={null}
        submitLabel="Create Project"
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Dialog>
  );
}

export default AddProjectDialog;
