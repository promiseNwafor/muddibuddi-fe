import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type AddButtonProps = {
  children: string
  className?: string
  onClick?: () => void
}

const AddButton: React.FC<AddButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <Button
      className={cn(
        'py-6 rounded-lg font-medium hover:bg-opacity-20',
        className,
      )}
      onClick={onClick}
    >
      <Plus className="mr-1 h-4 w-4" /> {children}
    </Button>
  )
}

export default AddButton
