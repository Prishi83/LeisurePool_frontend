import React, { useState } from "react";
import { useUser } from "../../context/user-context";
import { useLoggedUser } from "./../../hooks/useLoggedUser/useLoggedUser";
import userService from "./../../services/user.service";
import UpdateProfile from "./../UpdateProfile/UpdateProfile";
import heroImage from "../../assets/hero.svg";
import "./Landing.css";
import { useHistory } from "react-router-dom";

export default function Landing() {
  const history = useHistory();
  const user = useUser();
  const loggedUser = useLoggedUser(user);
  const { getUserByEmail } = userService;
  const [previewImage, setPreviewImage] = useState(null);
  const [UID, setUID] = useState(null);
  const [isUserNew, setIsUserNew] = useState();

  async function handleNewUser(email) {
    const user = await getUserByEmail(email);
    if (user?.newUser) {
      setPreviewImage(user.photoURL);
    }
    setUID(user?.uid);
    setIsUserNew(user?.newUser);
  }

  if (isUserNew) {
    return (
      <UpdateProfile
        UID={UID}
        previewImage={previewImage}
        setIsUserNew={setIsUserNew}
      />
    );
  }

  if (loggedUser) {
    handleNewUser(user.email);
  }

  return (
    <div style={{ maxWidth: "1140px", margin: "0 auto" }} className="md:p-10">
      <div className="grid md:grid-cols-3">
        <div className="flex flex-col justify-center">
          <h2 className="font-semibold hero-text">
            Book a local private pool by the hour
          </h2>
          <button
            onClick={() => {
              history.push("/pools");
            }}
            className="hero-button mt-4 w-80 bg-color-primary px-4 py-6 text-2xl font-semibold tracking-wider text-white rounded focus:outline-none"
          >
            View All Pools
          </button>
        </div>
        <div className="md:col-span-2 p-5 md:p-10 w-full hero-image">
          <img className="inline-block" src={heroImage} alt="Pool" />
        </div>
      </div>
    </div>
  );
}
