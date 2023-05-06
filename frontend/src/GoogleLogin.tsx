import { useEffect } from "react";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_SCOPES,
  GOOGLE_REDIRECT_URI,
  GOOGLE_RESPONSE_TYPE,
  GOOGLE_OAUTH_ENDPOINT,
} from "./config";
import "./GoogleLogin.css";
import { Button } from "@mui/material";
import { ReactComponent as GoogleIcon } from "./assets/google-icon.svg";
import { useAuthentication } from "./hooks";

export const GoogleLogin = () => {
  const { googleLogin } = useAuthentication();
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const handleGoogleOauth = () => {
    // Check out google oauth2 docs for more in depth
    // https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow

    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", GOOGLE_OAUTH_ENDPOINT);

    var params = {
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: GOOGLE_RESPONSE_TYPE,
      scope: GOOGLE_SCOPES,
    };

    for (var p in params) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      // @ts-ignore
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    if (code) googleLogin({ code });
    // eslint-disable-next-line
  }, [code]);

  return (
    <Button size="large" onClick={handleGoogleOauth} startIcon={<GoogleIcon />}>
      Continue with Google
    </Button>
  );
};
