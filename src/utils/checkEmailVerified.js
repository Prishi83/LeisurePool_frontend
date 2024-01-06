export default function checkEmailVerified(user) {
  if (!user) return null;
  const provider = user.providerData[0].providerId;
  if (provider !== "password") return null;
  if (user.emailVerified) {
    return null;
  } else {
    return { message: "Verify+your+email+first+then+login." };
  }
}
