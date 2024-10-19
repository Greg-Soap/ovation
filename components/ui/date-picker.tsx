'use client'

import * as React from 'react'
import { format, setMonth, setYear } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DatePickerProps {
  disableDate?: boolean
  onChange: (date: Date | undefined) => void
  placeholder?: string
  value?: string
}

export function DatePicker({
  disableDate,
  onChange,
  placeholder,
  value,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    () => (value ? new Date(value) : undefined),
  )
  const [currentMonth, setCurrentMonth] = React.useState(() =>
    value ? new Date(value) : new Date(),
  )

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date)
    onChange(date)
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 99 + i)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const handleMonthChange = (month: number) => {
    setCurrentMonth((prevMonth) => setMonth(prevMonth, month))
  }

  const handleYearChange = (year: number) => {
    setCurrentMonth((prevMonth) => setYear(prevMonth, year))
  }

  React.useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value))
      setCurrentMonth(new Date(value))
    }
  }, [value])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          disabled={disableDate}
          className={cn(
            'w-full justify-start text-left font-normal h-[47px] rounded-3xl border-[#353538] border-[1px] border-solid',
            !selectedDate &&
              'text-lighter hover:bg-transparent hover:text-light',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, 'PPP')
          ) : (
            <span>{placeholder || 'Pick your date of birth'}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-black text-foreground border-[#353538] "
        align="start"
      >
        <div className="flex justify-between gap-2 px-2 py-1 pt-2">
          <Select
            value={currentMonth.getMonth().toString()}
            onValueChange={(value) =>
              handleMonthChange(Number.parseInt(value, 10))
            }
          >
            <SelectTrigger className="bg-black border-[#353538]">
              <SelectValue>{months[currentMonth.getMonth()]}</SelectValue>
            </SelectTrigger>
            <SelectContent
              position="popper"
              className="bg-black border-[#353538] max-h-[200px]"
            >
              {months.map((month, index) => (
                <SelectItem key={month} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={currentMonth.getFullYear().toString()}
            onValueChange={(value) =>
              handleYearChange(Number.parseInt(value, 10))
            }
          >
            <SelectTrigger className="bg-black border-[#353538]">
              <SelectValue>{currentMonth.getFullYear()}</SelectValue>
            </SelectTrigger>
            <SelectContent
              position="popper"
              className="bg-black border-[#353538] max-h-[200px]"
            >
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelectDate}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          initialFocus
          fromYear={currentYear - 99}
          toYear={currentYear}
        />
      </PopoverContent>
    </Popover>
  )
}
