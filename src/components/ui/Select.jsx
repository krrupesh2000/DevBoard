function Select({
  name,
  value,
  onChange,
  onValueChange,
  options,
  ariaLabel,
  className = "",
  ...props
}) {
  function handleChange(event) {
    onChange?.(event);
    onValueChange?.(event.target.value);
  }

  return (
    <select
      name={name}
      value={value}
      onChange={handleChange}
      aria-label={ariaLabel}
      className={[
        "h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors",
        "focus:border-primary",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ].join(" ")}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;

