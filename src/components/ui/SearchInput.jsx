import { PiMagnifyingGlass, PiX } from "react-icons/pi";

function SearchInput({
  value,
  onValueChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={["relative", className].join(" ")}>
      <PiMagnifyingGlass
        size={18}
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground"
      />

      {value && (
        <button
          type="button"
          onClick={() => onValueChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <PiX size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
