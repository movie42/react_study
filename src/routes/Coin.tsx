import { useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  padding: 0px 20px;
`

const Header = styled.header`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CoinsList = styled.ul``

const ToLinkPage = styled(Link)`
  display: display;
`

const Title = styled.h1`
  font-size: 4.8rem;
  color: ${(props) => props.theme.accentColor};
`

interface RouteParams {
  coinId: string
}

interface RouteState {
  name: string
}

function Coin() {
  const [loading, setLoading] = useState(true)
  const { coinId } = useParams<RouteParams>()
  const { state } = useLocation<RouteState>()
  return (
    <Container>
      <Header>
        <Title>{state?.name || 'Loading'}</Title>
      </Header>
      {loading ? 'Loading' : null}
    </Container>
  )
}
export default Coin
