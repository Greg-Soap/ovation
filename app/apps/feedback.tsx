'use client'
import React, { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'

// Define types
type SatisfactionLevel =
  | 'very-unsatisfied'
  | 'unsatisfied'
  | 'indifferent'
  | 'satisfied'
  | 'very-satisfied'

interface Item {
  id: string
  label: string
}

interface SatisfactionOption {
  emoji: string
  value: SatisfactionLevel
  label: string
}

// Constants
const ITEMS: Item[] = [
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'profile', label: 'Profile' },
  { id: 'messaging', label: 'Messaging' },
  { id: 'notification', label: 'Notification' },
]

const SATISFACTION_OPTIONS: SatisfactionOption[] = [
  { emoji: '😥', value: 'very-unsatisfied', label: 'V. unsatisfied' },
  { emoji: '😣', value: 'unsatisfied', label: 'Unsatisfied' },
  { emoji: '😐', value: 'indifferent', label: 'Indifferent' },
  { emoji: '😊', value: 'satisfied', label: 'Satisfied' },
  { emoji: '🤗', value: 'very-satisfied', label: 'V. satisfied' },
]

// Types and constants remain the same

// Zod schema
const formSchema = z.object({
  userEmail: z.string().email({ message: 'Please enter a valid email address.' }),
  satisfactory: z.enum(
    ['very-unsatisfied', 'unsatisfied', 'indifferent', 'satisfied', 'very-satisfied'] as const,
    {
      required_error: 'Please select your satisfaction level.',
    },
  ),
  usefulFeature: z.array(z.string()).min(1, {
    message: 'Please select at least one feature you found valuable.',
  }),
  improvement: z.string().min(2, {
    message: 'Please share your suggestions for improvement (minimum 2 characters).',
  }),
  confusion: z.string().optional(),
  likelyRecommend: z
    .enum(
      ['very-unsatisfied', 'unsatisfied', 'indifferent', 'satisfied', 'very-satisfied'] as const,
      {
        required_error: 'Please indicate how likely you are to recommend our product.',
      },
    )
    .optional(),
  addition: z.string().optional(),
  biggestPain: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export default function FeedbackModal() {
  const [formPage, setFormPage] = useState(1)

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
    mode: 'onSubmit',
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => ovationService.sendFeedback(data),
    onSuccess: () => {
      toast('Thank you for your feedback!')
      form.reset()
      setFormPage(1)
    },
    onError: () => {
      toast('An error occurred. Please try again.')
    },
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutate(data)
  }

  console.log(form.getValues)

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

  const renderFormHeader = () => (
    <div className='flex flex-col gap-2 mb-6'>
      <p className='text-sm text-[#E7F7B9]'>{formPage}/2</p>
      <h2 className='text-xl font-semibold text-[#F8F8FF]'>We&apos;d love your feedback!</h2>
      <p className='text-sm text-[#999999]'>
        Ovation is currently in its MVP (Minimum Viable Product) stage, where we&apos;re focused on
        gathering user feedback to refine our platform. Your input is crucial in helping us improve.
        Fill out the feedback form to enter a Cash Raffle!
      </p>
    </div>
  )

  const renderFirstPage = () => (
    <>
      <FormField
        control={form.control}
        name='userEmail'
        render={({ field }) => (
          <FormItem className='flex flex-col w-full'>
            <FormLabel className='text-sm text-[#F8F8FF]'>Email address</FormLabel>
            <FormControl>
              <Input
                placeholder='Enter your email address'
                className='h-[37px] bg-[#18181C] w-full rounded-[8px] text-xs text-[#B3B3B3]'
                type='email'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='satisfactory'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm text-[#F8F8FF]'>
              How satisfied are you with the overall experience of using our product?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className='pt-2 w-full grid grid-cols-3 lg:grid-cols-5 gap-2'>
                {SATISFACTION_OPTIONS.map((option) => (
                  <RadioGroupItem key={option.value} value={option.value} >
                    <span className='text-3xl'>{option.emoji}</span>
                    <span className='text-sm text-[#B3B3B3]'>{option.label}</span>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='usefulFeature'
        render={() => (
          <FormItem>
            <FormLabel className='text-sm mb-4 text-[#F8F8FF]'>
              Which feature did you find most valuable or useful?
            </FormLabel>
            <div className='space-y-2'>
              {ITEMS.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name='usefulFeature'
                  render={({ field }) => (
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            const updatedItems = checked
                              ? [...field.value, item.id]
                              : field.value?.filter((value) => value !== item.id)
                            field.onChange(updatedItems)
                          }}
                          className='border-[#B3B3B3]'
                        />
                      </FormControl>
                      <FormLabel className='font-normal text-sm text-[#999999] leading-none'>
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='improvement'
        render={({ field }) => (
          <FormItem className='flex flex-col w-full'>
            <FormLabel className='text-sm text-[#F8F8FF]'>
              What improvements would you suggest for the next version?
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder='Tell us your suggestions'
                className='max-h-[88px] w-full bg-[#18181C] text-xs text-[#B3B3B3] rounded-[9px]'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )

  const renderSecondPage = () => (
    <>
      <FormField
        control={form.control}
        name='confusion'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm text-[#F8F8FF]'>
              Was there anything you found confusing or difficult to use?
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder='Tell us what you think'
                className='max-h-[88px] w-full bg-[#18181C] text-xs text-[#B3B3B3] rounded-[9px]'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='likelyRecommend'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm text-[#F8F8FF]'>
              How likely are you to recommend our product to others?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                 className='pt-2 w-full grid grid-cols-3 lg:grid-cols-5 gap-2'>
                {SATISFACTION_OPTIONS.map((option) => (
                  <RadioGroupItem key={option.value} value={option.value}>
                    <span className='text-3xl'>{option.emoji}</span>
                    <span className='text-sm text-[#B3B3B3]'>{option.label}</span>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='addition'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm text-[#F8F8FF]'>
              Is there anything else you&apos;d like to add?
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder='Tell us what you think'
                className='max-h-[88px] w-full bg-[#18181C] text-xs text-[#B3B3B3] rounded-[9px]'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='biggestPain'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm text-[#F8F8FF]'>
              What are your biggest pain points in the NFT industry?
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder='Tell us what you think'
                className='max-h-[88px] w-full bg-[#18181C] text-xs text-[#B3B3B3] rounded-[9px]'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )

  return (
    <div className='px-6 py-8 gap-[30px] bg-[#232227] rounded-2xl flex flex-col  max-w-[700px] mx-auto overflow-y-scroll overflow-x-hidden h-[90vh] w-[90vw]'>
      {renderFormHeader()}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-[80vw] md:w-full'>
          {formPage === 1 ? renderFirstPage() : renderSecondPage()}
          <div className='flex justify-end gap-[10px] w-full'>
            <Button
              type='button'
              variant='outline'
              className='text-[#F8F8FF] text-[10px] rounded-full font-semibold px-3 py-2 outline outline-1 outline-[#29292F] h-fit bg-transparent'
              onClick={() => (formPage === 1 ? form.reset() : setFormPage(1))}>
              {formPage === 1 ? 'Reset' : 'Previous'}
            </Button>
            <Button
              type={formPage === 2 ? 'submit' : 'button'}
              className='text-[10px] font-semibold px-3 py-2 h-fit rounded-full'
              onClick={() => (formPage === 1 ? handleNextClick() : form.handleSubmit(onSubmit)())}
              disabled={isPending}>
              {isPending ? 'Submitting...' : formPage === 1 ? 'Next' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
