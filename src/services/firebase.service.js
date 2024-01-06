import firebase from "../configs/firebase.config";

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return auth.signInWithPopup(provider);
};

const authPersistence = (rememberMe) => {
  let state;
  if (rememberMe) {
    state = firebase.auth.Auth.Persistence.LOCAL;
  } else {
    state = firebase.auth.Auth.Persistence.SESSION;
  }

  return auth.setPersistence(state);
};

const resetPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
};

const signOut = () => auth.signOut();

const firebaseService = {
  auth,
  firestore,
  storage,
  signInWithGoogle,
  signOut,
  authPersistence,
  signInWithFacebook,
  resetPassword,
  firebase,
};

export default firebaseService;
