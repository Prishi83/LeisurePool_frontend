import React from "react";
import firebaseService from "../services/firebase.service";

const FirebaseContext = React.createContext();

export function FirebaseProvider(props) {
  const value = firebaseService;

  return <FirebaseContext.Provider value={value} {...props} />;
}

export function useFirebase() {
  const context = React.useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error(`useFirebase must be used within a FirebaseProvider`);
  }
  return context;
}
