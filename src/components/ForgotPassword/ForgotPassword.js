import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useFirebase } from "../../context/firebase-context";
import { useHistory } from "react-router-dom";
import { forgotPasswordSchema } from "./../../schema/forgotPasswordSchema";
import FormErrorMessage from "./../FormErrorMessage/FormErrorMessage";

export default function ForgotPassword() {
  const [error, setError] = useState(null);
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(forgotPasswordSchema),
  });

  const { resetPassword } = useFirebase();

  const onSubmit = async (data) => {
    try {
      await resetPassword(data.email);
      history.push(`/login?message=Reset+password+email+sent+successfully`);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex flex-col justify-center pb-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          style={{ fontSize: "3rem" }}
          className="mt-6 text-center font-extrabold text-gray-900"
        >
          Forgot Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        {error && <FormErrorMessage error={error.message} />}
        <div className="bg-white py-12 px-6 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                style={{ fontSize: "1.5rem" }}
                htmlFor="email"
                className="block text-xl font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`appearance-none block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${
                    errors.email
                      ? "focus:border-red-500 border-red-500"
                      : "focus:border-color-primary"
                  } text-2xl`}
                  ref={register}
                />
                {errors.email && (
                  <div className="text-red-500 mt-2 text-xl">
                    {errors.email.message}
                  </div>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-2xl font-medium text-white bg-color-primary hover:color-primary focus:outline-none"
              >
                Send Password Reset Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
