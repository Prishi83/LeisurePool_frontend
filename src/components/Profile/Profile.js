import React, { useEffect, useState } from "react";
import { useUser } from "../../context/user-context";
import userService from "./../../services/user.service";
import CustomClipLoader from "./../CustomClipLoader/CustomClipLoader";
import { Redirect } from "react-router-dom";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import { useFirebase } from "../../context/firebase-context";

export default function Profile() {
  const { search } = useLocation();
  const values = queryString.parse(search);
  const user = useUser();
  const { getUserByEmail } = userService;
  const [firestoreUser, setFirestoreUser] = useState(null);
  const { firestore: db } = useFirebase();
  const [account, setAccount] = useState(null);
  const history = useHistory();
  const [loading, setLoading] = useState(null);

  async function handleStripeOnBoarding() {
    setLoading(true);
    const response = await fetch("http://localhost:4242/onboard-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    window.location = data.url;
  }

  useEffect(() => {
    (async () => {
      const firestoreUser = await getUserByEmail(user?.email);
      if (firestoreUser) {
        setFirestoreUser(firestoreUser);
      }
    })();
  }, [getUserByEmail, user?.email]);

  useEffect(() => {
    setAccount(values.sa);
  }, [values.sa]);

  if (loading) {
    return <CustomClipLoader loading={loading} />;
  }

  if (firestoreUser && account) {
    console.log(firestoreUser, account, values.sa);
    db.collection("users")
      .doc(firestoreUser.uid)
      .update({ stripeAccountId: account })
      .then(() => {
        history.push("/pools");
      });
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  if (firestoreUser) {
    return (
      <div className="my-10 sm:max-w-xl mx-auto">
        <div className="bg-white rounded overflow-hidden shadow-lg">
          <div className="text-center p-6  border-b">
            <img
              className="h-40 w-40 rounded-full mx-auto"
              src={firestoreUser.photoURL}
              alt="User Profile"
            />
            <p className="pt-2 text-3xl font-semibold">
              {firestoreUser.displayName}
            </p>
            <p className="text-2xl text-gray-600">{firestoreUser.email}</p>
          </div>

          <div>
            <div className="px-4 py-8 hover:bg-gray-100 flex">
              <p className="text-3xl font-medium text-gray-800 leading-none">
                Public Information
              </p>
            </div>
            <div className="px-4 py-8 hover:bg-gray-100 flex">
              <p className="text-3xl font-medium text-gray-800 leading-none">
                Private Information
              </p>
            </div>
            {firestoreUser.stripeAccountId ? (
              ""
            ) : (
              <div className="px-4 py-8 hover:bg-gray-100 flex">
                <p
                  onClick={handleStripeOnBoarding}
                  className="text-3xl font-medium text-gray-800 leading-none cursor-pointer"
                >
                  Connect to Stripe
                </p>
              </div>
            )}
            <div className="px-4 py-8 hover:bg-gray-100 flex">
              <p className="text-3xl font-medium text-gray-800 leading-none">
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <CustomClipLoader loading={true} />;
  }
}
