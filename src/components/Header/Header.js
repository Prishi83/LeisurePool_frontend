import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  const [headerBgColor, setHeaderBgColor] = useState("theme-primary");

  function handleScroll() {
    if (window.scrollY > 5) {
      return setHeaderBgColor(`bg-white animate__animated animate__fadeIn`);
    } else {
      return setHeaderBgColor("theme-primary");
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{ zIndex: "898" }}
      className={`px-8 sticky top-0 ${headerBgColor}`}
    >
      <Navigation />
    </header>
  );
}
