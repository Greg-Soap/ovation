'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/ui/date-picker'
import { Textarea } from '@/components/ui/textarea'
import SettingsChange from './settings-change'
import { Checkbox } from '@/components/ui/checkbox'
import ovationService from '@/services/ovation.service'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { useLocalStorage } from '@/lib/use-local-storage'
import { useState, useEffect } from 'react'
import { formatDate } from '@/lib/helper-func'
import type { UserExperience } from '@/models/all.model'
import { FormBase, FormField } from '@/components/customs/custom-form'

const formSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required').optional(),
  department: z.string().min(1, 'Department is required').optional(),
  startDate: z.string(),
  endDate: z.string().nullable().optional(),
  description: z.string().optional(),
  skills: z.string().optional(),
})

interface FormValues extends z.infer<typeof formSchema> {}

export default function ExperienceForm({
  experienceData,
}: {
  experienceData: UserExperience[]
}) {
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [isCurrentJob, setIsCurrentJob] = useState<boolean>(
    !experienceData[0]?.endDate,
  )
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const { storedValue, setValue } = useLocalStorage<Partial<FormValues>>(
    'experienceDraft',
    {
      company: '',
      role: '',
      department: '',
      startDate: '',
      endDate: null,
      description: '',
      skills: '',
    },
  )

  useEffect(() => {
    setIsUpdating(experienceData.length > 0)
  }, [experienceData])

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
      skills: experienceData[0]?.skill || storedValue.skills || '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) =>
      isUpdating
        ? ovationService.updateExperience(experienceData[0]?.id ?? '', {
            ...data,
            startDate: formatDate(new Date(data.startDate)),
            endDate: isCurrentJob
              ? null
              : formatDate(new Date(data.endDate || '')),
            skill: data.skills || '',
            role: data.role || '',
            department: data.department || '',
            description: data.description || '',
          })
        : ovationService.addExperience({
            ...data,
            startDate: formatDate(new Date(data.startDate)),
            endDate: isCurrentJob
              ? null
              : formatDate(new Date(data.endDate || '')),
            skill: data.skills || '',
            role: data.role || '',
            department: data.department || '',
            description: data.description || '',
          }),
    onSuccess: () => {
      toast.success(
        `Experience ${isUpdating ? 'updated' : 'added'} successfully`,
      )
      setIsDisabled(true)
    },
    onError: (error) => {
      console.error(
        `Failed to ${isUpdating ? 'update' : 'add'} experience:`,
        error,
      )
      toast.error(
        `Failed to ${isUpdating ? 'update' : 'add'} experience. Please try again later.`,
      )
    },
  })

  function handleSubmit(data: FormValues) {
    const formattedData = {
      ...data,
      startDate: formatDate(new Date(data.startDate)),
      endDate: isCurrentJob ? null : formatDate(new Date(data.endDate || '')),
    }
    mutate(formattedData)
    setValue(data as Partial<FormValues>)
  }

  return (
    <div className="flex flex-col gap-[23px] h-full">
      <p className="text-lg text-foreground font-medium px-10 2xl:px-20">
        Experience
      </p>

      <FormBase form={form} onSubmit={handleSubmit}>
        <div className="flex gap-7 flex-col px-4 sm:px-10 2xl:px-20 pb-5">
          <FormField name="company" label="Company" showMessage form={form}>
            <Input
              placeholder="ex. Google"
              className="h-[47px] text-sm  border border-solid border-[#4D4D4D] focus:border-solid focus:border-[1px] focus:border-[#4D4D4D]"
            />
          </FormField>
          <FormField name="role" label="Role" showMessage form={form}>
            <Input
              placeholder="ex. CEO"
              className="h-[47px] text-sm  border border-solid border-[#4D4D4D] focus:border-solid focus:border-[1px] focus:border-[#4D4D4D]"
            />
          </FormField>
          <FormField
            name="department"
            label="Department"
            showMessage
            form={form}
          >
            <Input
              placeholder="ex. Engineering"
              className="h-[47px] text-sm  border border-solid border-[#4D4D4D] focus:border-solid focus:border-[1px] focus:border-[#4D4D4D]"
            />
          </FormField>
          <div className="flex flex-col gap-[13px]">
            <div className="grid grid-cols-2 gap-[33px]">
              <FormField
                name="startDate"
                label="Start Date"
                showMessage
                form={form}
              >
                {(field) => (
                  <DatePicker
                    value={field.value}
                    disableDate={false}
                    placeholder="Select Start Date"
                    onChange={(date) =>
                      field.onChange(formatDate(date || new Date()))
                    }
                  />
                )}
              </FormField>
              <FormField
                name="endDate"
                label="Finish Date"
                showMessage
                form={form}
              >
                {(field) => (
                  <DatePicker
                    disableDate={isCurrentJob}
                    value={field.value || ''}
                    placeholder="Select Finish Date"
                    onChange={(date) =>
                      field.onChange(formatDate(date || new Date()))
                    }
                  />
                )}
              </FormField>
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
                className="border-[#CFF073] data-[state=checked]:bg-primary data-[state=checked]:text-[#0B0A10]"
              />
              <label
                htmlFor="work"
                className="text-xs text-[#CCCDD7] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I still work here
              </label>
            </div>
          </div>
        </div>
        <FormField
          name="description"
          label="Description"
          showMessage
          form={form}
        >
          <Textarea
            placeholder="ex. CEO"
            className="text-sm  min-h-[150px] border border-solid border-[#4D4D4D] rounded-[16px] focus:border-solid focus:border-[1px] focus:border-[#4D4D4D]"
          />
        </FormField>
        <FormField name="skills" label="Skills" showMessage form={form}>
          <Input
            placeholder="ex. JavaScript, React, Node.js"
            className="h-[47px] text-sm  border border-solid border-[#4D4D4D] focus:border-solid focus:border-[1px] focus:border-[#4D4D4D]"
          />
        </FormField>
      </FormBase>

      <SettingsChange
        disabled={false}
        isLoading={isPending}
        saveDraft={() => setValue(form.getValues())}
      />
    </div>
  )
}
