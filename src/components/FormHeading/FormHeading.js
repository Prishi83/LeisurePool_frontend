import React from "react";
import { Link } from "react-router-dom";

export default function FormHeading(props) {
  const { headingText } = props;
  const { subHeadingText } = props;
  const { text } = props;
  const { target } = props;

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        style={{ fontSize: "3rem" }}
        className="mt-6 text-center font-extrabold text-gray-900"
      >
        {headingText}
      </h2>
      <p className="mt-2 text-center text-2xl text-gray-600">
        {subHeadingText}{" "}
        <Link
          to={target}
          className="font-bold text-color-primary hover:text-color-primary"
        >
          {text}
        </Link>
      </p>
    </div>
  );
}
