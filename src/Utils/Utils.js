import { makeStyles } from "@mui/styles";
import theme from "theme";

export const setUserInfoToLocal = (authInstance) => {
  console.log("authInstance", authInstance);
  window.authInstance = authInstance;
  const basicProfile = authInstance.getBasicProfile();
  const authResponse = authInstance.getAuthResponse(true);
  authInstance.tokenId = authResponse.id_token;
  authInstance.googleId = basicProfile.getId();
  authInstance.tokenObj = authResponse;
  authInstance.accessToken = authResponse.access_token;
  authInstance.profileObj = {
    googleId: basicProfile.getId(),
    imageUrl: basicProfile.getImageUrl(),
    email: basicProfile.getEmail(),
    name: basicProfile.getName(),
    givenName: basicProfile.getGivenName(),
    familyName: basicProfile.getFamilyName(),
  };
  console.log("authInstance", authInstance);
  window.localStorage.setItem("user", JSON.stringify(authInstance));
  return authInstance;
};

export const getUserInfoFromLocalStorage = () => {
  let userInfo = window.localStorage.getItem("user");
  userInfo = JSON.parse(userInfo);
  return userInfo;
};

export const generateStyle = (styleObj, styleParams = {}) => {
  return makeStyles(() => styleObj(theme))(styleParams);
};
