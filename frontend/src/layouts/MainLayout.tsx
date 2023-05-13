import { ReactNode, useEffect } from "react";

import { TopNavigation } from "../components";
import styled from "@emotion/styled";
import { useAuthentication } from "../hooks";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Stack } from "@mui/material";

const Container = styled.div`
  flex: 1;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.5rem 0 1.5rem;
`;

interface Props {
  children: ReactNode | ReactNode[];
}

export const MainLayout = ({ children }: Props) => {
  const { isAuthenticated, isTokenVerifySuccess, isTokenVerifyLoading } =
    useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenVerifySuccess && !isAuthenticated) navigate("/");
  }, [navigate, isAuthenticated, isTokenVerifySuccess]);

  return (
    <Container>
      <TopNavigation />

      <Main>
        {isTokenVerifyLoading ? (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        ) : (
          children
        )}
      </Main>
    </Container>
  );
};
