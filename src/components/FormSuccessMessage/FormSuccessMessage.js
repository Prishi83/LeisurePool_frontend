import React from "react";

export default function FormSuccessMessage(props) {
  const { successMessage } = props;
  const { className } = props;

  return (
    <div className={className}>
      <div className="text-green-700 rounded-full fill-current p-2 bg-green-200 mb-5 sm:mb-0">
        <svg
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      <span
        style={{ fontSize: "16px" }}
        className="sm:pl-5 text-green-700 font-semibold"
      >
        {successMessage}
      </span>
    </div>
  );
}
