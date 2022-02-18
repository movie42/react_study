import { MouseEvent } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

interface DummyProps {
  text: string;
}

function Dummy({ text }: DummyProps) {
  return <H1>{text}</H1>;
}

function App() {
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event);
  };

  return (
    <Container>
      <Dummy text="안녕하세요" />
      <button onClick={onClick}>클릭</button>
    </Container>
  );
}

export default App;
