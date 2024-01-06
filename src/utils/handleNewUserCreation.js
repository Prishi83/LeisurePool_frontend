import userService from "./../services/user.service";

export default function handleNewUserCreation(providerType, user) {
  const { createNewUser } = userService;

  let dataObj;

  if (providerType === "custom") {
    dataObj = {
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      newUser: true,
    };

    return createNewUser(dataObj);
  } else if (providerType === "google") {
    dataObj = {
      firstName: user.given_name,
      lastName: user.family_name,
      displayName: user.name,
      email: user.email,
      photoURL: user.picture,
      newUser: true,
    };

    return createNewUser(dataObj);
  } else if (providerType === "facebook") {
    dataObj = {
      firstName: user.first_name,
      lastName: user.last_name,
      displayName: user.name,
      email: user.email,
      photoURL: user.picture.data.url,
      newUser: true,
    };

    return createNewUser(dataObj);
  }
}
