import Dialog from "../../ui/Dialog";
import Button from "../../ui/Button";

function DeleteProjectDialog({ project, open, onClose, onConfirm }) {
  if (!project) {
    return null;
  }

  return (
    <Dialog open={open} title="Move Project to Trash" onClose={onClose}>
      <div>
        <p className="text-sm text-foreground">
          Are you sure you want to move{" "}
          <span className="font-semibold">{project.name}</span> to the trash?
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          You can restore it later from Trash.
        </p>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button type="button" variant="danger" onClick={onConfirm}>
          Move to Trash
        </Button>
      </div>
    </Dialog>
  );
}

export default DeleteProjectDialog;
