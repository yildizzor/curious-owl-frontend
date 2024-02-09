import "./UnderlineInput.css";

function UnderlineInput({
  value,
  onChange,
  className,
  required = false,
  type,
  name,
  rows,
  cols,
  maxLength,
}) {
  return (
    <div className="underline-input-container">
      {type === "textarea" ? (
        <textarea
          rows={rows}
          cols={cols}
          maxLength={maxLength}
          name={name}
          required={required}
          className={`underline-textarea ${className}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className={`underline-input ${className}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

export default UnderlineInput;
