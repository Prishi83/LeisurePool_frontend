import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFirebase } from "../context/firebase-context";

const UserContext = React.createContext();

export function UserProvider(props) {
  const { auth } = useFirebase();
  const [user] = useAuthState(auth);

  return <UserContext.Provider value={user} {...props} />;
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}
