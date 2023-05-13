import { FormEvent, useEffect } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import { GoogleLogin } from "..";
import { useAuthentication } from "../../hooks";
import { Credentials } from "../../types";
import { useNavigate } from "react-router-dom";

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

export const Login = () => {
  const {
    login,
    isLoginLoading,
    loginError,
    isAuthenticated,
    isTokenVerifySuccess,
  } = useAuthentication();
  const navigate = useNavigate();
  const formFields = ["email", "password"];

  useEffect(() => {
    if (isAuthenticated && isTokenVerifySuccess) navigate("/dashboard");
  }, [navigate, isAuthenticated, isTokenVerifySuccess]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = event.currentTarget;
    const credentials: Credentials = {
      email: email.value,
      password: password.value,
    };

    login(credentials);
  };

  const isServerError = (errorFields: any = {}) => {
    return Object.keys(errorFields).some(
      (field) => !formFields.includes(field)
    );
  };

  return (
    <Container>
      {isServerError(loginError?.response?.data) &&
        Object.entries(loginError?.response?.data || {}).map(
          ([errorKey, errorValue]: any) => (
            <Alert sx={{ width: 420, mb: 2 }} severity="error">
              <AlertTitle>{errorKey}</AlertTitle>
              {errorValue}
            </Alert>
          )
        )}

      <Form onSubmit={handleSubmit}>
        <TextField
          name="email"
          margin="dense"
          label="Email"
          error={!!loginError?.response?.data.email}
          helperText={loginError?.response?.data.email}
        />

        <TextField
          name="password"
          margin="dense"
          label="Password"
          error={!!loginError?.response?.data.password}
          helperText={loginError?.response?.data.password}
        />

        <Button
          size="large"
          disabled={isLoginLoading}
          variant="contained"
          sx={{ mt: 4 }}
          type="submit"
        >
          {isLoginLoading ? "Login..." : "Login"}
        </Button>
      </Form>

      <Box sx={{ mt: 4, mb: 4 }}>
        <Divider>Or</Divider>
      </Box>

      <GoogleLogin />
    </Container>
  );
};
