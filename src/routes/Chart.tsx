import { fetchCoinHistory } from 'api'
import { useQuery } from 'react-query'
import ApexChart from 'react-apexcharts'

interface ChartProps {
  coinId: string
}

interface IHistricalData {
  time_open: string
  time_close: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  market_cap: number
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistricalData[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId)
  )
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="line"
          series={[{ name: 'Price', data: data?.map((price) => price.close) }]}
          options={{
            theme: {
              mode: 'dark',
            },
            stroke: {
              curve: 'smooth',
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: { show: false },
            xaxis: {
              type: 'category',
              categories: data?.map((close) => close.time_close.slice(0, 10)),
              axisBorder: {
                show: false,
              },
              axisTicks: { show: false },
              labels: { show: false },
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </div>
  )
}

export default Chart
