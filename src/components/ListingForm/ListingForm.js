import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { poolListingFormSchema } from "./../../schema/poolListingFormSchema";
import "./ListingForm.css";
import MultiImageInput from "react-multiple-image-input";
import { useBurgerMenu } from "../../context/burger-menu-context";
import useStorageImageUpload from "./../../hooks/useStorageImageUpload/useStorageImageUpload";
import CustomClipLoader from "../CustomClipLoader/CustomClipLoader";
import { useUser } from "../../context/user-context";
import userService from "../../services/user.service";
import { useFirebase } from "../../context/firebase-context";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import { useHistory } from "react-router-dom";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  "pk.eyJ1IjoianNjYXN0cm8iLCJhIjoiY2s2YzB6Z25kMDVhejNrbXNpcmtjNGtpbiJ9.28ynPf1Y5Q8EyB_moOHylw";

const publicIp = require("public-ip");
const DefaultLocation = { lat: 37.3875, lng: -122.0575 };
const DefaultZoom = 10;

export default function ListingForm() {
  const history = useHistory();
  const { open } = useBurgerMenu();
  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(poolListingFormSchema),
  });

  const [, loading, error, uploadImage] = useStorageImageUpload();

  const [location, setLocation] = useState(DefaultLocation);
  const [currentLocation, setCurrentLocation] = useState(DefaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  const mapContainer = useRef();
  const [images, setImages] = useState({});

  const user = useUser();
  const { getUserByEmail } = userService;
  const [UID, setUID] = useState(null);
  const { firestore: db, firebase } = useFirebase();

  const onSubmit = async (data) => {
    const amenities = [];

    for (let i = 1; i <= 39; ++i) {
      const key = `amenity${i}`;
      if (data[key]) {
        amenities.push(data[key]);
      }
    }

    const imageUrlList = [];

    await (async () => {
      for (const key in images) {
        const result = await fetch(images[key]);
        const image = await result.blob();
        const imageFile = new File([image], `pool-image-${Date.now()}`, {
          type: image.type,
        });
        const imageUrl = await uploadImage(imageFile, "pool-images");
        imageUrlList.push(imageUrl);
      }
    })();

    let geoAddress = "";
    let geoDisplayName = "";

    await (async () => {
      const result = await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=pk.f5a54e2eb9f6de15eb10ab776dda09b3&lat=${location.lat}&lon=${location.lng}&format=json`
      );
      const geoData = await result.json();
      geoAddress = geoData.address;
      geoDisplayName = geoData.display_name;
    })();

    const storeObj = {
      address: data.address,
      accessInstructions: data.access_instructions,
      poolName: data.poolName,
      poolDescription: data.poolDescription,
      amenities: amenities,
      restRoom: data.restroom,
      restRoomDescription: data.restRoomDescription,
      additionalAmenities: data.additionalAmenities,
      poolLength: data.poolLength,
      poolWidth: data.poolWidth,
      shallowestPoint: data.shallowestPoint,
      deepestPoint: data.deepestPoint,
      poolPrice: data.poolPrice,
      maxGuests: data.maxGuests,
      extraGuestsPrice: data.extraGuestsPrice,
      forGuestsAfter: data.forGuestsAfter,
      location: location,
      poolImages: imageUrlList,
      userUID: UID,
      geoAddress: geoAddress,
      geoDisplayName: geoDisplayName,
    };

    await db
      .collection("pools")
      .add(storeObj)
      .then((docRef) => {
        db.collection("users")
          .doc(UID)
          .update({
            hostedPools: firebase.firestore.FieldValue.arrayUnion(docRef.id),
          });
      });

    history.push("/pools");
  };

  useEffect(() => {
    (async () => {
      const clientIp = await publicIp.v4();
      const response = await fetch(
        `http://api.ipstack.com/${clientIp}?access_key=a96ffdda54b7c15b38718048ad8579a4`
      );
      const clientLocation = await response.json();
      setCurrentLocation({
        lat: clientLocation.latitude,
        lng: clientLocation.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    let centerLocation;
    if (currentLocation) {
      centerLocation = [currentLocation.lng, currentLocation.lat];
    } else {
      centerLocation = [location.lng, location.lat];
    }
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: centerLocation,
      zoom: zoom,
    });

    const marker = new mapboxgl.Marker({}).setLngLat(centerLocation).addTo(map);

    map.on("move", () => {
      setLocation({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
      });
      setZoom(map.getZoom().toFixed(2));
      marker.setLngLat([
        map.getCenter().lng.toFixed(4),
        map.getCenter().lat.toFixed(4),
      ]);
    });

    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation]);

  useEffect(() => {
    const ele = document.querySelector(".lmMaya");
    if (!ele) return;
    if (open === false) {
      ele.style.visibility = "hidden";
    } else {
      ele.style.visibility = "visible";
    }
  }, [open]);

  useEffect(() => {
    (async () => {
      const firestoreUser = await getUserByEmail(user?.email);
      if (firestoreUser) {
        setUID(firestoreUser.uid);
      }
    })();
  }, [getUserByEmail, user?.email]);

  if (loading) {
    return <CustomClipLoader loading={loading} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center pb-12 sm:px-6 lg:px-8">
      <div>
        <h2
          style={{ fontSize: "3rem" }}
          className="mt-6 text-center font-semibold text-gray-900"
        >
          Become a Leisurpool Host!
        </h2>
        <p className="mt-2 text-center text-3xl text-gray-600">
          Fill this form to earn an extra income from your pool.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-12 px-6 shadow sm:rounded-lg sm:px-12">
            <SectionHeading headingText="Where is your pool located!" />
            <ListingFormInput
              labelFor="address"
              labelText="Enter Address"
              inputId="address"
              inputName="address"
              inputType="text"
              register={register}
              error={errors?.address}
            />
            <ListingFormTextArea
              labelFor="access_instructions"
              labelText="Special Access Instructions"
              inputId="access_instructions"
              inputName="access_instructions"
              register={register}
              error={errors?.access_instructions}
            />
          </div>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-12 px-6 shadow sm:rounded-lg sm:px-12">
            <SectionHeading headingText="Pool Name & Description" />
            <SectionSubHeading subHeadingText="Give your pool a creative name & description to help it stand it out in search results." />
            <ListingFormInput
              labelFor="poolName"
              labelText="Pool Name"
              inputId="poolName"
              inputName="poolName"
              inputType="text"
              register={register}
              error={errors?.poolName}
            />
            <ListingFormTextArea
              labelFor="poolDescription"
              labelText="Describe Your Pool & Swimming Area"
              inputId="poolDescription"
              inputName="poolDescription"
              register={register}
              error={errors?.poolDescription}
            />
          </div>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-12 px-6 shadow sm:rounded-lg sm:px-12">
            <SectionHeading headingText="Does your pool come with any amenities?" />
            <SectionSubHeading subHeadingText="Select all the following that apply" />
            <div className="grid sm:grid-cols-2 gap-4">
              <AmenityCheckBox
                inputName="amenity1"
                value="5OvNGFnsbAHCbMXFNuuc"
                register={register}
                label="Shower"
              />
              <AmenityCheckBox
                inputName="amenity2"
                value="5VvrOWxIHlR9S6aeSqMx"
                register={register}
                label="Additional Backyard"
              />
              <AmenityCheckBox
                inputName="amenity3"
                value="60xb7ziBHtTZRmagSYAW"
                register={register}
                label="Lunch Table"
              />
              <AmenityCheckBox
                inputName="amenity4"
                value="AUTkZE6FnuR4rnMMgN4J"
                register={register}
                label="Night Lighting"
              />
              <AmenityCheckBox
                inputName="amenity5"
                value="AlYFNyj6lQLyVJa6jab1"
                register={register}
                label="Kiddle Pool"
              />
              <AmenityCheckBox
                inputName="amenity6"
                value="BKMvBAvDOh1ZCsNppEJO"
                register={register}
                label="Parking"
              />
              <AmenityCheckBox
                inputName="amenity7"
                value="BsW5fDTd2kG5lA2G8R5T"
                register={register}
                label="BBQ Grill"
              />
              <AmenityCheckBox
                inputName="amenity8"
                value="CuzEX6s4EHoCJxq6FtmG"
                register={register}
                label="Deck"
              />
              <AmenityCheckBox
                inputName="amenity9"
                value="DH7CM1XfCB5zzt9ljJyG"
                register={register}
                label="Large Pool Area"
              />
              <AmenityCheckBox
                inputName="amenity10"
                value="EZNTQzl6AWfyI7s3ROfr"
                register={register}
                label="Sauna"
              />
              <AmenityCheckBox
                inputName="amenity12"
                value="HqHoJxg5yM9UvzGpoIRx"
                register={register}
                label="Diving Board"
              />
              <AmenityCheckBox
                inputName="amenity13"
                value="Ip1qo7c827B9kG4cw2U6"
                register={register}
                label="Changing Room"
              />
              <AmenityCheckBox
                inputName="amenity14"
                value="LvrZvcOMs9bxSARume2q"
                register={register}
                label="Large Shallow Area"
              />
              <AmenityCheckBox
                inputName="amenity15"
                value="MXwEiYvZfvWApS3l2TyH"
                register={register}
                label="Hot Tub"
              />
              <AmenityCheckBox
                inputName="amenity16"
                value="MvahejtuFr8nS0nl0hqH"
                register={register}
                label="Fire Pit"
              />
              <AmenityCheckBox
                inputName="amenity17"
                value="NOXC93CLhX58sDRwByBl"
                register={register}
                label="Pool Party Friendly"
              />
              <AmenityCheckBox
                inputName="amenity18"
                value="SChSkCIqpmsZPRArwQPj"
                register={register}
                label="Pool Toys"
              />
              <AmenityCheckBox
                inputName="amenity19"
                value="TIdrcWSQGs3ShfU3TONF"
                register={register}
                label="Basketball Court"
              />
              <AmenityCheckBox
                inputName="amenity20"
                value="Tjmn2hh3ggL83ITjtl3p"
                register={register}
                label="Tennis Court"
              />
              <AmenityCheckBox
                inputName="amenity21"
                value="WFSwaj8FtIQvJv2MH5cS"
                register={register}
                label="Wi-Fi Access"
              />
              <AmenityCheckBox
                inputName="amenity22"
                value="XdsU1KxVkh9xXkK22Mkd"
                register={register}
                label="Lounge Chairs"
              />
              <AmenityCheckBox
                inputName="amenity23"
                value="XhYOFp8JiOBM52Mi8c71"
                register={register}
                label="Sound System"
              />
              <AmenityCheckBox
                inputName="amenity24"
                value="ZVofpojSU2bgY8B69MAl"
                register={register}
                label="Handicap Access"
              />
              <AmenityCheckBox
                inputName="amenity25"
                value="aHRPHBc55jgureeiiMnI"
                register={register}
                label="Alcohol Friendly"
              />
              <AmenityCheckBox
                inputName="amenity26"
                value="j8LZ1j06JrEVLjiXBtXw"
                register={register}
                label="Bathroom"
              />
              <AmenityCheckBox
                inputName="amenity27"
                value="nhyYE688jc5p6wV1Lsjk"
                register={register}
                label="Volleyball Court"
              />
              <AmenityCheckBox
                inputName="amenity28"
                value="oyXqImGKFYTCrtvf7rG8"
                register={register}
                label="Heated Pool"
              />
              <AmenityCheckBox
                inputName="amenity29"
                value="qqUXItvopp1afeUfqPje"
                register={register}
                label="Water Slide"
              />
              <AmenityCheckBox
                inputName="amenity30"
                value="sIsvBiTclzNpEqrHibv8"
                register={register}
                label="Shade"
              />
              <AmenityCheckBox
                inputName="amenity31"
                value="tAs3lKDZpQ9KacXESHG3"
                register={register}
                label="Sitting Area"
              />
              <AmenityCheckBox
                inputName="amenity32"
                value="uQ9oUiBSMnL2aXBv2IKB"
                register={register}
                label="TV"
              />
              <AmenityCheckBox
                inputName="amenity33"
                value="uwonUHz7bNRn5mC7Vbwj"
                register={register}
                label="Salt Water"
              />
              <AmenityCheckBox
                inputName="amenity34"
                value="vetsJSJ3BoIzmqbMa2X2"
                register={register}
                label="Towels"
              />
              <AmenityCheckBox
                inputName="amenity35"
                value="wlYVT67HnLpy3tahxc4o"
                register={register}
                label="Dining Table"
              />
              <AmenityCheckBox
                inputName="amenity36"
                value="xnoTlvoPVUKIq2EWW0uD"
                register={register}
                label="Pet Friendly"
              />
              <AmenityCheckBox
                inputName="amenity37"
                value="yGXtj9ZP3pccVL6Sn4Uv"
                register={register}
                label="Great for Laps"
              />
              <AmenityCheckBox
                inputName="amenity38"
                value="z14027HY5n36yLbY5wFz"
                register={register}
                label="Playground"
              />
              <AmenityCheckBox
                inputName="amenity39"
                value="zXHtInxDhzqsByL3PtMT"
                register={register}
                label="Very sunny"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-12 px-6 shadow sm:rounded-lg sm:px-12">
            <SectionHeading headingText="Additional Amenities" />
            <SectionSubHeading subHeadingText="List additional things that renters may be interested in" />
            <h3 className="block text-2xl text-gray-700 font-semibold my-4 mt-8">
              Changing Room Or Restroom Access?
            </h3>
            <div className="flex items-center mr-4 mb-4">
              <input
                id="restroom1"
                type="radio"
                name="restroom"
                className="hidden"
                defaultValue="Yes"
                ref={register}
                defaultChecked
              />
              <label
                htmlFor="restroom1"
                className="flex items-center cursor-pointer text-3xl"
              >
                <span className="w-12 h-12 inline-block mr-4 rounded-full border border-gray-500 flex-no-shrink"></span>
                Yes
              </label>
            </div>
            <div className="flex items-center mr-4 mb-4">
              <input
                id="restroom2"
                type="radio"
                name="restroom"
                className="hidden"
                defaultValue="No"
                ref={register}
              />
              <label
                htmlFor="restroom2"
                className="flex items-center cursor-pointer text-3xl"
              >
                <span className="w-12 h-12 inline-block mr-4 rounded-full border border-gray-500 flex-no-shrink"></span>
                No
              </label>
            </div>
            <ListingFormTextArea
              labelFor="restRoomDescription"
              labelText="Describe Restroom / Changing Room"
              inputId="restRoomDescription"
              inputName="restRoomDescription"
              register={register}
              error={errors?.restRoomDescription}
            />
            <ListingFormTextArea
              labelFor="additionalAmenities"
              labelText="Additional Amenities"
              inputId="additionalAmenities"
              inputName="additionalAmenities"
              register={register}
              error={errors?.additionalAmenities}
            />
          </div>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-12 px-6 shadow sm:rounded-lg sm:px-12">
            <SectionHeading headingText="How big is your pool?" />
            <SectionSubHeading subHeadingText="Enter your pool's dimensions and depth in feet" />
            <h3 className="block text-2xl text-gray-700 font-semibold my-4 mt-8">
              Pool Area
            </h3>
            <NumberInput
              labelFor="poolLength"
              labelText="Length (ft.)"
              inputId="poolLength"
              inputName="poolLength"
              inputType="number"
              register={register}
              error={errors?.poolLength}
            />
            <NumberInput
              labelFor="poolWidth"
              labelText="Width (ft.)"
              inputId="poolWidth"
              inputName="poolWidth"
              inputType="number"
              register={register}
              error={errors?.poolWidth}
            />
            <h3 className="block text-2xl text-gray-700 font-semibold my-4 mt-12">
              Pool Depth
            </h3>
            <NumberInput
              labelFor="shallowestPoint"
              labelText="Shallowest Point (ft.)"
              inputId="shallowestPoint"
              inputName="shallowestPoint"
              inputType="number"
              register={register}
              error={errors?.shallowestPoint}
            />
            <NumberInput
              labelFor="deepestPoint"
              labelText="Deepest Point (ft.)"
              inputId="deepestPoint"
              inputName="deepestPoint"
              inputType="number"
              register={register}
              error={errors?.deepestPoint}
            />
          </div>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-12 px-6 shadow sm:rounded-lg sm:px-12">
            <SectionHeading headingText="Pricing & Guests" />
            <SectionSubHeading subHeadingText="Decide on your price for renting pool for hour & additional guests" />
            <h3 className="block text-2xl text-gray-700 font-semibold my-4 mt-8">
              Price
            </h3>
            <NumberInput
              labelFor="poolPrice"
              labelText="$ (per hour)"
              inputId="poolPrice"
              inputName="poolPrice"
              inputType="number"
              register={register}
              error={errors?.poolPrice}
            />
            <h3 className="block text-2xl text-gray-700 font-semibold my-4 mt-8">
              What Is Your Pools Maximum Capacity?
            </h3>
            <NumberInput
              labelFor="maxGuests"
              labelText="guests"
              inputId="maxGuests"
              inputName="maxGuests"
              inputType="number"
              register={register}
              error={errors?.maxGuests}
            />
            <h3 className="block text-2xl text-gray-700 font-semibold my-4 mt-8">
              Additional Fee For Extra Guests
            </h3>
            <NumberInput
              labelFor="extraGuestsPrice"
              labelText="$ (per hour)"
              inputId="extraGuestsPrice"
              inputName="extraGuestsPrice"
              inputType="number"
              register={register}
              error={errors?.extraGuestsPrice}
            />
            <h3 className="block text-2xl text-gray-700 font-semibold my-4 mt-8">
              Set Additonal Fee After
            </h3>
            <NumberInput
              labelFor="forGuestsAfter"
              labelText="guests"
              inputId="forGuestsAfter"
              inputName="forGuestsAfter"
              inputType="number"
              register={register}
              error={errors?.forGuestsAfter}
            />
          </div>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-12 px-6 shadow sm:rounded-lg sm:px-12">
            <SectionHeading headingText="Pool Location" />
            <SectionSubHeading subHeadingText="Your pool location will help the renter make a better decision" />
            <h3 className="block text-2xl text-gray-700 font-semibold my-4 mt-8">
              Select Your Pool Location Below
            </h3>
            <div style={{ height: "500px" }} className="relative">
              <div className="sidebar">
                Longitude: {location.lng} <br /> Latitude: {location.lat} <br />
                Zoom: {zoom}
              </div>
              <div className="map-container" ref={mapContainer} />
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-12 px-6 shadow sm:rounded-lg sm:px-12">
            <SectionHeading headingText="Pool Images" />
            <SectionSubHeading subHeadingText="Upload images of your pool" />
            <MultiImageInput
              images={images}
              setImages={setImages}
              theme="light"
              allowCrop={false}
              max={10}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-2xl font-medium text-white bg-color-primary hover:color-primary focus:outline-none"
          >
            Submit Pool
          </button>
        </div>
      </form>
    </div>
  );
}

