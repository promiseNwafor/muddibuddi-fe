import { cn } from '@/lib/utils'

type InfoCardProps = {
  label: string
  title: string
  className?: string
  labelClassName?: string
}

const InfoCard: React.FC<InfoCardProps> = ({
  label,
  title,
  className,
  labelClassName,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-evenly p-4 lg:pl-10 bg-white rounded-lg lg:h-36',
        className,
      )}
    >
      <p
        className={cn(
          'text-light-grey text-xs tracking-tighter lg:font-medium',
          labelClassName,
        )}
      >
        {label}
      </p>
      <p className="font-semibold lg:text-3xl">{title}</p>
    </div>
  )
}

export default InfoCard
