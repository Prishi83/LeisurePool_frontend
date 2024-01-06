import React, { useState, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useFirebase } from "../../context/firebase-context";
import { Redirect } from "react-router-dom";
import { useUser } from "../../context/user-context";
import { useLoggedUser } from "./../../hooks/useLoggedUser/useLoggedUser";
import FormSuccessMessage from "./../FormSuccessMessage/FormSuccessMessage";
import { signInSchema } from "./../../schema/signInSchema";
import CustomClipLoader from "./../CustomClipLoader/CustomClipLoader";
import FormHeading from "./../FormHeading/FormHeading";
import FormErrorMessage from "./../FormErrorMessage/FormErrorMessage";
import SignInForm from "./SignInForm/SignInForm";
import useGoogleAuth from "./../../hooks/SocialAuth/useGoogleAuth";
import useFacebookAuth from "./../../hooks/SocialAuth/useFacebookAuth";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../utils/ErrorFallback";
import checkEmailVerified from "./../../utils/checkEmailVerified";

export default function SignIn() {
  const { search } = useLocation();
  const values = queryString.parse(search);
  const [height, setHeight] = useState(window.innerHeight - 100);
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(signInSchema),
  });
  const { auth, authPersistence, signOut } = useFirebase();
  const [
    signInWithEmailAndPassword,
    ,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const userData = useUser();
  const loggedUser = useLoggedUser(userData);

  const emailVerificationMessage = checkEmailVerified(userData);

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const rememberMe = data.remember_me;
    await authPersistence(rememberMe);
    await signInWithEmailAndPassword(email, password);
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

  if (emailVerificationMessage) {
    signOut();
    return <Redirect to={`/login?error=${emailVerificationMessage.message}`} />;
  }

  if (loggedUser) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <CustomClipLoader loading={loading} />;
  }

  return (
    <div style={{ minHeight: `${height}px` }}>
      <div
        style={{ minHeight: `${height}px` }}
        className="flex flex-col justify-center pb-12 sm:px-6 lg:px-8"
      >
        {(values.message || values.confirm) && (
          <FormSuccessMessage
            successMessage={values.message || "Email verified successfully."}
            className="sm:mx-auto sm:w-full sm:max-w-2xl flex flex-col sm:flex-row justify-center items-center py-7 px-5 shadow-md bg-white"
          />
        )}
        <FormHeading
          headingText="Login"
          subHeadingText="Don’t you have an account?"
          target={ROUTES.REGISTER}
          text="Sign Up"
        />

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          {error && <FormErrorMessage error={error.message} />}
          {customError && <FormErrorMessage error={customError.message} />}
          {values.error && <FormErrorMessage error={values.error} />}
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <SignInForm
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              handleGoogleAuth={handleGoogleAuth}
              handleFacebookAuth={handleFacebookAuth}
            />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
