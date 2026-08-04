import Card from "../ui/Card";

function MetricCard({ label, value, icon: Icon, description }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>

          <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>

          {description && (
            <p className="mt-2 text-xs text-muted-foreground">{description}</p>
          )}
        </div>

        {Icon && (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon size={20} aria-hidden="true" />
          </div>
        )}
      </div>
    </Card>
  );
}

export default MetricCard;
