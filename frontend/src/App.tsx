import styled from "@emotion/styled";
import Routes from "./Routes";

const Container = styled.div`
  height: 100vh;
  background: ${({ theme }: any) => theme.palette.background.default};
  color: ${({ theme }: any) => theme.palette.text.primary};
  display: flex;
  justify-content: center;
`;

const App = () => {
  return (
    <Container>
      <Routes />
    </Container>
  );
};

export default App;
