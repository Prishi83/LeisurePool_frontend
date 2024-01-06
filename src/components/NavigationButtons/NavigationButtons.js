import React from "react";
import NavigationButton from "./../NavigationButton/NavigationButton";
import * as ROUTES from "../../constants/routes";
import { useUser } from "../../context/user-context";
import { useFirebase } from "../../context/firebase-context";
import { useLoggedUser } from "./../../hooks/useLoggedUser/useLoggedUser";

export default function NavigationButtons({ customStyleClasses }) {
  const user = useUser();
  const loggedUser = useLoggedUser(user);
  const { signOut } = useFirebase();

  if (loggedUser) {
    return (
      <div className={`${customStyleClasses}`}>
        <NavigationButton
          customStyleClasses="border-2 border-solid border-color-accent mb-4 md:mb-0 md:mx-2"
          text="Profile"
          target={ROUTES.PROFILE}
        />
        <button
          className={`bg-color-accent text-white mb-4 md:mb-0 md:mx-2 w-40 h-20 rounded-3xl text-2xl font-bold focus:outline-none`}
          onClick={signOut}
          type="button"
        >
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div className={`${customStyleClasses}`}>
        <NavigationButton
          customStyleClasses="border-2 border-solid border-color-accent mb-4 md:mb-0 md:mx-2"
          text="Login"
          target={ROUTES.LOGIN}
        />
        <NavigationButton
          customStyleClasses="bg-color-accent text-white mb-4 md:mb-0 md:mx-2"
          text="Sign Up"
          target={ROUTES.REGISTER}
        />
      </div>
    );
  }
}
