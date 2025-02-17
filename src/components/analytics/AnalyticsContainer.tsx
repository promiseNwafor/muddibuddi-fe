import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Line,
} from 'recharts'

const MoodAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('month')

  // Sample data with mood terms
  const moodData = [
    {
      date: '2024-02-10',
      mood: 'Happy',
      moodScore: 4,
      weather: 'Sunny',
      temperature: 75,
    },
    {
      date: '2024-02-11',
      mood: 'Neutral',
      moodScore: 3,
      weather: 'Cloudy',
      temperature: 65,
    },
    {
      date: '2024-02-12',
      mood: 'Sad',
      moodScore: 2,
      weather: 'Rainy',
      temperature: 60,
    },
    {
      date: '2024-02-13',
      mood: 'Overjoyed',
      moodScore: 5,
      weather: 'Sunny',
      temperature: 72,
    },
    {
      date: '2024-02-14',
      mood: 'Happy',
      moodScore: 4,
      weather: 'Sunny',
      temperature: 70,
    },
    {
      date: '2024-02-15',
      mood: 'Neutral',
      moodScore: 3,
      weather: 'Cloudy',
      temperature: 68,
    },
  ]

  const weatherCorrelation = [
    { weather: 'Sunny', mostFrequentMood: 'Happy', moodCount: 45 },
    { weather: 'Cloudy', mostFrequentMood: 'Neutral', moodCount: 30 },
    { weather: 'Rainy', mostFrequentMood: 'Sad', moodCount: 25 },
    { weather: 'Snowy', mostFrequentMood: 'Happy', moodCount: 10 },
  ]

  const moodDistribution = [
    { name: 'Overjoyed', value: 15, color: '#FF9999' },
    { name: 'Happy', value: 40, color: '#99FF99' },
    { name: 'Neutral', value: 25, color: '#9999FF' },
    { name: 'Sad', value: 15, color: '#FFB366' },
    { name: 'Depressed', value: 5, color: '#FF99FF' },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white text-accent p-4 border rounded shadow">
          <p className="text-sm">Date: {label}</p>
          <p className="text-sm">Mood: {payload[0].payload.mood}</p>
          <p className="text-sm">Temperature: {payload[1].value}°F</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mood Analytics</h1>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32 bg-primary text-accent">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mood Trend Over Time */}
        <Card className="col-span-2 bg-[#0f0f1a] border-primary/25">
          <CardHeader>
            <CardTitle>Mood Trend Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis
                    dataKey="moodScore"
                    ticks={[1, 2, 3, 4, 5]}
                    tickFormatter={(value) => {
                      const moods = [
                        'Depressed',
                        'Sad',
                        'Neutral',
                        'Happy',
                        'Overjoyed',
                      ]
                      return moods[value - 1]
                    }}
                  />
                  <YAxis dataKey="temperature" orientation="right" unit="°F" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="moodScore"
                    fill="#8884d8"
                    name="Mood"
                    barSize={20}
                  />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#82ca9d"
                    name="Temperature"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weather Correlation */}
        <Card className="col-span-2 lg:col-span-1 bg-primary">
          <CardHeader>
            <CardTitle>Weather Impact on Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weatherCorrelation}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="weather" />
                  <YAxis />
                  <Tooltip contentStyle={{ color: '#0f0f1a' }} />
                  <Legend />
                  <Bar
                    dataKey="moodCount"
                    fill="#8884d8"
                    name="Number of Entries"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Mood Distribution */}
        <Card className="col-span-2 lg:col-span-1 border-primary/25 bg-[#0f0f1a]">
          <CardHeader>
            <CardTitle>Mood Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moodDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {moodDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Mood Patterns */}
        <Card className="col-span-2 border-primary/25 bg-[#0f0f1a]">
          <CardHeader>
            <CardTitle>Mood Patterns Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weather">
              <TabsList>
                <TabsTrigger value="weather">Weather</TabsTrigger>
                <TabsTrigger value="time">Time of Day</TabsTrigger>
                <TabsTrigger value="day">Day of Week</TabsTrigger>
              </TabsList>
              <TabsContent value="weather" className="h-80 overflow-y-scroll">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weatherCorrelation.map((item) => (
                    <div
                      key={item.weather}
                      className="p-4 border rounded border-primary/25"
                    >
                      <h3 className="font-semibold">{item.weather}</h3>
                      <p>Most Common Mood: {item.mostFrequentMood}</p>
                      <p>Total Entries: {item.moodCount}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="time" className="h-80">
                <div className="p-4 text-center text-gray-500">
                  Time of day analysis coming soon
                </div>
              </TabsContent>
              <TabsContent value="day" className="h-80">
                <div className="p-4 text-center text-gray-500">
                  Day of week analysis coming soon
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MoodAnalyticsDashboard
