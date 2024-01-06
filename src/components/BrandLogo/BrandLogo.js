import React from "react";
import brandLogo from "../../assets/brand-logo.svg";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export default function BrandLogo() {
  return (
    <div className="w-96">
      <Link to={ROUTES.LANDING_PAGE} className="inline-block w-full">
        <img
          className="inline-block w-full"
          src={brandLogo}
          alt="Leisurpool brand logo of a person swimming"
        />
      </Link>
    </div>
  );
}
