import { PiArrowCounterClockwise, PiTrash } from "react-icons/pi";

import Card from "../ui/Card";
import Button from "../ui/Button";

function TrashItem({ item, type, onRestore, onDeletePermanently }) {
  const isProject = type === "project";

  const title = isProject ? item.name : item.title;

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold">{title}</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            {isProject ? "Project" : "Task"} · In Trash
          </p>

          {!isProject && item.description && (
            <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>

        <div className="flex shrink-0 gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onRestore(item)}
          >
            <PiArrowCounterClockwise size={16} aria-hidden="true" />
            Restore
          </Button>

          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={() => onDeletePermanently(item)}
          >
            <PiTrash size={16} aria-hidden="true" />
            Delete Permanently
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default TrashItem;
