import { fetchCoinHistory } from 'api'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { isDarkAtom } from 'atoms'

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
  const isDark = useRecoilValue(isDarkAtom)
  const { isLoading, data } = useQuery<IHistricalData[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
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
              mode: isDark ? 'dark' : 'light',
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
            fill: {
              type: 'gradient',
              gradient: {
                gradientToColors: ['red'],
                stops: [0, 100, 100, 100],
                type: 'vertical',
              },
            },
            colors: ['blue'],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              },
            },
            xaxis: {
              type: 'datetime',
              categories: data?.map((close) => close.time_close),
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
