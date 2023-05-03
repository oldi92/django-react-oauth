import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  Link,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import { CLIENT_ID, CLIENT_SECRET, DOMAIN } from "./config";
import Users from "./Users";
// import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
// import GoogleLogin from "react-google-login";
import { GoogleLogin } from "./GoogleLogin";
import { userModuleRpc } from "./services";

const clientId =
  "481802958488-49fhrkir8j0jri6940p4gjjd081dcl85.apps.googleusercontent.com";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

interface Credentials {
  username: string;
  password: string;
  grant_type?: string;
}

interface Props {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async ({ username, password }: Credentials) => {
    try {
      setLoading(true);
      setError("");

      const body = {
        username,
        password,
      };

      const response = userModuleRpc.login(body);
      // const response = await axios.post(
      //   DOMAIN + "authentication/dj-rest-auth/login/",
      //   body
      // );

      console.log("RESPONSE ", response);
      // localStorage.setItem("token", JSON.stringify(response.data));
      //   setIsAuthenticated(true);
      onLoginSuccess();
    } catch (error: any) {
      setError(error.response.data.error_description);
      console.log("ERROR ", error.response.data.error_description);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = event.currentTarget;
    // const username = target.username.value;
    // const password = target.password.value;

    console.log(username.value, password.value);
    login({
      username: username.value,
      password: password.value,
    });
  };

  return (
    <div style={{ width: 400 }}>
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log("RESPONSE", credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      /> */}

      <GoogleLogin />

      {/* <Button variant="contained" onClick={() => {}}>
        Login with google
      </Button> */}

      {/* <GoogleLogin
        clientId="481802958488-49fhrkir8j0jri6940p4gjjd081dcl85.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
      /> */}

      <Divider sx={{ mt: 4, mb: 4 }}>Or</Divider>
      {!!error && (
        <Alert sx={{ width: 420 }} severity="error">
          {error}
        </Alert>
      )}
      <Form onSubmit={handleLogin}>
        <TextField name="username" margin="dense" label="Username" />
        <TextField name="password" margin="dense" label="Password" />
        <Button
          disabled={loading}
          variant="contained"
          sx={{ mt: 4 }}
          type="submit"
        >
          {loading ? "Login..." : "Login"}
        </Button>
      </Form>
    </div>
  );
};
export default Login;
