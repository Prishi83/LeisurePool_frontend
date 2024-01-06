import { useFirebase } from "../../context/firebase-context";
import { useState } from "react";
import userService from "./../../services/user.service";
import handleNewUserCreation from "./../../utils/handleNewUserCreation";

export default function useGoogleAuth() {
  const { getExistingUserByEmail } = userService;
  const [error, setError] = useState(null);
  const { signInWithFacebook } = useFirebase();

  return [
    error,
    async function () {
      try {
        const result = await signInWithFacebook();
        const userEmail = result.user.email;
        const doesEmailExist = await getExistingUserByEmail(userEmail);
        if (!doesEmailExist) {
          const user = result.additionalUserInfo.profile;
          handleNewUserCreation("facebook", user);
        }
      } catch (error) {
        setError(error);
      }
    },
  ];
}
