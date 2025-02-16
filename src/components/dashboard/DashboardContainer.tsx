import InfoCard from '../common/InfoCard'
import MoodChart from './MoodChart'

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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <MoodChart />
            </div>
            <div>
              <MoodChart />
            </div>
          </div>
          <div>
            <MoodChart />
          </div>
        </div>

        <div className="col-span-3 space-y-10">
          <div className="bg-white/15 rounded-lg h-[300px] w-full p-5">
            <h2 className="text-lg font-medium">Weather Today</h2>
          </div>
          <div className="bg-white text-accent rounded-lg h-[calc(80vh-300px)] w-full p-5">
            <h2 className="text-lg font-medium">Recent Entries</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContainer
