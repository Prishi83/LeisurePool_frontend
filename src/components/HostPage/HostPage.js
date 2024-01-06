import React from "react";
import { useUser } from "../../context/user-context";
import { useLoggedUser } from "./../../hooks/useLoggedUser/useLoggedUser";
import { useHistory } from "react-router-dom";
import hostImage from "../../assets/host-pool.svg";
import "./HostPage.css";

export default function HostPage() {
  const user = useUser();
  const loggedUser = useLoggedUser(user);
  const history = useHistory();

  function handlePoolListing() {
    if (loggedUser) {
      history.push("/pool-listing-form");
    } else {
      history.push("/login");
    }
  }

  return (
    <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
      <div className="grid md:grid-cols-3">
        <div className="flex flex-col justify-center">
          <h2 className="font-semibold host-text">
            Finally, Let your pool pay for itself!
          </h2>
          <button
            onClick={handlePoolListing}
            className="host-button mt-4 w-80 bg-color-primary px-4 py-6 text-3xl font-semibold tracking-wider text-white rounded focus:outline-none"
          >
            List Your Pool
          </button>
        </div>
        <div className="md:col-span-2 p-5 md:p-10 w-full host-image">
          <img className="inline-block" src={hostImage} alt="Pool" />
        </div>
      </div>
    </div>
  );
}
