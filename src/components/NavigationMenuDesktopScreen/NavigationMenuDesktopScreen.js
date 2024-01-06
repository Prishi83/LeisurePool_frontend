import React from "react";
import BrandLogo from "./../BrandLogo/BrandLogo";
import NavigationLinks from "./../NavigationLinks/NavigationLinks";
import NavigationButtons from "./../NavigationButtons/NavigationButtons";

export default function NavigationMenuDesktopScreen() {
  return (
    <>
      <BrandLogo />
      <div className="md:flex md:flex-row md:flex-grow md:items-center md:justify-center">
        <NavigationLinks customStyleClasses="text-4xl md:mx-4" />
      </div>
      <NavigationButtons customStyleClasses="md:flex md:flex-row md:items-center" />
    </>
  );
}
