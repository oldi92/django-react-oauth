import { useState, useEffect } from "react";
import { gapi, loadAuth2 } from "gapi-script";

import { CLIENT_ID, CLIENT_SECRET, DOMAIN } from "./config";
// import { UserCard } from "./UserCard";
import "./GoogleLogin.css";
import { Button } from "@mui/material";
import axios from "axios";
const clientId =
  "481802958488-49fhrkir8j0jri6940p4gjjd081dcl85.apps.googleusercontent.com";
const SCOPES =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid";

export const GoogleLogin = () => {
  const [user, setUser] = useState<any>(null);
  const [googleTrigger, setGoogleTrigger] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  useEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(gapi, clientId, SCOPES);
      attachSignin(document.getElementById("customBtn"), auth2);
      //   if (auth2.isSignedIn.get()) {
      //     updateUser(auth2.currentUser.get());
      //   } else {
      //     attachSignin(document.getElementById("customBtn"), auth2);
      //   }
    };
    setAuth2();
  }, []);

  useEffect(() => {
    if (!user) {
      const setAuth2 = async () => {
        const auth2 = await loadAuth2(gapi, clientId, SCOPES);
        attachSignin(document.getElementById("customBtn"), auth2);
      };
      setAuth2();
    }
  }, [user]);

  const updateUser = (currentUser: any) => {
    console.log(currentUser);
    const name = currentUser.getBasicProfile().getName();
    const email = currentUser.getBasicProfile().getEmail();
    const profileImg = currentUser.getBasicProfile().getImageUrl();
    const idToken = currentUser.xc.id_token;
    setUser({
      name: name,
      email: email,
      profileImg: profileImg,
      idToken,
    });
  };

  const attachSignin = (element: any, auth2: any) => {
    auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        //   {
        //     "access_token": "EPEXWYZKWuJB7pDRtYG0myUvJHzj6E",
        //     "expires_in": 36000,
        //     "token_type": "Bearer",
        //     "scope": "read write groups",
        //     "refresh_token": "CJIhgd2riebowLIe6MrB5kOrrN7LjG"
        // }

        console.log("GOOGLE USER ", googleUser.getAuthResponse());
        const { access_token, expires_in, token_type, scope, id_token } =
          googleUser.getAuthResponse();

        console.log("ID TOKEN ", id_token);

        axios
          .post("http://localhost:8000/authentication/google-login/", {
            access_token: id_token,
          })
          .then((response) => {
            console.log("GOOGLE LOGIN SUCCESS ", response);
          })
          .catch((error) => {
            console.log("GOOGLE LOGIN ERROR ", error);
          });

        // localStorage.setItem(
        //   "token",
        //   JSON.stringify({ access_token, expires_in, token_type, scope })
        // );

        updateUser(googleUser);
      },
      (error: any) => {
        console.log(JSON.stringify(error));
      }
    );
  };

  //   const signOut = () => {
  //     const auth2 = gapi.auth2.getAuthInstance();
  //     auth2.signOut().then(() => {
  //       setUser(null);
  //       console.log("User signed out.");
  //     });
  //   };

  //   if (user) {
  //     return (
  //       <div className="container">
  //         <UserCard user={user} />
  //         <div id="" className="btn logout" onClick={signOut}>
  //           Logout
  //         </div>
  //       </div>
  //     );
  //   }

  const loginV2 = () => {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      client_id:
        "481802958488-ktubea2a00p61qfk2r29plik2947nl3g.apps.googleusercontent.com",
      redirect_uri: "http://localhost:3000",
      response_type: "code",

      // scope: "https://www.googleapis.com/auth/calendar",
      scope: SCOPES,
      // include_granted_scopes: "true",
      // state: "pass-through value",
    };

    //accounts.google.com/o/oauth2/v2/auth?redirect_uri=<CALLBACK_URL_YOU_SET_ON_GOOGLE>&prompt=consent&response_type=code&client_id=<YOUR

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      // @ts-ignore
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  };

  const loginV3 = () => {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      client_id: clientId,
      redirect_uri: "http://localhost:3000",
      response_type: "token",
      scope: SCOPES,
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      // @ts-ignore
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // const code = params.get("code");
    const token_type = params.get("token_type");
    const expires_in = params.get("expires_in");
    const scope = params.get("scope");

    // V3
    const access_token = params.get("access_token");
    const id_token = params.get("id_token");

    console.log("*************");
    console.log("CODE ", code);
    console.log("*************");
    console.log("PARAMS ", params);
    console.log("ACCESS_TOKEN ", access_token);
    console.log("id_token ", id_token);

    if (code && !googleTrigger) {
      axios
        .post("http://localhost:8000/authentication/google-login/", {
          code,
        })
        .then((response) => {
          console.log("GOOGLE LOGIN SUCCESS ", response);
        })
        .catch((error) => {
          console.log("GOOGLE LOGIN ERROR ", error);
        });

      setGoogleTrigger(true);
    }

    // http://localhost:8000/authentication/google-login
  }, [code, googleTrigger]);

  return (
    <div className="container">
      <div id="customBtn" className="btn login">
        Login
      </div>

      <Button onClick={loginV2}>Login with google v2</Button>
      {/* <a
        href={`https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=481802958488-ktubea2a00p61qfk2r29plik2947nl3g.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=profile&response_type=code&state=eBeK5Z0f3E3J&service=lso&o2v=2&flowName=GeneralOAuthFlow`}
      >
        Login with google v2
      </a> */}
    </div>
  );
};
