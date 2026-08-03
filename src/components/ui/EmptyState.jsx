function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}) {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-12 text-center",
        className,
      ].join(" ")}
    >
      {Icon && (
        <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <Icon size={22} aria-hidden="true" />
        </div>
      )}

      <h3 className="text-sm font-semibold">{title}</h3>

      {description && (
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;
