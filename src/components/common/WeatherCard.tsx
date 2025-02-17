import { IconType } from 'react-icons/lib'

interface WeatherCardProps {
  title: string
  subtitle: string
  Icon: IconType
}

const WeatherCard: React.FC<WeatherCardProps> = ({ title, subtitle, Icon }) => {
  return (
    <div className="center flex-col text-xs gap-1">
      <p>{title}</p>
      <Icon />
      <p>{subtitle}</p>
    </div>
  )
}

export default WeatherCard
