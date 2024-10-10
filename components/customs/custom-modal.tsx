import type { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface CustomModalProps {
  trigger?: ReactNode
  title?: string
  description?: string
  children: ReactNode
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function CustomModal({
  trigger,
  title,
  description,
  children,
  className,
  open,
  onOpenChange,
}: CustomModalProps) {
  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={`${className} z-50`}
        onClick={handleContentClick}
      >
        {title || description ? (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        ) : null}
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default CustomModal
