import { fetchCoins } from 'api'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
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

const Coin = styled.li`
  display: flex;
  algin-item: center;
  font-size: 1.6rem;
  background-color: white;
  color: black;
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

const Img = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
`

interface ICoin {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins)
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        'Loading'
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <ToLinkPage
              key={coin.id}
              to={{
                pathname: `/${coin.id}`,
                state: { name: coin.name },
              }}>
              <Coin>
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                  alt="코인심볼"
                />
                {coin.name} &rarr;
              </Coin>
            </ToLinkPage>
          ))}
        </CoinsList>
      )}
    </Container>
  )
}

export default Coins
