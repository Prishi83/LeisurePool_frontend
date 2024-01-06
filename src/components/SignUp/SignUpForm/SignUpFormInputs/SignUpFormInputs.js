import React from "react";
import FormInput from "./../../../FormInput/FormInput";

export default function SignUpFormInputs(props) {
  const { register } = props;
  const { errors } = props;
  const { triggerValidation } = props;
  const { confirmPasswordMessage } = props;
  const { handleConfirmPassword } = props;

  return (
    <>
      <FormInput
        labelFor="firstName"
        labelText="First Name"
        inputId="firstName"
        inputName="firstName"
        inputType="text"
        inputAutoComplete="given-name"
        register={register}
        error={errors?.firstName}
      />
      <FormInput
        labelFor="lastName"
        labelText="Last Name"
        inputId="lastName"
        inputName="lastName"
        inputType="text"
        inputAutoComplete="family-name"
        register={register}
        error={errors?.lastName}
      />
      <FormInput
        labelFor="email"
        labelText="Email address"
        inputId="email"
        inputName="email"
        inputType="email"
        inputAutoComplete="email"
        register={register}
        error={errors?.email}
      />
      <FormInput
        labelFor="password"
        labelText="Password"
        inputId="password"
        inputName="password"
        inputType="password"
        inputAutoComplete="new-password"
        register={register}
        error={errors?.password}
      />
      <div>
        <label
          style={{ fontSize: "1.5rem" }}
          htmlFor="confirmPassword"
          className="block text-xl font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <div className="mt-3">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            className={`appearance-none block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${
              errors?.confirmPassword ||
              (triggerValidation && confirmPasswordMessage)
                ? "focus:border-red-500 border-red-500"
                : "focus:border-color-primary"
            } text-2xl`}
            ref={register}
            onChange={handleConfirmPassword}
          />
          {errors?.confirmPassword && (
            <div className="text-red-500 mt-2 text-xl">
              {errors?.confirmPassword.message}
            </div>
          )}
          {triggerValidation && confirmPasswordMessage && (
            <div className="text-red-500 mt-2 text-xl">
              {confirmPasswordMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
