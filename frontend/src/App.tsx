import { Events, Login } from "./components";
import styled from "@emotion/styled";
import { useAuthentication } from "./hooks";
import { CircularProgress, Stack } from "@mui/material";

const Container = styled.div`
  height: 100vh;
  background: ${({ theme }: any) => theme.palette.background.default};
  color: ${({ theme }: any) => theme.palette.text.primary};
  display: flex;
  justify-content: center;
`;

const App = () => {
  const {
    isAuthenticated,
    isTokenVerifyLoading,
    isTokenVerifySuccess,
    isGoogleLoginLoading,
  } = useAuthentication();

  return (
    <Container>
      {(isTokenVerifyLoading || isGoogleLoginLoading) && (
        <Stack justifyContent="center">
          <CircularProgress />
        </Stack>
      )}

      {isAuthenticated && isTokenVerifySuccess && <Events />}

      {!isAuthenticated && <Login />}
    </Container>
  );
};

export default App;
