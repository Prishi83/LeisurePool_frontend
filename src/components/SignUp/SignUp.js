import React, { useState, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { signUpSchema } from "../../schema/signUpSchema";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useFirebase } from "../../context/firebase-context";
import { useUser } from "../../context/user-context";
import { Redirect } from "react-router-dom";
import { useLoggedUser } from "./../../hooks/useLoggedUser/useLoggedUser";
import SignUpForm from "./SignUpForm/SignUpForm";
import FormHeading from "./../FormHeading/FormHeading";
import FormErrorMessage from "./../FormErrorMessage/FormErrorMessage";
import FormSuccessMessage from "./../FormSuccessMessage/FormSuccessMessage";
import CustomClipLoader from "./../CustomClipLoader/CustomClipLoader";
import handleSignUpSubmit from "../../utils/handleSignUpSubmit";
import useGoogleAuth from "./../../hooks/SocialAuth/useGoogleAuth";
import useFacebookAuth from "./../../hooks/SocialAuth/useFacebookAuth";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../utils/ErrorFallback";

export default function SignUp() {
  const [height, setHeight] = useState(window.innerHeight - 100);
  const { register, handleSubmit, errors, getValues } = useForm({
    resolver: joiResolver(signUpSchema),
  });
  const { auth, signOut } = useFirebase();
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth, {
    emailVerificationOptions: {
      url: `${ROUTES.EMAIL_VERIFICATION_REDIRECT}/login?confirm=true`,
    },
    sendEmailVerification: true,
  });

  const userData = useUser();
  const loggedUser = useLoggedUser(userData);

  const onSubmit = async (data) => {
    await handleSignUpSubmit(auth, data, createUserWithEmailAndPassword);
    signOut();
  };

  const [googleError, handleGoogleAuth] = useGoogleAuth();

  const [facebookError, handleFacebookAuth] = useFacebookAuth();

  let customError = null;
  customError = googleError ? googleError : facebookError;

  function handleBrowserResize() {
    setHeight(window.innerHeight - 100);
  }

  useEffect(() => {
    window.addEventListener("resize", handleBrowserResize);
    return () => {
      window.removeEventListener("resize", handleBrowserResize);
    };
  }, []);

  if (loggedUser) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <CustomClipLoader loading={loading} />;
  }

  if (user) {
    return (
      <FormSuccessMessage
        successMessage="Account created successfully. Please verify your email before you login. We have sent email verification on your email."
        className="sm:w-1/2 mx-auto flex flex-col sm:flex-row justify-center items-center py-14 px-14 shadow-md bg-white"
      />
    );
  }

  return (
    <div style={{ minHeight: `${height}px` }}>
      <div
        style={{ minHeight: `${height}px` }}
        className="flex flex-col justify-center pb-12 sm:px-6 lg:px-8"
      >
        <FormHeading
          headingText="Sign up"
          subHeadingText="Already have an account?"
          target={ROUTES.LOGIN}
          text="Login"
        />
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          {error && <FormErrorMessage error={error.message} />}
          {customError && <FormErrorMessage error={customError.message} />}
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <SignUpForm
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              getValues={getValues}
              handleGoogleAuth={handleGoogleAuth}
              handleFacebookAuth={handleFacebookAuth}
            />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
