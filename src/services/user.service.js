import firebaseService from "./firebase.service";

const { firestore: db } = firebaseService;
const usersRef = db.collection("users");

const createNewUser = (data) => {
  return usersRef.add(data);
};

const getExistingUserByEmail = async (email) => {
  let doesEmailExist;
  const snap = await usersRef.get();
  for (let i in snap.docs) {
    const doc = snap.docs[i];
    const data = doc.data();
    doesEmailExist = data.email === email;
    if (doesEmailExist) break;
  }
  return doesEmailExist;
};

const getUserByEmail = async (email) => {
  const snap = await usersRef.get();
  for (let i in snap.docs) {
    const doc = snap.docs[i];
    const data = doc.data();
    if (data.email === email) {
      return { uid: doc.id, ...data };
    }
  }
};

const userService = {
  createNewUser,
  getExistingUserByEmail,
  getUserByEmail,
};

export default userService;
