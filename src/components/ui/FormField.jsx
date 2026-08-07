import Label from "./Label";

function FormField({
  label,
  htmlFor,
  required = false,
  error,
  children,
  className = "",
}) {
  return (
    <div className={["space-y-2", className].join(" ")}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}

      {children}

      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}

export default FormField;
