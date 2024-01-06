import React from "react";
import { Switch, Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import About from "./../About/About";
import SignUp from "./../SignUp/SignUp";
import SignIn from "./../SignIn/SignIn";
import ForgotPassword from "./../ForgotPassword/ForgotPassword";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../utils/ErrorFallback";
import Landing from "./../Landing/Landing";
import HostPage from "./../HostPage/HostPage";
import ListingForm from "./../ListingForm/ListingForm";
import Pools from "./../Pools/Pools";
import Pool from "./../Pool/Pool";
import TermsOfService from "./../TermsOfService/TermsOfService";
import Profile from "./../Profile/Profile";

export default function Main() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <main>
        <Switch>
          <Route path="/pool/:id">
            <Pool />
          </Route>
          <Route path={ROUTES.ABOUT_PAGE}>
            <About />
          </Route>
          <Route path={ROUTES.FIND_POOL}>
            <Pools />
          </Route>
          <Route path={ROUTES.HOST_POOL}>
            <HostPage />
          </Route>
          <Route path={ROUTES.POOL_LISTING_FORM}>
            <ListingForm />
          </Route>
          <Route path={ROUTES.REGISTER}>
            <SignUp />
          </Route>
          <Route path={ROUTES.LOGIN}>
            <SignIn />
          </Route>
          <Route path={ROUTES.PROFILE}>
            <Profile />
          </Route>
          <Route path={ROUTES.FORGOT_PASSWORD}>
            <ForgotPassword />
          </Route>
          <Route path={ROUTES.TERMS_OF_SERVICE}>
            <TermsOfService />
          </Route>
          <Route path={ROUTES.LANDING_PAGE} exact>
            <Landing />
          </Route>
        </Switch>
      </main>
    </ErrorBoundary>
  );
}
