import { FormEvent, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import { GoogleLogin } from "./GoogleLogin";
import { userModuleRpc } from "./services";

const Container = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

interface Props {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>({});
  const formFields = ["email", "password"];

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
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const isServerError = (errorFields: any) => {
    return Object.keys(errorFields).some(
      (field) => !formFields.includes(field)
    );
  };

  return (
    <Container>
      {isServerError(error) &&
        Object.entries(([errorKey, errorValue]: any) => (
          <Alert sx={{ width: 420, mb: 2 }} severity="error">
            <AlertTitle>{errorKey}</AlertTitle>
            {errorValue}
          </Alert>
        ))}

      <Form onSubmit={handleLogin}>
        <TextField
          name="email"
          margin="dense"
          label="Email"
          error={!!error.email}
          helperText={error.email}
        />

        <TextField
          name="password"
          margin="dense"
          label="Password"
          error={!!error.password}
          helperText={error.password}
        />

        <Button
          size="large"
          disabled={loading}
          variant="contained"
          sx={{ mt: 4 }}
          type="submit"
        >
          {loading ? "Login..." : "Login"}
        </Button>
      </Form>

      <Box sx={{ mt: 4, mb: 4 }}>
        <Divider>Or</Divider>
      </Box>

      <GoogleLogin />
    </Container>
  );
};
export default Login;
