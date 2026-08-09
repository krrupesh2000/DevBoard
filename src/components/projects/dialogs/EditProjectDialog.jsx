import Dialog from "../../ui/Dialog";
import ProjectForm from "../forms/ProjectForm";

function EditProjectDialog({ project, open, onClose, onSubmit }) {
  if (!project) {
    return null;
  }

  return (
    <Dialog open={open} title="Edit Project" onClose={onClose}>
      <ProjectForm
        project={project}
        submitLabel="Save Changes"
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Dialog>
  );
}

export default EditProjectDialog;