function SectionHeading(props) {
  const { headingText } = props;

  return (
    <h3 style={{ fontSize: "2.1rem" }} className="font-semibold text-center">
      {headingText}
    </h3>
  );
}

function SectionSubHeading(props) {
  const { subHeadingText } = props;

  return (
    <p
      style={{ fontSize: "1.5rem" }}
      className="text-center my-2 text-gray-500"
    >
      {subHeadingText}
    </p>
  );
}

function ListingFormInput(props) {
  const { labelFor } = props;
  const { labelText } = props;

  const { inputId } = props;
  const { inputName } = props;
  const { inputType } = props;

  const { register } = props;
  const { error } = props;

  return (
    <div className="mt-10">
      <label
        style={{ fontSize: "1.5rem" }}
        htmlFor={labelFor}
        className="block text-xl font-medium text-gray-700"
      >
        {labelText}
      </label>
      <div className="mt-3">
        <input
          style={{ backgroundColor: "#f0f0f0" }}
          id={inputId}
          name={inputName}
          type={inputType}
          className={`appearance-none block w-full px-3 py-4 border-transparent rounded-md shadow placeholder-gray-400 focus:outline-none text-2xl`}
          ref={register}
        />
        {error && (
          <div className="text-red-500 font-bold mt-3 text-xl">
            {error?.message}
          </div>
        )}
      </div>
    </div>
  );
}

