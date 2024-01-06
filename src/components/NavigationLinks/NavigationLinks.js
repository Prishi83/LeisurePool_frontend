import React from "react";
import NavigationLink from "./../NavigationLink/NavigationLink";
import * as ROUTES from "../../constants/routes";

export default function NavigationLinks({ customStyleClasses }) {
  return (
    <>
      <NavigationLink
        customStyleClasses={customStyleClasses}
        target={ROUTES.ABOUT_PAGE}
        text="About"
      />
      <NavigationLink
        customStyleClasses={customStyleClasses}
        target={ROUTES.FIND_POOL}
        text="Find a Pool"
      />
      <NavigationLink
        customStyleClasses={customStyleClasses}
        target={ROUTES.HOST_POOL}
        text="Host a Pool"
      />
    </>
  );
}
