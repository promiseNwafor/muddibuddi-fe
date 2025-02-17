import { TiWeatherPartlySunny } from 'react-icons/ti'
import { WiRaindrops } from 'react-icons/wi'
import { FaWind } from 'react-icons/fa'
import { TbDropletsFilled } from 'react-icons/tb'
import InfoCard from '../common/InfoCard'
import WeatherCard from '../common/WeatherCard'
import MoodChart from './MoodChart'
import MoodWeatherChart from './MoodWeatherChart'
import RecentMoodEntries from './RecentMoodEntries'

const DashboardContainer = () => {
  return (
    <div className="h-auto min-h-[82vh]">
      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-7 grid gap-5">
          <div className="grid grid-cols-3 gap-5">
            <InfoCard
              label="Total Streak"
              title="101"
              className="bg-gray-700 pl-4"
            />
            <InfoCard
              label="Total Mood"
              title="101"
              className="bg-[#FFF6DA] pl-4 text-accent"
              labelClassName="text-black"
            />
            <InfoCard
              label="Average Weather"
              title="101"
              className="bg-white/70 pl-4 text-accent"
              labelClassName="text-black"
            />
          </div>
          <div className="space-y-5">
            <MoodChart />
            <MoodWeatherChart />
          </div>
        </div>

        <div className="col-span-3 space-y-10">
          <div className="bg-gradient-to-b from-[#87CEEB] to-[#6495ED] rounded-lg h-[320px] w-full p-5 center flex-col justify-between">
            <p>Monday, 17th February, 2025</p>
            <p>Birmingham, UK</p>
            <TiWeatherPartlySunny size={80} />
            <small>Partly Cloudy</small>
            <h2 className="text-4xl font-semibold">
              2<sup>°</sup>
            </h2>
            <div className="grid grid-cols-3 place-items-center bg-background/80 rounded-xl w-full py-2">
              <WeatherCard title="Wind" subtitle="5mph" Icon={FaWind} />
              <WeatherCard
                title="Humidity"
                subtitle="70%"
                Icon={TbDropletsFilled}
              />
              <WeatherCard
                title="Feels Like"
                subtitle="-1°"
                Icon={WiRaindrops}
              />
            </div>
          </div>
          <RecentMoodEntries />
        </div>
      </div>
    </div>
  )
}

export default DashboardContainer
