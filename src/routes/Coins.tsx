import styled from 'styled-components'

const Title = styled.h1`
  font-size: 5rem;
  color: ${(props) => props.theme.accentColor};
`

function Coins() {
  return <Title>코인</Title>
}

export default Coins
