import React, { useState, useEffect } from "react";
import NavigationMenuMobileScreen from "./../NavigationMenuMobileScreen/NavigationMenuMobileScreen";
import NavigationMenuDesktopScreen from "./../NavigationMenuDesktopScreen/NavigationMenuDesktopScreen";
import { clearAllBodyScrollLocks } from "body-scroll-lock";

export default function Navigation() {
  const [mobileView, setMobileView] = useState(
    window.matchMedia("screen and (min-width: 960px)").matches
  );

  function handleBrowserResize() {
    clearAllBodyScrollLocks();
    setMobileView(window.matchMedia("screen and (min-width: 960px)").matches);
  }

  useEffect(() => {
    window.addEventListener("resize", handleBrowserResize);
    return () => {
      window.removeEventListener("resize", handleBrowserResize);
    };
  }, []);

  return (
    <nav className="md:flex 3xl:container 3xl:mx-auto">
      {!mobileView && <NavigationMenuMobileScreen />}
      {mobileView && <NavigationMenuDesktopScreen />}
    </nav>
  );
}
