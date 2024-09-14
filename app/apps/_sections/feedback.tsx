'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState } from 'react'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Email must be correct.',
  }),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  feedback: z.string().min(2, {
    message: 'Cannot be empty',
  }),
  satisfaction: z.enum(
    [
      'very-unsatisfied',
      'unsatisfied',
      'indifferent',
      'satisfied',
      'very-satisfied',
    ],
    {
      required_error: 'You need to select a notification type.',
    },
  ),
  difficulty: z.string().min(2, {
    message: 'Cannot be empty',
  }),
  recommendation: z.enum(
    [
      'very-unsatisfied',
      'unsatisfied',
      'indifferent',
      'satisfied',
      'very-satisfied',
    ],
    {
      required_error: 'You need to select a notification type.',
    },
  ),
  extrainfo: z.string().min(2, {
    message: 'Cannot be empty',
  }),
  painpoint: z.string().min(2, {
    message: 'Cannot be empty',
  }),
})

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values)
  toast('Thank you for subscribing to our newsletter!')
}

export function FeedbackModal() {
  const [formPage, setFormPage] = useState(1)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      items: [],
      feedback: '',
    },
  })

  function renderFirstForm() {
    return (
      <div className="px-6 py-8 gap-[30px] bg-[#232227] rounded-2xl flex flex-col min-w-[638px] w-[700px] max-h-[95%] overflow-auto">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-[#E7F7B9]">1/2</p>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold text-[#F8F8FF]">
              We'd love your feedback!
            </p>
            <p className="text-sm text-[#999999]">
              Ovation is currently in its MVP (Minimum Viable Product) stage,
              where we're focused on gathering user feedback to refine our
              platform. Your input is crucial in helping us improve. Fill out
              the feedback form to enter a Cash Raffle!
            </p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => setFormPage(2))}
            className="w-full flex flex-wrap gap-x-5 gap-y-[30px]"
          >
            <div className="flex flex-wrap w-full gap-x-5 gap-y-[30px]">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col min-w-[267px] w-[48%] relative">
                    <FormLabel className="text-sm text-[#F8F8FF]">
                      1. Username
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          placeholder=""
                          className="h-[37px] bg-[#18181C] w-full rounded-[8px] pl-[30px] text-xs text-[#B3B3B3]"
                          type="text"
                          {...field} // Bind the field to the input
                        />
                        <p className="text-xs absolute text-[#B3B3B3] top-[10px] left-4">
                          @
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-[48.5%] min-w-[267px]">
                    <FormLabel className="text-sm text-[#F8F8FF]">
                      2. Email address
                    </FormLabel>
                    <FormControl {...field}>
                      <Input
                        placeholder="Enter your email address"
                        className="h-[37px] bg-[#18181C] w-full rounded-[8px] text-xs text-[#B3B3B3]"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="satisfaction"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm text-[#F8F8FF]">
                    3. How satisfied are you with the overall experience of
                    using our product?
                  </FormLabel>
                  <FormControl className="p-0">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="w-full flex justify-between pt-0"
                    >
                      {satisfaction.map((item, index) => (
                        <FormItem className="flex items-center" key={index}>
                          <FormControl>
                            <RadioGroupItem
                              value={item.value}
                              className="hidden"
                            />
                          </FormControl>
                          <FormLabel className="font-normal flex flex-col items-center justify-center gap-2 border border-[#4D4D4D] rounded-[10px] w-[97px] h-[86px]">
                            <p className="text-[30px]">{item.emoji}</p>
                            <p className="text-sm text-[#B3B3B3]">
                              {item.label}
                            </p>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm mb-4 text-[#F8F8FF]">
                    4. How satisfied are you with the overall experience of
                    using our product?
                  </FormLabel>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id,
                                        ),
                                      )
                                }}
                                className="border-[#B3B3B3]"
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-sm text-[#999999] leading-none">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel className="text-sm text-[#F8F8FF]">
                    5. What improvements would you suggest for the next version?
                    (Choose your top 5 in order)
                  </FormLabel>
                  <FormControl {...field}>
                    <Textarea
                      placeholder="Tell us what you think"
                      className="max-h-[88px] w-full bg-[#18181C] text-xs text-[#B3B3B3] rounded-[9px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="p-[1px] bg-[#29292F] w-full" />

            <div className="flex justify-end gap-[10px] w-full">
              <Button
                variant={'default'}
                onClick={() => form.reset()}
                className="text-[#F8F8FF] text-[10px] font-semibold px-3 py-2 outline outline-1 outline-[#29292F] h-fit bg-transparent"
              >
                Discard
              </Button>
              <Button
                variant={'default'}
                type="submit"
                className="text-[10px] font-semibold px-3 py-2 outline-[#29292F] h-fit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    )
  }

  function renderSecondForm() {
    return (
      <div className="px-6 py-8 gap-[30px] bg-[#232227] rounded-2xl flex flex-col min-w-[638px] w-[700px] max-h-[95%] overflow-auto">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-[#E7F7B9]">2/2</p>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold text-[#F8F8FF]">
              We'd love your feedback!
            </p>
            <p className="text-sm text-[#999999]">
              Ovation is currently in its MVP (Minimum Viable Product) stage,
              where we're focused on gathering user feedback to refine our
              platform. Your input is crucial in helping us improve. Fill out
              the feedback form to enter a Cash Raffle!
            </p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-wrap gap-x-5 gap-y-[30px]"
          >
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel className="text-sm text-[#F8F8FF]">
                    6. Was there anything you found confusing or difficult to
                    use?
                  </FormLabel>
                  <FormControl {...field}>
                    <Textarea
                      placeholder="Tell us what you think"
                      className="max-h-[88px] w-full bg-[#18181C] text-xs text-[#B3B3B3] rounded-[9px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recommendation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm text-[#F8F8FF]">
                    7. How likely are you to recommend our product to others?
                  </FormLabel>
                  <FormControl className="p-0">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="w-full flex justify-between pt-0"
                    >
                      {satisfaction.map((item, index) => (
                        <FormItem className="flex items-center" key={index}>
                          <FormControl>
                            <RadioGroupItem
                              value={item.value}
                              className="hidden"
                            />
                          </FormControl>
                          <FormLabel className="font-normal flex flex-col items-center justify-center gap-2 border border-[#4D4D4D] rounded-[10px] w-[97px] h-[86px]">
                            <p className="text-[30px]">{item.emoji}</p>
                            <p className="text-sm text-[#B3B3B3]">
                              {item.label}
                            </p>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="extrainfo"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel className="text-sm text-[#F8F8FF]">
                    8. Is there anything else you’d like to add?
                  </FormLabel>
                  <FormControl {...field}>
                    <Textarea
                      placeholder="Tell us what you think"
                      className="max-h-[88px] w-full bg-[#18181C] text-xs text-[#B3B3B3] rounded-[9px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="painpoint"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel className="text-sm text-[#F8F8FF]">
                    9. What are your biggest pain points in the nft industry?
                  </FormLabel>
                  <FormControl {...field}>
                    <Textarea
                      placeholder="Tell us what you think"
                      className="max-h-[88px] w-full bg-[#18181C] text-xs text-[#B3B3B3] rounded-[9px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="p-[1px] bg-[#29292F] w-full" />

            <div className="flex justify-end gap-[10px] w-full">
              <Button
                variant={'default'}
                onClick={() => form.reset()}
                className="text-[#F8F8FF] text-[10px] font-semibold px-3 py-2 outline outline-1 outline-[#29292F] h-fit bg-transparent"
              >
                Discard
              </Button>
              <Button
                variant={'default'}
                type="submit"
                className="text-[10px] font-semibold px-3 py-2 outline-[#29292F] h-fit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    )
  }

  return formPage === 1 ? renderFirstForm() : renderSecondForm()
}

interface Item {
  id: string
  label: string
}
interface Satisfaction {
  emoji: string
  value: string
  label: string
}

const items: Item[] = [
  {
    id: 'leaderboard',
    label: 'Leaderboard',
  },
  {
    id: 'profile',
    label: 'Profile',
  },
  {
    id: 'messaging',
    label: 'Messaging',
  },
  {
    id: 'notification',
    label: 'Notification',
  },
] as const

const satisfaction: Satisfaction[] = [
  { emoji: '😥', value: 'very-unsatisfied', label: 'V. unsatisfied' },
  { emoji: '😣', value: 'unsatisfied', label: 'Unsatisfied' },
  { emoji: '😐', value: 'indifferent', label: 'Indifferent' },
  { emoji: '😊', value: 'satisfied', label: 'satisfied' },
  { emoji: '🤗', value: 'very-satisfied', label: 'V. satisfied' },
]
