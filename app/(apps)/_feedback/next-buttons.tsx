import type React from 'react'
import { Button } from '@/components/ui/button'

interface NextButtonProps {
  formPage: number
  isPending: boolean
  onNextClick: () => void
  onSubmit: () => void
}

const NextButton: React.FC<NextButtonProps> = ({
  formPage,
  isPending,
  onNextClick,
  onSubmit,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (formPage === 1) {
      onNextClick()
    } else {
      onSubmit()
    }
  }

  return (
    <Button
      type="button"
      className="text-[10px] font-semibold px-3 py-2 h-fit rounded-full"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? 'Submitting...' : formPage === 1 ? 'Next' : 'Submit'}
    </Button>
  )
}

export default NextButton
