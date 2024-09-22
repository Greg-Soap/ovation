import React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress' // Adjust the import according to your setup
import { cn } from '@/lib/utils' // Adjust according to your setup

interface CircleProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value: number
  imgSrc: string
}

const CircleProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CircleProgressProps
>(({ className, value, imgSrc, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-[41px] w-[41px] overflow-hidden rounded-full bg-primary/20 flex justify-center items-center',
      className,
    )}
    {...props}
    style={{
      background: `radial-gradient(closest-side, #18181C 79%, transparent 80% 100%), conic-gradient(#CFF073 ${value || 0}%, #808080 0)`,
    }}
  >
    <div>
      <img src={imgSrc} alt="illustration" className="w-6 h-6" />
    </div>
  </ProgressPrimitive.Root>
))

CircleProgress.displayName = 'CircleProgress'

export default CircleProgress
