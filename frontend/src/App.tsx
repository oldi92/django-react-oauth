import Login from "./Login";
import { Events } from "./components";
import styled from "@emotion/styled";
import { useAuthentication } from "./hooks";

const Container = styled.div`
  height: 100vh;
  background: ${({ theme }: any) => theme.palette.background.default};
  color: ${({ theme }: any) => theme.palette.text.primary};
  display: flex;
  justify-content: center;
`;

const App = () => {
  const { isAuthenticated } = useAuthentication();

  console.log("IS AUTH IN APP ", isAuthenticated);

  return (
    <Container>
      {/* {isAuthenticatedLoading && <CircularProgress />} */}

      {isAuthenticated ? <Events /> : <Login />}
    </Container>
  );
};

export default App;
