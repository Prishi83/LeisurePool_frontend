import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFirebase } from "../../context/firebase-context";
import useStorageImageUpload from "../../hooks/useStorageImageUpload/useStorageImageUpload";
import CustomClipLoader from "./../CustomClipLoader/CustomClipLoader";

export default function UpdateProfile(props) {
  const { UID } = props;
  const { firestore: db } = useFirebase();
  const { previewImage, setIsUserNew } = props;
  const [image, setImage] = useState(previewImage);
  const [selectedFile, setSelectedFile] = useState();
  const [, loading, error, uploadImage] = useStorageImageUpload();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImage(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  function handleImageChange(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  }

  const onSubmit = async (data) => {
    if (data.profileImage.length === 1) {
      const result = await uploadImage(data.profileImage[0], "profile-images");
      db.collection("users").doc(UID).update({ photoURL: result });
      if (data.bio) {
        db.collection("users").doc(UID).update({ bio: data.bio });
      }
      updateProfile();
      setIsUserNew(false);
    } else if (data.profileImage.length === 0) {
      if (data.bio) {
        db.collection("users").doc(UID).update({ bio: data.bio });
      }
      updateProfile();
      setIsUserNew(false);
    }
  };

  function updateProfile() {
    db.collection("users").doc(UID).update({ newUser: false });
  }

  if (loading) {
    return <CustomClipLoader loading={loading} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center pb-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-12 px-6 shadow sm:rounded-lg sm:px-12">
          <img
            className="mx-auto block w-56 rounded-full"
            src={image}
            alt="User Profile"
          />
          <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center my-10">
              <label
                htmlFor="profileImage"
                className="bg-color-secondary text-white"
                style={{
                  padding: "15px 20px",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Edit Profile Image
              </label>
              <input
                ref={register}
                type="file"
                id="profileImage"
                name="profileImage"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <textarea
                ref={register}
                name="bio"
                id="bio"
                rows="4"
                placeholder="Please tell us about yourself."
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none border-gray-400"
                style={{ fontSize: "18px" }}
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-2xl font-medium text-white bg-color-primary hover:color-primary focus:outline-none"
              >
                Update Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  updateProfile();
                  setIsUserNew(false);
                }}
                className=" mt-6 w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-2xl font-medium text-white bg-color-secondary hover:color-primary focus:outline-none"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
