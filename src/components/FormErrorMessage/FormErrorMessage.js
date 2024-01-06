import React from "react";

export default function FormErrorMessage(props) {
  const { error } = props;

  return (
    <div className="px-14 flex justify-center items-center pb-7">
      <div className="text-red-700 rounded-full fill-current p-2 bg-red-200">
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
      <span className="pl-4 text-2xl text-red-700 font-semibold">{error}</span>
    </div>
  );
}
