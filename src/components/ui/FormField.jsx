import { cloneElement, useId } from "react";

import Label from "./Label";

function FormField({
  label,
  htmlFor,
  required = false,
  error,
  children,
  className = "",
}) {
  const generatedId = useId();
  const errorId = `${htmlFor || generatedId}-error`;

  const field = error
    ? cloneElement(children, {
        "aria-invalid": true,
        "aria-describedby": errorId,
      })
    : children;

  return (
    <div className={["space-y-2", className].join(" ")}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}

      {field}

      {error && (
        <p
          id={errorId}
          className="text-sm text-danger"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
