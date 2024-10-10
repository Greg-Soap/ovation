'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import { FirstPage, SecondPage } from './pages'
import NextButton from './next-buttons'
import { FormBase } from '@/components/customs/custom-form'

// Define types
export type SatisfactionLevel =
  | 'very-unsatisfied'
  | 'unsatisfied'
  | 'indifferent'
  | 'satisfied'
  | 'very-satisfied'

export interface Item {
  id: string
  label: string
}

export interface SatisfactionOption {
  emoji: string
  value: SatisfactionLevel
  label: string
}

// Constants
export const ITEMS: Item[] = [
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'profile', label: 'Profile' },
  { id: 'messaging', label: 'Messaging' },
  { id: 'notification', label: 'Notification' },
]

export const SATISFACTION_OPTIONS: SatisfactionOption[] = [
  { emoji: '😥', value: 'very-unsatisfied', label: 'V. unsatisfied' },
  { emoji: '😣', value: 'unsatisfied', label: 'Unsatisfied' },
  { emoji: '😐', value: 'indifferent', label: 'Indifferent' },
  { emoji: '😊', value: 'satisfied', label: 'Satisfied' },
  { emoji: '🤗', value: 'very-satisfied', label: 'V. satisfied' },
]

// Zod schema
const formSchema = z.object({
  userEmail: z
    .string()
    .email({ message: 'Please enter a valid email address.' }),
  satisfactory: z.enum(
    [
      'very-unsatisfied',
      'unsatisfied',
      'indifferent',
      'satisfied',
      'very-satisfied',
    ] as const,
    {
      required_error: 'Please select your satisfaction level.',
    },
  ),
  usefulFeature: z.array(z.string()).optional(),
  improvement: z.string().optional(),
  confusion: z.string().optional(),
  likelyRecommend: z
    .enum([
      'very-unsatisfied',
      'unsatisfied',
      'indifferent',
      'satisfied',
      'very-satisfied',
    ] as const)
    .optional(),
  addition: z.string().optional(),
  biggestPain: z.string().optional(),
})

export type FormData = z.infer<typeof formSchema>

export default function FeedbackModal() {
  const [formPage, setFormPage] = React.useState(1)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: '',
      satisfactory: undefined,
      usefulFeature: [],
      improvement: '',
      confusion: '',
      likelyRecommend: undefined,
      addition: '',
      biggestPain: '',
    },
    mode: 'onBlur',
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => ovationService.sendFeedback(data),
    onSuccess: () => {
      toast('Thank you for your feedback!')
      form.reset()
      setFormPage(1)
    },
    onError: () => {
      toast('An error occurred. Please try again.')
    },
  })

  const onSubmit = (data: FormData) => {
    const transformedData = {
      ...data,
      usefulFeature: data.usefulFeature?.join(','),
    }
    mutate(transformedData)
  }

  const handleNextClick = async () => {
    const isValid = await form.trigger([
      'userEmail',
      'satisfactory',
      'usefulFeature',
      'improvement',
    ])
    if (isValid) {
      setFormPage(2)
    }
  }

  const handleSubmit = form.handleSubmit(onSubmit)

  console.log(form.formState.errors)
  console.log(form.getValues())

  const renderFormHeader = () => (
    <div className="flex flex-col gap-2 mb-6">
      <p className="text-sm text-[#E7F7B9]">{formPage}/2</p>
      <h2 className="text-xl font-semibold ">We&apos;d love your feedback!</h2>
      <p className="text-sm text-lighter">
        Ovation is currently in its MVP (Minimum Viable Product) stage, where
        we&apos;re focused on gathering user feedback to refine our platform.
        Your input is crucial in helping us improve. Fill out the feedback form
        to enter a Cash Raffle!
      </p>
    </div>
  )

  return (
    <div className="px-6 py-8 gap-[30px] bg-[#232227] rounded-2xl flex flex-col max-w-[700px] mx-auto overflow-y-scroll overflow-x-hidden h-[90vh] w-fit sm:w-full">
      {renderFormHeader()}
      <FormBase
        form={form}
        onSubmit={handleSubmit}
        className="space-y-6 w-[80vw] md:w-full"
      >
        {formPage === 1 ? (
          <FirstPage form={form} />
        ) : (
          <SecondPage form={form} />
        )}
        <div className="flex justify-end gap-[10px] w-full">
          <Button
            type="button"
            variant="outline"
            className=" text-[10px] rounded-full font-semibold px-3 py-2 outline outline-1 outline-[#29292F] h-fit bg-transparent"
            onClick={() => (formPage === 1 ? form.reset() : setFormPage(1))}
          >
            {formPage === 1 ? 'Reset' : 'Previous'}
          </Button>
          <NextButton
            formPage={formPage}
            isPending={isPending}
            onNextClick={handleNextClick}
            onSubmit={handleSubmit}
          />
        </div>
      </FormBase>
    </div>
  )
}
