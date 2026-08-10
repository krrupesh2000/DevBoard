import Dialog from "../../ui/Dialog";
import TaskForm from "../forms/TaskForm";

function EditTaskDialog({ open, task, projects, onClose, onSubmit }) {
  if (!task) {
    return null;
  }

  return (
    <Dialog open={open} title="Edit Task" onClose={onClose}>
      <TaskForm
        task={task}
        projects={projects}
        submitLabel="Save Changes"
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Dialog>
  );
}

export default EditTaskDialog;
