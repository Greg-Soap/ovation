import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex h-[58px] w-full rounded-full  border-[#FFFFFF33] px-[22px] py-[10px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none bg-transparent focus:border-none border-none' ,
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }

