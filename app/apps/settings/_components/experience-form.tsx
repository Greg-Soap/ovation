'use client'

import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/ui/date-picker'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import ovationService from '@/services/ovation.service'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDate } from '@/lib/helper-func'
import type { UserExperience } from '@/models/all.model'
import { FormBase, FormField } from '@/components/customs/custom-form'
import CustomTooltip from '@/components/customs/custom-tooltip'
import CustomDrawer from '@/components/customs/custom-drawer'
import { PlusIcon, PenIcon } from 'lucide-react' // Assuming you're using Lucide icons
import MiniLoader from '@/components/mini-loader'
import { useCallback } from 'react'

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

function ExperienceCard({
  experience,
  onEdit,
}: {
  experience: UserExperience
  onEdit: () => void
}) {
  return (
    <div className="border border-[#FFFFFF14] p-4 rounded-lg mb-4 relative flex flex-col gap-2">
      <h3 className="font-bold">{experience.role}</h3>
      <p className="text-sm text-light">{experience.company}</p>
      <p className="text-sm text-light">{experience.department}</p>
      <p className="text-sm text-lighter">
        {`${formatDate(new Date(experience.startDate))} - ${experience.endDate ? formatDate(new Date(experience.endDate)) : 'Present'}`}
      </p>
      <p className="text-sm text-foreground">{experience.description}</p>
      <p className="text-sm text-light">Skills: {experience.skill}</p>
      <Button
        variant="ghost"
        onClick={onEdit}
        className="absolute top-2 right-2"
      >
        <PenIcon size={16} />
      </Button>
    </div>
  )
}

export default function ExperienceForm({
  experienceData,
  isLoading,
  refetchExperience,
}: {
  experienceData: UserExperience[]
  isLoading: boolean
  refetchExperience: () => void
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingExperience, setEditingExperience] =
    useState<UserExperience | null>(null)
  const queryClient = useQueryClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: '',
      role: '',
      department: '',
      startDate: '',
      endDate: null,
      description: '',
      skills: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) =>
      editingExperience
        ? ovationService.updateExperience(
            editingExperience.id as string,
            {
              ...data,
              startDate: formatDate(new Date(data.startDate)),
              endDate: data.endDate ? formatDate(new Date(data.endDate)) : null,
              skill: data.skills || '',
            } as UserExperience,
          )
        : ovationService.addExperience({
            ...data,
            startDate: formatDate(new Date(data.startDate)),
            endDate: data.endDate ? formatDate(new Date(data.endDate)) : null,
            skill: data.skills || '',
          } as UserExperience),
    onSuccess: () => {
      toast.success(
        `Experience ${editingExperience ? 'updated' : 'added'} successfully`,
      )
      queryClient.invalidateQueries({ queryKey: ['experiences'] })
      refetchExperience()
      setIsDrawerOpen(false)
      setEditingExperience(null)
      form.reset()
    },
    onError: (error) => {
      console.error(
        `Failed to ${editingExperience ? 'update' : 'add'} experience:`,
        error,
      )
      toast.error(
        `Failed to ${editingExperience ? 'update' : 'add'} experience. Please try again later.`,
      )
    },
  })

  const handleDateChange = useCallback((field: any, date: Date | undefined) => {
    field.onChange(date ? formatDate(date) : null)
  }, [])

  function handleSubmit(data: FormValues) {
    const formattedData = {
      ...data,
      startDate: formatDate(new Date(data.startDate)),
      endDate: data.endDate ? formatDate(new Date(data.endDate)) : null,
    }

    mutate(formattedData)
  }

  function handleEdit(experience: UserExperience) {
    setEditingExperience(experience)
    form.reset({
      company: experience.company,
      role: experience.role,
      department: experience.department,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
      skills: experience.skill,
    })
    setIsDrawerOpen(true)
  }

  function handleAddNewExperience() {
    form.reset({
      company: '',
      role: '',
      department: '',
      startDate: '',
      endDate: null,
      description: '',
      skills: '',
    })
    setEditingExperience(null)
    setIsDrawerOpen(true)
  }

  return (
    <div className="flex flex-col gap-[23px] h-full">
      <div className="flex justify-between items-center px-10 2xl:px-20">
        <CustomTooltip content="Add new experience">
          <Button
            variant="outline"
            onClick={handleAddNewExperience}
            className="flex items-center gap-2 w-full"
          >
            Add Experience
            <PlusIcon size={16} />
          </Button>
        </CustomTooltip>
      </div>

      <div className="px-10 2xl:px-20">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <MiniLoader />
          </div>
        ) : (
          <>
            {experienceData?.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                onEdit={() => handleEdit(experience)}
              />
            ))}
          </>
        )}
      </div>

      <CustomDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        size="lg"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-[#4D4D4D]">
            <h2 className="text-2xl font-bold">
              {editingExperience ? 'Edit Experience' : 'Add New Experience'}
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <FormBase form={form} onSubmit={handleSubmit}>
              <div className="flex gap-7 flex-col">
                <FormField
                  name="company"
                  label="Company"
                  showMessage
                  form={form}
                >
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
                          onChange={(date) => handleDateChange(field, date)}
                          placeholder="Select Start Date"
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
                          value={field.value || ''}
                          onChange={(date) => handleDateChange(field, date)}
                          placeholder="Select Finish Date"
                        />
                      )}
                    </FormField>
                  </div>
                  <div className="flex items-center gap-[7px] mt-[13px]">
                    <Checkbox
                      id="work"
                      onCheckedChange={(checked) => {
                        if (checked) {
                          form.setValue('endDate', null)
                        }
                      }}
                      className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-[#0B0A10]"
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
              </div>
            </FormBase>
          </div>
          <div className="p-6 border-t border-[#4D4D4D]">
            <Button
              type="submit"
              isLoading={isPending}
              loadingText={editingExperience ? 'Updating...' : 'Saving...'}
              disabled={isPending}
              className="w-full"
              onClick={form.handleSubmit(handleSubmit)}
            >
              {editingExperience ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      </CustomDrawer>
    </div>
  )
}
