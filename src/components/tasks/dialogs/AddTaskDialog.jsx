import Dialog from "../../ui/Dialog";
import TaskForm from "../forms/TaskForm";

function AddTaskDialog({ open, projects, onClose, onSubmit }) {
  return (
    <Dialog open={open} title="Add Task" onClose={onClose}>
      <TaskForm
        projects={projects}
        submitLabel="Create Task"
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Dialog>
  );
}

export default AddTaskDialog;
