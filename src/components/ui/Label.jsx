function Label({ children, htmlFor, required = false, className = "" }) {
  return (
    <label
      htmlFor={htmlFor}
      className={[
        "mb-2 block text-sm font-medium text-foreground",
        className,
      ].join(" ")}
    >
      {children}

      {required && <span className="ml-1 text-danger">*</span>}
    </label>
  );
}

export default Label;
