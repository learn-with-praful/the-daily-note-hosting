import moment from "moment";

export const setUserInfoToLocal = (authInstance = {}) => {
  console.log("authInstance", authInstance);
  window.authInstance = authInstance;
  const basicProfile = authInstance?.getBasicProfile();
  const authResponse = authInstance?.getAuthResponse(true);
  authInstance.tokenId = authResponse?.tokenId;
  authInstance.googleId = basicProfile?.getId();
  authInstance.tokenObj = authResponse;
  authInstance.accessToken = authResponse?.access_token;
  authInstance.profileObj = {
    googleId: basicProfile.getId(),
    imageUrl: basicProfile.getImageUrl(),
    email: basicProfile.getEmail(),
    name: basicProfile.getName(),
    givenName: basicProfile.getGivenName(),
    familyName: basicProfile.getFamilyName(),
  };
  window.localStorage.setItem("user", JSON.stringify(authInstance));
  return authInstance;
};

export const getUserInfoFromLocalStorage = () => {
  let userInfo = window.localStorage.getItem("user");
  userInfo = JSON.parse(userInfo);
  return userInfo;
};

export const pastDateGenerator = (days) => {
  let dates = [];
  for (let i = days; i > 0; i--) {
    let date = moment();
    date.subtract(i - 2, "day").format("DD-MM-YYYY");
    dates.push(date);
  }

  // TODO: remove this
  console.log("dates", dates);
  window.praful = dates;

  return dates;
};

// pastDateGenerator(5);
