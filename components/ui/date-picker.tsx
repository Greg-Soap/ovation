'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function DatePicker({ disableDate }: any) {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className='text-white h-[47px] rounded-3xl border-[#353538] border-[1px] border-solid '>
        <Button
          variant={'outline'}
          disabled={disableDate}
          className={cn(
            'w-full  justify-start text-left text-[#F8F8FF] font-normal hover:bg-transparent',
            !date && 'text-[#808080]',
          )}>
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span className=''>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 bg-black text-white'>
        <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
