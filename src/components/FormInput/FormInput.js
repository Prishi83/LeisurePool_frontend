import React from "react";

export default function FormInput(props) {
  const { labelFor } = props;
  const { labelText } = props;

  const { inputId } = props;
  const { inputName } = props;
  const { inputType } = props;
  const { inputAutoComplete } = props;

  const { register } = props;
  const { error } = props;

  return (
    <div>
      <label
        style={{ fontSize: "1.5rem" }}
        htmlFor={labelFor}
        className="block text-xl font-medium text-gray-700"
      >
        {labelText}
      </label>
      <div className="mt-3">
        <input
          id={inputId}
          name={inputName}
          type={inputType}
          autoComplete={inputAutoComplete}
          className={`appearance-none block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${
            error
              ? "focus:border-red-500 border-red-500"
              : "focus:border-color-primary"
          } text-2xl`}
          ref={register}
        />
        {error && (
          <div className="text-red-500 mt-2 text-xl">{error?.message}</div>
        )}
      </div>
    </div>
  );
}
