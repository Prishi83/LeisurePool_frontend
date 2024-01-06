import React from "react";
import BrandLogo from "./../BrandLogo/BrandLogo";
import HamburgerMenu from "./../HamburgerMenu/HamburgerMenu";

export default function NavigationMenuMobileScreen() {
  return (
    <div className="flex items-center justify-between">
      <BrandLogo />
      <HamburgerMenu />
    </div>
  );
}
