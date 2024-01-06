import React from "react";
import { Link } from "react-router-dom";

export default function NavigationLink({ target, text, customStyleClasses }) {
  return (
    <Link className={`${customStyleClasses}`} to={target}>
      {text}
    </Link>
  );
}
