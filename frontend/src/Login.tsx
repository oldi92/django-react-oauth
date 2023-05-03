import { FormEvent, useState } from "react";
import "./App.css";
import { Alert, Button, Divider, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { GoogleLogin } from "./GoogleLogin";
import { userModuleRpc } from "./services";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

interface Props {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = event.currentTarget;

    try {
      setLoading(true);
      setError("");

      const body = {
        email: email.value,
        password: password.value,
      };

      await userModuleRpc.login(body);

      onLoginSuccess();
    } catch (error: any) {
      setError(error.non_field_errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 400 }}>
      <GoogleLogin />

      <Divider sx={{ mt: 4, mb: 4 }}>Or</Divider>

      {!!error && (
        <Alert sx={{ width: 420, mb: 2 }} severity="error">
          {error}
        </Alert>
      )}

      <Form onSubmit={handleLogin}>
        <TextField name="email" margin="dense" label="Email" />
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
