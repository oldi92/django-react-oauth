import { useEffect } from "react";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_PROFILE_SCOPE,
  GOOGLE_CALENDAR_SCOPE,
  GOOGLE_REDIRECT_URI,
  GOOGLE_RESPONSE_TYPE,
  GOOGLE_OAUTH_ENDPOINT,
} from "../../config";
import { Button } from "@mui/material";
import { ReactComponent as GoogleIcon } from "../../assets/google-icon.svg";
import { useAuthentication } from "../../hooks";
import { useSearchParams } from "react-router-dom";

interface Props {
  variant?: "login" | "calendar";
  redirectUri?: string;
  loading?: boolean;
  onOauthSuccess?: (code: string) => void;
}

export const GoogleLogin = ({
  variant = "login",
  loading,
  redirectUri = GOOGLE_REDIRECT_URI,
  onOauthSuccess,
}: Props) => {
  const { googleLogin } = useAuthentication();
  let [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");

  const handleGoogleOauth = () => {
    // Check out google oauth2 docs for more in depth
    // https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow

    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", GOOGLE_OAUTH_ENDPOINT);

    var params = {
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: GOOGLE_RESPONSE_TYPE,
      scope: GOOGLE_PROFILE_SCOPE + GOOGLE_CALENDAR_SCOPE,
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
    if (code) {
      if (onOauthSuccess) {
        onOauthSuccess(code);
      } else {
        googleLogin({ code });
      }
    }
    setSearchParams();
    // eslint-disable-next-line
  }, [code]);

  return variant === "login" ? (
    <Button
      size="large"
      disabled={loading}
      onClick={handleGoogleOauth}
      startIcon={<GoogleIcon />}
    >
      {loading ? "Logging..." : "Continue with Google"}
    </Button>
  ) : (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      onClick={handleGoogleOauth}
    >
      {loading ? "Connecting..." : "Connect"}
    </Button>
  );
};
