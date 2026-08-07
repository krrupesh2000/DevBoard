function Select({
  name,
  value,
  onChange,
  onValueChange,
  options,
  ariaLabel,
  className = "",
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
        "h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground",
        className,
      ].join(" ")}
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
