import React, { useState, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface DataPoint {
  date: string
  avgMood: number
  temperature: number
  weather: string
  entries: number
}

enum PERIOD {
  WEEK = 'week',
  TWO_WEEKS = 'two-weeks',
  MONTH = 'month',
  THREE_MONTHS = 'three-months',
}

const MoodWeatherChart = () => {
  const [period, setPeriod] = useState(PERIOD.WEEK)

  const allData = useMemo<DataPoint[]>(
    () => [
      // Last Week
      {
        date: '2025-02-11',
        avgMood: 4.2,
        temperature: 18,
        weather: 'Sunny',
        entries: 5,
      },
      {
        date: '2025-02-12',
        avgMood: 3.8,
        temperature: 15,
        weather: 'Cloudy',
        entries: 4,
      },
      {
        date: '2025-02-13',
        avgMood: 3.2,
        temperature: 12,
        weather: 'Rainy',
        entries: 6,
      },
      {
        date: '2025-02-14',
        avgMood: 4.5,
        temperature: 20,
        weather: 'Sunny',
        entries: 3,
      },
      {
        date: '2025-02-15',
        avgMood: 4.0,
        temperature: 17,
        weather: 'Partly Cloudy',
        entries: 4,
      },
      {
        date: '2025-02-16',
        avgMood: 3.9,
        temperature: 16,
        weather: 'Cloudy',
        entries: 5,
      },
      {
        date: '2025-02-17',
        avgMood: 4.3,
        temperature: 19,
        weather: 'Sunny',
        entries: 4,
      },
      // Previous Week
      {
        date: '2025-02-04',
        avgMood: 3.7,
        temperature: 14,
        weather: 'Cloudy',
        entries: 3,
      },
      {
        date: '2025-02-05',
        avgMood: 4.1,
        temperature: 16,
        weather: 'Sunny',
        entries: 5,
      },
      {
        date: '2025-02-06',
        avgMood: 3.5,
        temperature: 13,
        weather: 'Rainy',
        entries: 4,
      },
      {
        date: '2025-02-07',
        avgMood: 4.2,
        temperature: 18,
        weather: 'Sunny',
        entries: 6,
      },
      {
        date: '2025-02-08',
        avgMood: 3.9,
        temperature: 15,
        weather: 'Partly Cloudy',
        entries: 4,
      },
      {
        date: '2025-02-09',
        avgMood: 4.0,
        temperature: 17,
        weather: 'Sunny',
        entries: 5,
      },
      {
        date: '2025-02-10',
        avgMood: 3.8,
        temperature: 14,
        weather: 'Cloudy',
        entries: 3,
      },
    ],
    [],
  )

  const filteredData = useMemo(() => {
    const date = new Date()
    const now = date.toISOString().split('T')[0]
    const periodInDays = {
      week: 7,
      'two-weeks': 14,
      month: 30,
      'three-months': 90,
    }[period]

    const cutoffDate = new Date(now)
    cutoffDate.setDate(cutoffDate.getDate() - periodInDays)

    return allData
      .filter((item) => new Date(item.date) >= cutoffDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [period, allData])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return period === 'week' || period === 'two-weeks'
      ? date.toLocaleDateString('en-US', { weekday: 'short' })
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const moodScale = {
    1: 'Sad',
    2: 'Down',
    3: 'Neutral',
    4: 'Happy',
    5: 'Excited',
  }

  interface CustomTooltipProps {
    active?: boolean
    payload?: Array<{
      name: string
      value: number
      payload: DataPoint
    }>
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="text-sm font-medium">{formatDate(data.date)}</p>
          <p className="text-sm">{`Average Mood: ${data.avgMood.toFixed(1)}`}</p>
          <p className="text-sm">{`Temperature: ${data.temperature}°C`}</p>
          <p className="text-sm">{`Weather: ${data.weather}`}</p>
          <p className="text-sm">{`Number of Entries: ${data.entries}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="">
      <Card className="bg-white text-accent">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Mood and Weather Correlation</CardTitle>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as PERIOD)}
              className="border rounded p-2 text-sm bg-white"
            >
              <option value={PERIOD.WEEK}>Last Week</option>
              <option value={PERIOD.TWO_WEEKS}>Last 2 Weeks</option>
              <option value={PERIOD.MONTH}>Last Month</option>
              <option value={PERIOD.THREE_MONTHS}>Last 3 Months</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  interval="preserveStartEnd"
                />
                <YAxis
                  yAxisId="mood"
                  domain={[0, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tickFormatter={(value) =>
                    moodScale[value as keyof typeof moodScale] || value
                  }
                />
                <YAxis
                  yAxisId="temperature"
                  orientation="right"
                  domain={[0, 30]}
                  tickFormatter={(value) => `${value}°C`}
                />
                <Tooltip content={CustomTooltip} />
                <Legend />
                <Bar
                  yAxisId="mood"
                  dataKey="avgMood"
                  fill="#8884d8"
                  name="Average Mood"
                  barSize={20}
                />
                <Line
                  yAxisId="temperature"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ffa100"
                  name="Temperature"
                  strokeWidth={2}
                  dot={{ fill: '#ffa100', r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MoodWeatherChart
