import Dialog from "../../ui/Dialog";
import Button from "../../ui/Button";

function DeleteTaskDialog({ open, task, onClose, onConfirm }) {
  if (!task) {
    return null;
  }

  return (
    <Dialog open={open} title="Delete Task" onClose={onClose}>
      <div className="space-y-5">
        <p className="text-sm leading-6 text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">{task.title}</span>?
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button type="button" variant="destructive" onClick={onConfirm}>
            Delete Task
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteTaskDialog;

