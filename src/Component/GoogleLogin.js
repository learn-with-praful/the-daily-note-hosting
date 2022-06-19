import React, { useEffect } from "react";
import { setUserInfoToLocal } from "Utils/Utils";

export default function GoogleLogin() {
  const handleGoogleLogin = () => {
    window?.gapi?.load("client", (data) => {
      window.gapi?.client
        .init({
          apiKey: "AIzaSyBz9UU61F-hDZ3IUOPNWia7m7MsHz_YCSM",
          clientId:
            "860177916832-b11arhgj8j7kjm1ph7nrvvnd6u7tnnck.apps.googleusercontent.com",
          scope: [
            // See, edit, create, and delete all of your Google Drive files
            "https://www.googleapis.com/auth/drive",

            // See, edit, create, and delete only the specific Google Drive files you use with this app
            "https://www.googleapis.com/auth/drive.file",

            // See and download all your Google Drive files
            "https://www.googleapis.com/auth/drive.readonly",

            // See, edit, create, and delete all your Google Sheets spreadsheets
            "https://www.googleapis.com/auth/spreadsheets",

            // See all your Google Sheets spreadsheets
            "https://www.googleapis.com/auth/spreadsheets.readonly",
          ].join(" "),

          discoveryDocs: [
            "https://sheets.googleapis.com/$discovery/rest?version=v4",
            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
          ],

          // discoveryDocs: [
          //   "https://sheets.googleapis.com/$discovery/rest?version=v4",
          // ],

          // scope: [
          //   // See, edit, create, and delete all of your Google Drive files
          //   "https://www.googleapis.com/auth/drive",

          //   // See, edit, create, and delete only the specific Google Drive files you use with this app
          //   "https://www.googleapis.com/auth/drive.file",

          //   // See and download all your Google Drive files
          //   "https://www.googleapis.com/auth/drive.readonly",

          //   // See, edit, create, and delete all your Google Sheets spreadsheets
          //   "https://www.googleapis.com/auth/spreadsheets",

          //   // See all your Google Sheets spreadsheets
          //   "https://www.googleapis.com/auth/spreadsheets.readonly",
          // ],

          // 'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
          // discoveryDocs: [
          //   "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
          // ],

          // discoveryUrl: [
          //   "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
          // ],
          // This is not working

          // scopes: [
          //   // "https://www.googleapis.com/auth/admin.directory.user",
          //   "https://www.googleapis.com/auth/userinfo.email",
          // ],
        })
        .then(function () {
          console.log("inside main");
          let GoogleAuth = window.gapi.auth2.getAuthInstance();
          // Listen for sign-in state changes.
          // GoogleAuth.isSignedIn.listen((isSignedIn) => {
          //   console.log("isSignedIn", isSignedIn);
          //   if (isSignedIn) {
          //     var user = GoogleAuth.currentUser.get();
          //     let token = user.xc.access_token;
          //     console.log("token", token);
          //     console.log("GoogleAuth", GoogleAuth);
          //     console.log("test1", GoogleAuth.isSignedIn.get());
          //     console.log("user", user);

          //     // fetch(
          //     //   "https://people.googleapis.com/v1/people/me?personFields=photos",
          //     //   {
          //     //     method: "GET",
          //     //     Authorization: "Bearer " + token,
          //     //   }
          //     // ).then((res) => {
          //     //   console.log("Res", res);
          //     // });

          //     fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
          //       method: "get",
          //       headers: new Headers({
          //         Authorization: "Bearer " + token,
          //         // 'Content-Type': 'application/x-www-form-urlencoded'
          //       }),
          //       // body: "A=1&B=2",
          //     }).then((res) => {
          //       console.log("Res", res);
          //     });

          //     // fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
          //     //   method: "GET",
          //     //   Authorization: "Bearer " + token,
          //     // }).then((res) => {
          //     //   console.log("Res", res);
          //     // });

          //     // var request = gapi.client.request({
          //     //   method: "GET",
          //     //   path: "/drive/v3/about",
          //     //   params: { fields: "user" },
          //     // });
          //     // // Execute the API request.
          //     // request.execute(function (response) {
          //     //   console.log("response", response);
          //     // });
          //   }
          // });
          console.log("riched");

          GoogleAuth.signIn().then((res) => {
            console.log("res", res);
            console.log("basicProfile", res.getBasicProfile());

            console.log("current user ifo,", GoogleAuth.currentUser.get());

            console.log("item1", res);
            setUserInfoToLocal(res);
            const basicProfile = res.getBasicProfile();
            const authResponse = res.getAuthResponse(true);
            res.tokenId = authResponse.id_token;
            res.googleId = basicProfile.getId();
            res.tokenObj = authResponse;
            res.accessToken = authResponse.access_token;
            res.profileObj = {
              googleId: basicProfile.getId(),
              imageUrl: basicProfile.getImageUrl(),
              email: basicProfile.getEmail(),
              name: basicProfile.getName(),
              givenName: basicProfile.getGivenName(),
              familyName: basicProfile.getFamilyName(),
            };
            console.log("Final Res", res);

            fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
              method: "get",
              headers: new Headers({
                Authorization: "Bearer " + res.accessToken,
                // 'Content-Type': 'application/x-www-form-urlencoded'
              }),
              // body: "A=1&B=2",
            })
              .then((res) => {
                res.json();
              })

              .then((res) => {
                console.log("Res", res);
              });
          });

          // 3. Initialize and make the API request.
          // console.log("gapi", gapi.client);
          // return gapi.client.request({
          //   path: "https://people.googleapis.com/v1/people/me",
          // });
        })
        // .then(
        //   function (response) {
        //     console.log("error", response.result);
        //   },
        //   function (reason) {
        //     console.log("Error: " + reason?.result?.error?.message);
        //   }
        // )
        .catch((error) => {
          console.log("errro", error);
        });
    });
  };

  const singOut = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log("User signed out.");
    });
  };

  const signOutMethod2 = () => {
    window.gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(function () {
        console.log("User signed out.");
      });
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Sign in with google</button>
      <button onClick={singOut}>Sign out from google</button>
      <button onClick={signOutMethod2}>signOutMethod2</button>
    </div>
  );
}
