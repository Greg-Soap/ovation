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
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/ui/date-picker'
import { Textarea } from '@/components/ui/textarea'
import SettingsChange from './settings-change'
import { Checkbox } from '@/components/ui/checkbox'
import ovationService from '@/services/ovation.service'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { useLocalStorage } from '@/lib/use-local-storage'
import { useState } from 'react'
import { formatDate } from '@/lib/helper-func'
import type { UserExperience } from '@/models/all.model'

const formSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required').optional(),
  department: z.string().min(1, 'Department is required').optional(),
  startDate: z.string(),
  endDate: z.string().nullable().optional(),
  description: z.string().optional(),
  skills: z.array(z.string()).optional(),
})

interface FormValues extends z.infer<typeof formSchema> {}

export default function ExperienceForm({
  experienceData,
}: {
  experienceData: UserExperience[]
}) {
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [isCurrentJob, setIsCurrentJob] = useState<boolean>(false)
  const { storedValue, setValue } = useLocalStorage<Partial<FormValues>>(
    'experienceDraft',
    {
      company: '',
      role: '',
      department: '',
      startDate: '',
      endDate: null,
      description: '',
      skills: [],
    },
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: experienceData[0]?.company || storedValue.company || '',
      role: experienceData[0]?.role || storedValue.role || '',
      department: experienceData[0]?.department || storedValue.department || '',
      startDate: experienceData[0]?.startDate || storedValue.startDate || '',
      endDate: experienceData[0]?.endDate || storedValue.endDate || null,
      description:
        experienceData[0]?.description || storedValue.description || '',
      skills: experienceData[0]?.skill.split(',') || storedValue.skills || [],
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) =>
      ovationService.addExperience({
        ...data,
        startDate: formatDate(new Date(data.startDate)),
        endDate: isCurrentJob ? null : formatDate(new Date(data.endDate || '')),
        skill: data.skills?.join(', ') || '',
        role: data.role || '',
        department: data.department || '',
        description: data.description || '',
      }),
    onSuccess: () => {
      toast.success('Experience updated successfully')
      setIsDisabled(true)
    },
    onError: (error) => {
      console.error('Failed to update experience:', error)
      toast.error('Failed to update experience. Please try again later.')
    },
  })

  function handleSubmit(data: FormValues) {
    const formattedData = {
      ...data,
      startDate: formatDate(new Date(data.startDate)),
      endDate: isCurrentJob ? null : formatDate(new Date(data.endDate || '')),
    }
    mutate(formattedData)
    setValue(data as Partial<FormValues>) // Save to local storage on submit
  }

  return (
    <div className="flex flex-col gap-[23px] h-full">
      <p className="text-lg text-[#E6E6E6] font-medium px-10 2xl:px-20">
        Experience
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          onChange={() => setIsDisabled(false)}
        >
          <div className="flex gap-7 flex-col px-4 sm:px-10 2xl:px-20 pb-5">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-sm text-[#B3B3B3]">
                    Company
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex. Google"
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
              name="role"
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
              name="department"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-sm text-[#B3B3B3]">
                    Department
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex. Engineering"
                      {...field}
                      className="h-[47px] text-sm text-[#F8F8FF] border border-solid border-[#4D4D4D] focus:border-solid focus:border-[1px] focus:border-[#4D4D4D]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-[13px]">
              <div className="grid grid-cols-2 gap-[33px]">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel className="text-sm text-[#B3B3B3]">
                        Start Date
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          disableDate={false}
                          placeholder="Select Start Date"
                          onChange={(date) =>
                            field.onChange(formatDate(date || new Date()))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel className="text-sm text-[#B3B3B3]">
                        Finish Date
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          disableDate={isCurrentJob}
                          placeholder="Select Finish Date"
                          onChange={(date) =>
                            field.onChange(formatDate(date || new Date()))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-[7px] mt-[13px]">
                <Checkbox
                  id="work"
                  checked={isCurrentJob}
                  onCheckedChange={(checked) => {
                    setIsCurrentJob(checked as boolean)
                    if (checked) {
                      form.setValue('endDate', null)
                    }
                  }}
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
              name="description"
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
              name="skills"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-sm text-[#B3B3B3]">
                    Skills
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex. JavaScript, React, Node.js"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(',')
                            .map((skill) => skill.trim()),
                        )
                      }
                      value={field.value?.join(', ') || ''}
                      className="h-[47px] text-sm text-[#F8F8FF] border border-solid border-[#4D4D4D] focus:border-solid focus:border-[1px] focus:border-[#4D4D4D]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <SettingsChange
            disabled={isDisabled}
            isLoading={isPending}
            saveDraft={() => setValue(form.getValues())}
          />
        </form>
      </Form>
    </div>
  )
}
