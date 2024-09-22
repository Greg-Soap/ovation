import { AlertCircle } from 'lucide-react'

interface ErrorDisplayProps {
  message: string
}

export function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <div className='flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800'>
      <AlertCircle className='flex-shrink-0 inline w-4 h-4 mr-3' />
      <span className='sr-only'>Error</span>
      <div>
        <span className='font-medium'>Validation error:</span> {message}
      </div>
    </div>
  )
}
