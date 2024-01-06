import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import SignUpFormInputs from "./SignUpFormInputs/SignUpFormInputs";
import SocialAuth from "./../../SocialAuth/SocialAuth";

export default function SignUpForm(props) {
  const { register } = props;
  const { handleSubmit } = props;
  const { onSubmit } = props;
  const { errors } = props;
  const { getValues } = props;
  const { handleGoogleAuth } = props;
  const { handleFacebookAuth } = props;

  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(null);
  const [triggerValidation, setTriggerValidation] = useState(false);

  function handleValidationTrigger() {
    setTriggerValidation(true);
  }

  function handleConfirmPassword() {
    const password = getValues("password");
    const confirmPassword = getValues("confirmPassword");
    if (confirmPassword === "") {
      setConfirmPasswordMessage("");
    } else if (!(confirmPassword === password)) {
      setConfirmPasswordMessage("Passwords do not match");
    } else {
      setConfirmPasswordMessage(null);
    }
  }

  return (
    <div className="bg-white py-12 px-6 shadow sm:rounded-lg sm:px-12">
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <SignUpFormInputs
          register={register}
          errors={errors}
          triggerValidation={triggerValidation}
          confirmPasswordMessage={confirmPasswordMessage}
          handleConfirmPassword={handleConfirmPassword}
        />
        <div className="flex items-center">
          <input
            id="agree_terms"
            name="agree_terms"
            type="checkbox"
            className="h-8 w-8 text-color-primary border-gray-300 rounded"
            ref={register}
          />
          <label
            htmlFor="agree_terms"
            className="ml-4 block text-2xl text-gray-900"
          >
            I agree to the{" "}
            <Link className="text-color-primary" to={ROUTES.TERMS_OF_SERVICE}>
              Terms of service
            </Link>
            .
          </label>
        </div>
        {errors.agree_terms && (
          <div style={{ marginTop: "1rem" }} className="text-red-500 text-xl">
            {errors.agree_terms.message}
          </div>
        )}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-2xl font-medium text-white bg-color-primary hover:color-primary focus:outline-none"
            onClick={handleValidationTrigger}
          >
            Sign Up
          </button>
        </div>
      </form>

      <SocialAuth
        handleGoogleAuth={handleGoogleAuth}
        handleFacebookAuth={handleFacebookAuth}
      />
    </div>
  );
}
