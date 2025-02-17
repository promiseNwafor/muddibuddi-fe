import { formatEntryDate, getMoodColor } from '@/lib/utils'
import { Calendar, Cloud, CloudRain, Sun } from 'lucide-react'

const entries = [
  {
    date: '2025-02-17',
    time: '14:30',
    mood: 'Happy',
    weather: 'Sunny',
    note: 'Had a great lunch with friends',
  },
  {
    date: '2025-02-17',
    time: '09:15',
    mood: 'Neutral',
    weather: 'Cloudy',
    note: 'Morning commute was okay',
  },
  {
    date: '2025-02-16',
    time: '20:45',
    mood: 'Excited',
    weather: 'Clear',
    note: 'Finished a big project',
  },
  {
    date: '2025-02-16',
    time: '13:20',
    mood: 'Sad',
    weather: 'Rainy',
    note: 'Missing home',
  },
  {
    date: '2025-02-16',
    time: '15:20',
    mood: 'Sad',
    weather: 'Clear',
    note: 'Missing home',
  },
]

const RecentMoodEntries = () => {
  const getWeatherIcon = (weather: string) => {
    switch (weather.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="h-5 w-5 text-yellow-500" />
      case 'cloudy':
        return <Cloud className="h-5 w-5 text-gray-500" />
      case 'rainy':
        return <CloudRain className="h-5 w-5 text-blue-500" />
      default:
        return <Cloud className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="bg-white border border-white/25 text-accent rounded-lg max-h-[calc(95.5%-300px)] w-full p-5 space-y-4">
      <h2 className="text-lg font-medium">Recent Entries</h2>
      <div className="space-y-4 overflow-y-scroll h-[500px]">
        {entries.map((entry) => (
          <div
            key={`${entry.date}-${entry.time}`}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors overflow-x-scroll"
          >
            <div className="flex items-start justify-between min-w-[200px]">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">
                    {formatEntryDate(entry.date, entry.time)}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(entry.mood)}`}
                    >
                      {entry.mood}
                    </span>
                    <div className="flex items-center space-x-1">
                      {getWeatherIcon(entry.weather)}
                      <span className="text-sm text-gray-600">
                        {entry.weather}
                      </span>
                    </div>
                  </div>
                  {entry.note && (
                    <p className="text-sm mt-2 text-gray-700">{entry.note}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentMoodEntries
