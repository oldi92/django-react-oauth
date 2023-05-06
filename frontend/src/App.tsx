import { useEffect, useState } from "react";
import { CircularProgress, Theme } from "@mui/material";

import Users from "./Users";
import Login from "./Login";
import { Events } from "./components";
import styled from "@emotion/styled";

const Container = styled.div`
  height: 100vh;
  background: ${({ theme }: any) => theme.palette.background.default};
  color: ${({ theme }: any) => theme.palette.text.primary};
  display: flex;
  justify-content: center;
`;

function App() {
  const [isAuthenticatedLoading, setIsAuthenticatedLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticatedLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    }
    setIsAuthenticatedLoading(false);
  }, []);

  return (
    <Container>
      {isAuthenticatedLoading && <CircularProgress />}

      {isAuthenticated ? (
        <Events />
      ) : (
        <Login
          onLoginSuccess={() => {
            setIsAuthenticated(true);
          }}
        />
      )}
    </Container>
  );
}

export default App;
