import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFirebase } from "../../context/firebase-context";
import CustomClipLoader from "../CustomClipLoader/CustomClipLoader";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// eslint-disable-next-line no-unused-vars
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import StripeCheckoutBtn from "./../StripeCheckoutBtn/StripeCheckoutBtn";

export default function Pool() {
  const { id } = useParams();
  const [pool, setPool] = useState(null);
  const [guestCount, setGuestCount] = useState(null);
  const { firestore: db } = useFirebase();

  useEffect(() => {
    (async () => {
      const snapshot = await db.collection("pools").doc(id).get();
      setPool(snapshot.data());
    })();
  }, [db, id]);

  if (pool) {
    return (
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <Carousel autoPlay={true} infiniteLoop={true}>
          {pool.poolImages.map((image) => (
            <div key={image}>
              <img src={image} alt="Pool" />
            </div>
          ))}
        </Carousel>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-12 px-6 shadow sm:rounded-lg sm:px-12">
            <label
              style={{ fontSize: "1.5rem" }}
              className="text-xl font-medium text-gray-700"
              htmlFor="guests"
            >
              Number of Guests
            </label>
            <input
              style={{ backgroundColor: "#f0f0f0" }}
              className={`appearance-none block w-36 px-3 py-4 border-transparent rounded-md shadow placeholder-gray-400 focus:outline-none text-2xl my-4`}
              type="number"
              name="guests"
              id="guests"
              onChange={(e) => {
                setGuestCount(pool.poolPrice * parseInt(e.target.value));
              }}
            />
            <StripeCheckoutBtn price={guestCount} />
          </div>
        </div>
      </div>
    );
  } else {
    return <CustomClipLoader loading={true} />;
  }
}
