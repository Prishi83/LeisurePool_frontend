export function useLoggedUser(user) {
  const isEmailVerified = user?.emailVerified;
  const isProviderFacebook =
    user?.providerData[0].providerId === "facebook.com";

  return user && (isEmailVerified || isProviderFacebook);
}
