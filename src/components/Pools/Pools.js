import React, { useState, useEffect } from "react";
import { useFirebase } from "../../context/firebase-context";
import CustomClipLoader from "./../CustomClipLoader/CustomClipLoader";
import { useHistory } from "react-router-dom";

export default function Pools() {
  const history = useHistory();
  const [pools, setPools] = useState(null);
  const { firestore: db } = useFirebase();

  useEffect(() => {
    (async () => {
      const snapshot = await db.collection("pools").get();
      setPools(
        snapshot.docs.map((doc) => {
          return {
            data: doc.data(),
            id: doc.id,
          };
        })
      );
    })();
  }, [db]);

  if (pools) {
    return pools.map((pool) => (
      <article className="mx-5 my-5" key={pool.id}>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-7xl">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="grid sm:grid-cols-2">
              <div className="flex">
                <img src={pool.data.poolImages[0]} alt="Pool" />
              </div>
              <div className="py-8 px-6">
                <p className="text-3xl font-semibold">{pool.data.poolName}</p>
                <p className="mt-4 text-xl">
                  {pool.data.poolDescription.substring(0, 250)}...
                </p>
                <p
                  style={{ fontSize: "3rem" }}
                  className="mt-4 font-bold text-color-secondary"
                >
                  ${pool.data.poolPrice}{" "}
                  <span style={{ fontSize: "1.8rem", color: "#7b858b" }}>
                    per hour
                  </span>
                </p>
                <button
                  onClick={() => {
                    history.push(`/pool/${pool.id}`);
                  }}
                  className="mt-4 bg-color-primary px-4 py-4 text-2xl font-semibold tracking-wider text-white rounded"
                >
                  More Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    ));
  } else {
    return <CustomClipLoader loading={true} />;
  }
}
