import {
  useParams,
  Route,
  Link,
  useLocation,
  Switch,
  useRouteMatch,
} from 'react-router-dom'
import styled from 'styled-components'
import Price from './Price'
import Chart from './Chart'
import { useQuery } from 'react-query'
import { fetchCoinInfo, fetchCoinTickers } from 'api'
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

const Title = styled.h1`
  font-size: 4.8rem;
  color: ${(props) => props.theme.accentColor};
`

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`
const Description = styled.p`
  margin: 20px 0px;
`

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0;
`

const LinkBox = styled.div<{ isActive: boolean }>`
  a {
    display: block;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 1rem 0;
    width: 47vw;
    border-radius: 1.4rem;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
`

const ToLinkPage = styled(Link)`
  display: block;
`

interface RouteParams {
  coinId: string
}

interface RouteState {
  name: string
}

interface ITag {
  coin_counter: number
  ico_counter: number
  id: string
  name: string
}

interface ITeam {
  id: string
  name: string
  position: string
}

interface InfoData {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
  tags: ITag[]
  team: ITeam[]
  description: string
  message: string
  open_source: boolean
  started_at: string
  development_status: string
  hardware_wallet: boolean
  proof_type: string
  org_structure: string
  hash_algorithm: string
  links: object
  links_extended: object
  whitepaper: object
  first_data_at: string
  last_data_at: string
}

interface TickersData {
  id: string
  name: string
  symbol: string
  rank: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  beta_value: number
  first_data_at: string
  last_updated: string
  quotes: {
    USD: {
      ath_date: string
      ath_price: number
      market_cap: number
      market_cap_change_24h: number
      percent_change_1h: number
      percent_change_1y: number
      percent_change_6h: number
      percent_change_7d: number
      percent_change_12h: number
      percent_change_15m: number
      percent_change_24h: number
      percent_change_30d: number
      percent_change_30m: number
      percent_from_price_ath: number
      price: number
      volume_24h: number
      volume_24h_change_24h: number
    }
  }
}

function Coin() {
  const { coinId } = useParams<RouteParams>()
  const { state } = useLocation<RouteState>()
  const priceMatch = useRouteMatch('/:coinId/price')
  const chartMatch = useRouteMatch('/:coinId/chart')

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId)
  )
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<TickersData>(['tickers', coinId], () => fetchCoinTickers(coinId), {
      refetchInterval: 5000,
    })

  const loading = infoLoading || tickersLoading

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? 'Loading' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? 'Loading' : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        'Loading'
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{`$ ${tickersData?.quotes.USD.price.toFixed(3)}`}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <LinkContainer>
            <LinkBox isActive={chartMatch !== null}>
              <ToLinkPage to={`/${coinId}/chart`}>Chart</ToLinkPage>
            </LinkBox>

            <LinkBox isActive={priceMatch !== null}>
              <ToLinkPage to={`/${coinId}/price`}>Price</ToLinkPage>
            </LinkBox>
          </LinkContainer>

          <Switch>
            <Route path={`/:coinId/price`}>
              <Price></Price>
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId}></Chart>
            </Route>
          </Switch>
        </>
      )}
    </Container>
  )
}
export default Coin
