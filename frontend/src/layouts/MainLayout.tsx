import { ReactNode } from "react";

import { TopNavigation } from "../components";
import styled from "@emotion/styled";

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
  return (
    <Container>
      <TopNavigation />

      <Main>{children}</Main>
    </Container>
  );
};
