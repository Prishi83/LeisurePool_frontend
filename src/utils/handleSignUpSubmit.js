import handleNewUserCreation from "./handleNewUserCreation";

export default async function handleSignUpSubmit(
  auth,
  data,
  createUserWithEmailAndPassword
) {
  const fullName = `${data.firstName} ${data.lastName}`;
  const email = data.email;
  const password = data.password;
  const profileImage = `https://ui-avatars.com/api/?background=FFAB91&name=${data.firstName}+${data.lastName}`;

  await createUserWithEmailAndPassword(email, password);
  await auth.currentUser?.updateProfile({
    displayName: fullName,
    photoURL: profileImage,
  });
  if (auth.currentUser) {
    const result = auth.currentUser?.providerData[0];
    const firstName = data.firstName;
    const lastName = data.lastName;
    const user = { ...result, firstName, lastName };
    await handleNewUserCreation("custom", user);
  }
}
