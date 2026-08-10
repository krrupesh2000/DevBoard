function Input({ className = "", ...props }) {
  return (
    <input
      className={[
        "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors",
        "placeholder:text-muted-foreground",
        "focus:border-primary",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

export default Input;
