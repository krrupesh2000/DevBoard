function Card({ children, className = "" }) {
  return (
    <div
      className={["rounded-xl border border-border bg-card", className].join(
        " ",
      )}
    >
      {children}
    </div>
  );
}

export default Card;
