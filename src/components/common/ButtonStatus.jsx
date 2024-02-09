function ButtonStatus({ inProgress, text, inProgressText, className= "btn btn-primary", type = "submit" }) {
  return (
    <button type={type} className={className}>
      {inProgress && (
        <span
          className="spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
      )}
      {inProgress && <span role="status">{inProgressText}</span>}
      {!inProgress && <span role="status">{text}</span>}
    </button>
  );
}

export default ButtonStatus;
