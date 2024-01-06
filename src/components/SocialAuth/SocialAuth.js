import React from "react";
import google from "../../assets/google.svg";
import facebook from "../../assets/facebook.svg";

export default function SocialAuth(props) {
  const { handleGoogleAuth } = props;
  const { handleFacebookAuth } = props;

  return (
    <>
      <div className="mt-8">
        <div className="text-center">
          <span className="px-2 text-2xl font-bold bg-white text-gray-500">
            OR
          </span>
        </div>

        <div className="mt-6 grid grid-rows-2 gap-8">
          <div>
            <button
              onClick={handleGoogleAuth}
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-2xl font-medium text-gray-500 hover:bg-gray-50 focus:outline-none"
            >
              <span className="sr-only">Sign Up with Google</span>
              <img
                className="w-10 h-10"
                src={google}
                alt="Google Logo for Sign Up Button"
              />
              <span className="px-3">Continue with Google</span>
            </button>
          </div>
          <div>
            <button
              onClick={handleFacebookAuth}
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-2xl font-medium text-gray-500 hover:bg-gray-50 focus:outline-none"
            >
              <span className="sr-only">Sign Up with Facebook</span>
              <img
                className="w-10 h-10"
                src={facebook}
                alt="Facebook Logo for Sign Up Button"
              />
              <span className="px-3">Continue with Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