function ListingFormTextArea(props) {
  const { labelFor } = props;
  const { labelText } = props;

  const { inputId } = props;
  const { inputName } = props;

  const { register } = props;
  const { error } = props;

  return (
    <div className="mt-10">
      <label
        style={{ fontSize: "1.5rem" }}
        htmlFor={labelFor}
        className="block text-xl font-medium text-gray-700"
      >
        {labelText}
      </label>
      <div className="mt-3">
        <textarea
          style={{ backgroundColor: "#f0f0f0", resize: "none" }}
          name={inputName}
          id={inputId}
          rows="6"
          className="appearance-none block w-full px-3 py-4 border-transparent rounded-md shadow placeholder-gray-400 focus:outline-none text-2xl"
          ref={register}
        ></textarea>
        {error && (
          <div className="text-red-500 font-bold mt-3 text-xl">
            {error?.message}
          </div>
        )}
      </div>
    </div>
  );
}

function AmenityCheckBox(props) {
  const { label } = props;

  const { inputName } = props;
  const { value } = props;

  const { register } = props;

  return (
    <label className="flex items-center mt-6">
      <input
        type="checkbox"
        className="form-checkbox h-8 w-8 text-blue-600"
        name={inputName}
        ref={register}
        value={value}
      />
      <span className="ml-4 text-2xl">{label}</span>
    </label>
  );
}

function NumberInput(props) {
  const { labelFor } = props;
  const { labelText } = props;

  const { inputId } = props;
  const { inputName } = props;
  const { inputType } = props;

  const { register } = props;
  const { error } = props;

  return (
    <div className="mt-8">
      <div>
        <input
          style={{ backgroundColor: "#f0f0f0" }}
          id={inputId}
          name={inputName}
          type={inputType}
          className={`appearance-none inline-block w-36 px-3 py-4 border-transparent rounded-md shadow placeholder-gray-400 focus:outline-none text-2xl`}
          ref={register}
        />
        <label
          style={{ fontSize: "1.5rem" }}
          htmlFor={labelFor}
          className="ml-4 text-xl font-medium text-gray-700"
        >
          {labelText}
        </label>
      </div>
      {error && (
        <div className="text-red-500 font-bold mt-3 text-xl">
          {error?.message}
        </div>
      )}
    </div>
  );
}
