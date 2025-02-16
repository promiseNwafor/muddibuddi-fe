import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data01 = [
  { x: '2025-02-09', y: 'red', z: 200 },
  { x: '2025-02-10', y: 'blue', z: 260 },
  { x: '2025-02-11', y: 'pink', z: 400 },
  { x: '2025-02-12', y: 'red', z: 280 },
  { x: '2025-02-13', y: 'red', z: 500 },
  { x: '2025-02-14', y: 'blue', z: 200 },
  { x: '2025-02-19', y: 'red', z: 200 },
  { x: '2025-02-20', y: 'blue', z: 260 },
  { x: '2025-02-21', y: 'pink', z: 400 },
  { x: '2025-02-22', y: 'red', z: 280 },
  { x: '2025-02-23', y: 'red', z: 500 },
  { x: '2025-02-24', y: 'blue', z: 200 },
]
const data02 = [
  { x: 200, y: 260, z: 240 },
  { x: 240, y: 290, z: 220 },
  { x: 190, y: 290, z: 250 },
  { x: 198, y: 250, z: 210 },
  { x: 180, y: 280, z: 260 },
  { x: 210, y: 220, z: 230 },
]

const MoodChart = () => {
  return (
    <div>
      <ResponsiveContainer
        width="100%"
        height={300}
        className="border border-white/25 rounded-lg"
      >
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="category" dataKey="x" name="stature" />
          <YAxis type="category" dataKey="y" name="weight" />
          <ZAxis
            type="number"
            dataKey="z"
            range={[60, 400]}
            name="score"
            unit="km"
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="A school" data={data01} fill="#8884d8" shape="star" />
          <Scatter
            name="B school"
            data={data02}
            fill="#82ca9d"
            shape="triangle"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MoodChart
