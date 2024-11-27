import PropTypes from "prop-types";
import React from "react";

const FormField = ({
  inputKey,
  type,
  labelTitle,
  placeholder,
  field,
  error,
}) => {
  const InputComponent = type === "textarea" ? "textarea" : "input";

  return (
    <div className={`form-field ${error ? "error" : ""}`}>
      <label htmlFor={inputKey}>{labelTitle}</label>
      <InputComponent
        {...field}
        id={inputKey}
        name={inputKey}
        type={type}
        placeholder={placeholder}
        className={error ? "is-invalid" : ""}
      />
      {error && <p className="error-message">{error.message}</p>}
    </div>
  );
};

FormField.propTypes = {
  inputKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default FormField;
