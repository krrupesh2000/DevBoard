function ProgressBar({ value, showLabel = true }) {
  const normalizedValue = Math.min(100, Math.max(0, Number(value) || 0));

  return (
    <div>
      {showLabel && (
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>

          <span className="font-medium text-foreground">
            {normalizedValue}%
          </span>
        </div>
      )}

      <div
        className="h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={normalizedValue}
        aria-label={`Progress: ${normalizedValue}%`}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
