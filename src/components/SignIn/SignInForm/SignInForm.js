import React from "react";
import FormInput from "./../../FormInput/FormInput";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import SocialAuth from "./../../SocialAuth/SocialAuth";

export default function SignInForm(props) {
  const { register } = props;
  const { handleSubmit } = props;
  const { onSubmit } = props;
  const { errors } = props;
  const { handleGoogleAuth } = props;
  const { handleFacebookAuth } = props;

  return (
    <div className="bg-white py-12 px-6 shadow sm:rounded-lg sm:px-12">
      <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="h-8 w-8 text-color-primary border-gray-300 rounded"
              ref={register}
            />
            <label
              htmlFor="remember_me"
              className="ml-4 block text-2xl text-gray-900"
            >
              Remember me
            </label>
          </div>
          <div className="text-2xl">
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="font-medium text-color-primary hover:text-color-primary"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-2xl font-medium text-white bg-color-primary hover:color-primary focus:outline-none"
          >
            Login
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
