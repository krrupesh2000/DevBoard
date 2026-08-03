function Select({ value, onValueChange, options, ariaLabel, className = "" }) {
  return (
    <select
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
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
