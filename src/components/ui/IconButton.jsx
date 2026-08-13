function IconButton({
  icon,
  label,
  variant = "default",
  className = "",
  type = "button",
  ...props
}) {
  const variants = {
    default:
      "border-border text-muted-foreground hover:bg-muted hover:text-foreground",

    danger:
      "border-border text-muted-foreground hover:border-danger/30 hover:bg-danger/10 hover:text-danger",

    archive:
      "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
  };

  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={[
        "inline-flex size-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        variants[variant] ?? variants.default,
        className,
      ].join(" ")}
      {...props}
    >
      {icon}
    </button>
  );
}

export default IconButton;
