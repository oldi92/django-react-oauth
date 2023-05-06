import { ReactNode } from "react";

import { TopNavigation } from "../components";
import styled from "@emotion/styled";

const Container = styled.div``;

const Main = styled.main``;

interface Props {
  children: ReactNode | ReactNode[];
}

export const MainLayout = ({ children }: Props) => {
  return (
    <Container>
      <TopNavigation />

      <Main>{children}</Main>
    </Container>
  );
};
