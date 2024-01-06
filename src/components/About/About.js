import React from "react";

export default function About() {
  return (
    <div className="mt-10">
      <div className="max-w-screen-lg bg-white shadow-2xl rounded-lg mx-auto text-center py-12 mt-4">
        <h2 className="text-3xl leading-9 font-bold tracking-tight text-gray-800 sm:text-5xl sm:leading-10">
          Our Vision
        </h2>
        <p className="text-3xl mt-8">
          To create the largest privately owned, locally hosted swimming pool
          directory for U.S. & Australia!
        </p>
      </div>

      <div className="max-w-screen-lg bg-color-primary shadow-2xl rounded-lg mx-auto text-center py-12 mt-8 px-10">
        <h2 className="text-3xl leading-9 font-bold tracking-tight sm:text-5xl sm:leading-10 text-white">
          Our Mission
        </h2>
        <p className="text-3xl mt-8 text-white">
          Our mission is to help people that own their own swimming pool make a
          passive income by renting out their pool to those that need it, while
          improving the health and well being and lowering the stress levels of
          pool owners. We also hope that we will have pools all over the country
          so no matter where you are there will always be a private pool just
          around the corner.
        </p>
      </div>
    </div>
  );
}
