function Input({ className = "", ...props }) {
  return (
    <input
      className={[
        "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors",
        "placeholder:text-muted-foreground",
        "focus:border-primary",
        "[&::-webkit-calendar-picker-indicator]:opacity-70",
        "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
        "dark:[&::-webkit-calendar-picker-indicator]:invert",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

export default Input;
