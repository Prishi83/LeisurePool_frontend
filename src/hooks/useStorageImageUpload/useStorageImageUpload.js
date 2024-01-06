import { useState } from "react";
import { useFirebase } from "../../context/firebase-context";

export default function useStorageImageUpload() {
  const { storage } = useFirebase();

  const [state, setState] = useState({
    url: null,
    loading: null,
    error: null,
  });

  const uploadImage = async (image, folderPath) => {
    return new Promise((resolve, reject) => {
      const uploadTask = storage.ref(`${folderPath}/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        () => {
          setState({
            url: null,
            loading: true,
            error: null,
          });
        },
        (error) => {
          setState({
            url: null,
            loading: null,
            error: error,
          });
          reject(error);
        },
        () => {
          storage
            .ref(folderPath)
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setState({
                url: url,
                loading: null,
                error: null,
              });
              resolve(url);
            });
        }
      );
    });
  };

  return [state.url, state.loading, state.error, uploadImage];
}
