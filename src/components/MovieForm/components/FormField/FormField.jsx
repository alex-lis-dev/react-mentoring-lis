import PropTypes from "prop-types";
import React from "react";

const FormField = ({
  inputKey,
  type,
  labelTitle,
  placeholder,
  initialValue,
  onChange
}) => {
  const InputComponent = type === "textarea" ? "textarea" : "input";

  return (
    <div className="form-field">
      <label htmlFor={inputKey}>{labelTitle}</label>
      <InputComponent
        value={initialValue}
        name={inputKey}
        id={inputKey}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;

FormField.propTypes = {
  inputKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  initialValue: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
};
