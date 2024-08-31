'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/ui/date-picker'
import { Textarea } from '@/components/ui/textarea'
import SettingsChange from '../../_components/_settings/settings-change'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  Company: z.string(),
  Role: z.string(),
  Department: z.string().email(),
  StartDate: z.date(),
  FoundationApp: z.string(),
  FinishDate: z.string(),
  Description: z.string(),
  Skill: z.string(),
})

export default function ExperienceForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit() {
    console.log('submitted')
  }

  return (
    <div className="flex flex-col gap-[23px]">
      <p className="text-lg text-[#E6E6E6] font-medium lg:px-10 2xl:pl-20">
        Experience 1
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full flex gap-7 flex-col lg:px-10 2xl:pl-20 pb-5">
            <FormField
              control={form.control}
              name="Company"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-sm text-[#B3B3B3]">
                    Company
                  </FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-full h-[47px] rounded-full px-5 otline-none border border-[#333333] text-[#F8F8FF]">
                        <SelectValue
                          placeholder="ex. Google"
                          className="text-sm"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111115] border-none rounded-[10px] px-0">
                        {companyList.map((item, index) => (
                          <SelectItem
                            value={item.value}
                            key={index}
                            className="bg-[#111115] border-b border-[#4D4D4D] last:border-none text-[#F8F8FF] text-lg font-medium rounded-none hover:bg-[#111115]"
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Role"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-sm text-[#B3B3B3]">Role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex. CEO"
                      {...field}
                      className="h-[47px] text-sm text-[#F8F8FF] border border-solid border-[#4D4D4D] focus:border-solid focus:border-[1px] focus:border-[#4D4D4D]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Department"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-sm text-[#B3B3B3]">
                    Department
                  </FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-full h-[47px] rounded-full px-5 otline-none border border-[#333333] text-[#F8F8FF]">
                        <SelectValue
                          placeholder="ex. Google"
                          className="text-sm h-[47px]"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111115] border-none rounded-[10px] px-0">
                        {departmentList.map((item, index) => (
                          <SelectItem
                            value={item?.value}
                            key={index}
                            className="bg-[#111115] border-b border-[#4D4D4D] last:border-none text-[#F8F8FF] text-lg font-medium rounded-none hover:bg-[#111115]"
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-[13px]">
              <div className="grid grid-cols-2 gap-[33px]">
                <FormField
                  control={form.control}
                  name="StartDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel className="text-sm text-[#B3B3B3]">
                        Start Date
                      </FormLabel>
                      <FormControl {...field}>
                        <div className="flex border border-[#4D4D4D] rounded-full h-[47px]">
                          <DatePicker />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="FinishDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel className="text-sm text-[#B3B3B3]">
                        Finish Date
                      </FormLabel>
                      <FormControl {...field}>
                        <div className="flex border border-[#4D4D4D] rounded-full h-[47px]">
                          <DatePicker />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-sm text-[#B3B3B3]">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ex. CEO"
                      {...field}
                      className="text-sm text-[#F8F8FF] min-h-[150px] border border-solid border-[#4D4D4D] rounded-[16px] focus:border-solid focus:border-[1px] focus:border-[#4D4D4D]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Skill"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-sm text-[#B3B3B3]">
                    Skill
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex. CEO"
                      {...field}
                      className="h-[47px] text-sm text-[#F8F8FF] border border-solid border-[#4D4D4D] focus:border-solid focus:border-[1px] focus:border-[#4D4D4D]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <SettingsChange />
        </form>
      </Form>
    </div>
  )
}

interface CommunityList {
  name?: string
  value?: string
  imgSrc?: string
}

const companyList = [
  { name: 'Google', value: 'google', imgSrc: '/' },
  { name: 'Slack', value: 'slack', imgSrc: '/' },
  { name: 'Apple', value: 'apple', imgSrc: '/' },
  { name: 'Meta', value: 'meta', imgSrc: '/' },
  { name: 'Netflix', value: 'netflix', imgSrc: '/' },
]

interface DepartmentList {
  name?: string
  value?: string
}

const departmentList = [
  { name: 'Executive', value: 'executive' },
  { name: 'Finance', value: 'finance' },
  { name: 'Product', value: 'product' },
  { name: 'Engineering', value: 'engineering' },
  { name: 'Marketing', value: 'marketing' },
]
