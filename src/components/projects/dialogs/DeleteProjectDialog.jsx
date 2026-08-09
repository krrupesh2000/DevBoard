import Dialog from "../../ui/Dialog";
import Button from "../../ui/Button";

function DeleteProjectDialog({ project, open, onClose, onConfirm }) {
  if (!project) {
    return null;
  }

  return (
    <Dialog open={open} title="Delete Project" onClose={onClose}>
      <div className="space-y-6">
        <div>
          <p className="text-sm leading-6 text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">{project.name}</span>?
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button type="button" variant="danger" onClick={onConfirm}>
            Delete Project
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteProjectDialog;
