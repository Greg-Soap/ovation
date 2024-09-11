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
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

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
  const [disabled, setDisabled] = useState<boolean>(true)
  const [disableDate, setDisableDate] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit() {
    console.log('submitted')
  }

  return (
    <div className="flex flex-col gap-[23px]">
      <p className="text-lg text-[#E6E6E6] font-medium px-10 2xl:px-20">
        Experience 1
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => setDisabled(false)}
        >
          <div className="flex gap-7 flex-col px-4 sm:px-10 2xl:px-20 pb-5">
            <FormField
              control={form.control}
              name="Company"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-sm text-[#B3B3B3]">
                    Company
                  </FormLabel>
                  <FormControl {...field}>
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
                            value={item?.value ? item?.value : ''}
                            key={index}
                            className="bg-[#111115] border-b border-[#4D4D4D] last:border-none text-[#F8F8FF] text-lg font-medium rounded-none first:rounded-t-[10px] last:rounded-b-[10px] hover:bg-[#111115] px-4 py-2"
                          >
                            <div className="flex flex-row gap-2 items-center">
                              <img
                                src={`${item.imgSrc}`}
                                alt={item.name}
                                className="w-6 h-6"
                              />
                              <p>{item.name}</p>
                            </div>
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
                  <FormControl {...field}>
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
                            value={item?.value ? item?.value : ''}
                            key={index}
                            className="bg-[#111115] border-b border-[#4D4D4D] last:border-none text-[#F8F8FF] text-lg font-medium rounded-none first:rounded-t-[10px] last:rounded-b-[10px] px-4 py-2"
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
                        <DatePicker />
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
                        <DatePicker disableDate={disableDate} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-[7px] mt-[13px]">
                <Checkbox
                  id="work"
                  onCheckedChange={() => setDisableDate(!disableDate)}
                  className="border-[#CFF073] data-[state=checked]:bg-[#CFF073] data-[state=checked]:text-[#0B0A10]"
                />

                <label
                  htmlFor="work"
                  className="text-xs text-[#CCCDD7] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I still work here
                </label>
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

          <SettingsChange disabled={disabled} />
        </form>
      </Form>
    </div>
  )
}

interface CompanyList {
  name?: string
  value?: string
  imgSrc?: string
}

const companyList: CompanyList[] = [
  {
    name: 'Google',
    value: 'google',
    imgSrc: '/assets/images/settings/company/google.png',
  },
  {
    name: 'Slack',
    value: 'slack',
    imgSrc: '/assets/images/settings/company/slack.png',
  },
  {
    name: 'Apple',
    value: 'apple',
    imgSrc: '/assets/images/settings/company/apple.png',
  },
  {
    name: 'Meta',
    value: 'meta',
    imgSrc: '/assets/images/settings/company/meta.png',
  },
  {
    name: 'Netflix',
    value: 'netflix',
    imgSrc: '/assets/images/settings/company/netflix.png',
  },
]

interface DepartmentList {
  name?: string
  value?: string
}

const departmentList: DepartmentList[] = [
  { name: 'Executive', value: 'executive' },
  { name: 'Finance', value: 'finance' },
  { name: 'Product', value: 'product' },
  { name: 'Engineering', value: 'engineering' },
  { name: 'Marketing', value: 'marketing' },
]
