function Textarea({ className = "", rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={[
        "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors",
        "placeholder:text-muted-foreground",
        "focus:border-primary",
        "resize-none",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

export default Textarea;
