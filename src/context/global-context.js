import React from "react";
import { FirebaseProvider } from "../context/firebase-context";
import { UserProvider } from "../context/user-context";
import { BurgerMenuProvider } from "./burger-menu-context";

const GlobalContext = React.createContext();

export function GlobalProvider(props) {
  return (
    <GlobalContext.Provider value="">
      <FirebaseProvider>
        <UserProvider>
          <BurgerMenuProvider>{props.children}</BurgerMenuProvider>
        </UserProvider>
      </FirebaseProvider>
    </GlobalContext.Provider>
  );
}

export function useGlobalState() {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(`useGlobalState must be used within a GlobalProvider`);
  }
  return context;
}
