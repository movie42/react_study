import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  padding: 0px 20px;
`

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CoinsList = styled.ul``

const ToLinkPage = styled(Link)`
  display: block;
`

const Coin = styled.li`
  font-size: 1.6rem;
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 10px;
  transition: color 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`

const Title = styled.h1`
  font-size: 4.8rem;
  color: ${(props) => props.theme.accentColor};
`
const coins = [
  {
    id: 'btc-bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    rank: 1,
    is_new: false,
    is_active: true,
    type: 'coin',
  },
  {
    id: 'eth-ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    rank: 2,
    is_new: false,
    is_active: true,
    type: 'coin',
  },
  {
    id: 'usdt-tether',
    name: 'Tether',
    symbol: 'USDT',
    rank: 3,
    is_new: false,
    is_active: true,
    type: 'token',
  },
  {
    id: 'bnb-binance-coin',
    name: 'Binance Coin',
    symbol: 'BNB',
    rank: 4,
    is_new: false,
    is_active: true,
    type: 'coin',
  },
  {
    id: 'hex-hex',
    name: 'HEX',
    symbol: 'HEX',
    rank: 5,
    is_new: false,
    is_active: true,
    type: 'token',
  },
  {
    id: 'usdc-usd-coin',
    name: 'USD Coin',
    symbol: 'USDC',
    rank: 6,
    is_new: false,
    is_active: true,
    type: 'token',
  },
]

function Coins() {
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      <CoinsList>
        {coins.map((coin) => (
          <ToLinkPage key={coin.id} to={`/${coin.id}`}>
            <Coin>{coin.name} &rarr;</Coin>
          </ToLinkPage>
        ))}
      </CoinsList>
    </Container>
  )
}

export default Coins
