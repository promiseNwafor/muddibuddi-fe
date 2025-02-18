import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { formatDate } from '@/lib/utils'
import { ContentType } from 'recharts/types/component/Tooltip'
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

export interface DataPoint {
  date: string
  mood: string
  moodValue: number
}

type MoodScale = {
  [key: number]: string
}

export interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    payload: DataPoint
  }>
}

enum ChartType {
  Line = 'line',
  Bar = 'bar',
}

const moodScale: MoodScale = {
  1: 'Sad',
  2: 'Down',
  3: 'Neutral',
  4: 'Happy',
  5: 'Excited',
}

const data: DataPoint[] = [
  { date: '2025-02-11', mood: 'happy', moodValue: 5 },
  { date: '2025-02-12', mood: 'neutral', moodValue: 3 },
  { date: '2025-02-13', mood: 'sad', moodValue: 1 },
  { date: '2025-02-14', mood: 'excited', moodValue: 5 },
  { date: '2025-02-15', mood: 'happy', moodValue: 4 },
  { date: '2025-02-16', mood: 'happy', moodValue: 4 },
  { date: '2025-02-17', mood: 'excited', moodValue: 5 },
]

const MoodChart = () => {
  const [chartType, setChartType] = useState(ChartType.Line)

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white text-accent p-2 border rounded shadow">
          <p className="text-sm">{`Mood: ${payload[0].payload.mood}`}</p>
          <p className="text-xs">{`Day: ${formatDate(payload[0].payload.date)}: ${payload[0].payload.date}`}</p>
        </div>
      )
    }
    return null
  }

  const formatYAxis = (value: number) => {
    return moodScale[value] || value.toString()
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[500px]">
        <Card className="bg-transparent border-white/25">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Past Week Mood</span>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value as ChartType)}
                className="border rounded p-1 px-3 text-accent"
              >
                {Object.values(ChartType).map((type) => (
                  <option key={type} value={type} className="capitalize">
                    {type} chart
                  </option>
                ))}
              </select>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' ? (
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    <YAxis
                      domain={[0, 5]}
                      ticks={[1, 2, 3, 4, 5]}
                      tickFormatter={formatYAxis}
                    />
                    <Tooltip
                      content={
                        CustomTooltip as ContentType<ValueType, NameType>
                      }
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="moodValue"
                      stroke="#ffa100"
                      name="Mood"
                      strokeWidth={2}
                      dot={{ fill: '#8884d8', r: 6 }}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    <YAxis
                      domain={[0, 5]}
                      ticks={[1, 2, 3, 4, 5]}
                      tickFormatter={formatYAxis}
                    />
                    <Tooltip
                      content={
                        CustomTooltip as ContentType<ValueType, NameType>
                      }
                    />
                    <Legend />
                    <Bar dataKey="moodValue" fill="#8884d8" name="Mood" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MoodChart
