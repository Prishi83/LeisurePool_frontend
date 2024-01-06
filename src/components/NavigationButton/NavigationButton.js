import React from "react";
import { useHistory } from "react-router-dom";

export default function NavigationButton({ text, target, customStyleClasses }) {
  const history = useHistory();

  return (
    <button
      className={`w-40 h-20 rounded-3xl text-2xl font-bold focus:outline-none ${customStyleClasses}`}
      onClick={() => history.push(target)}
      type="button"
    >
      {text}
    </button>
  );
}
