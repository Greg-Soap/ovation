import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ITEMS, SATISFACTION_OPTIONS } from './feedback'
import { FormField } from '@/components/customs/custom-form'

const improvementOptions = [
  'Posting timeline + replies',
  'Post initiatives (connect w/ X Co Hosts, Project Collabs, KOLs, etc)',
  'Swap tokens (in-app dex, e.g. Uniswap)',
  'Personalized Marketplace (NFTs based on recommendation)',
  'Private Communities (Discord-like features)',
  'Other: _________',
]

export function FirstPage({ form }: { form: any }) {
  return (
    <>
      <FormField label="Email address" showMessage name="userEmail" form={form}>
        <Input
          placeholder="Enter your email address"
          type="email"
          className="bg-[#18181C] rounded-[8px]"
        />
      </FormField>

      <FormField
        name="satisfactory"
        form={form}
        showMessage
        label="How satisfied are you with the overall experience of using our product?"
      >
        {(field) => (
          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className="pt-2 w-full grid grid-cols-3 lg:grid-cols-5 gap-2"
          >
            {SATISFACTION_OPTIONS.map((option: any) => (
              <RadioGroupItem key={option.value} value={option.value}>
                <span className="text-3xl">{option.emoji}</span>
                <span className="text-sm">{option.label}</span>
              </RadioGroupItem>
            ))}
          </RadioGroup>
        )}
      </FormField>

      <FormField
        name="usefulFeature"
        form={form}
        showMessage
        label="Which feature did you find most valuable or useful?"
      >
        {(field) => (
          <div className="flex flex-col gap-2">
            {ITEMS.map((item: any) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox
                  checked={field.value?.includes(item.id)}
                  onCheckedChange={(checked) => {
                    const updatedItems = checked
                      ? [...field.value, item.id]
                      : field.value?.filter((value: any) => value !== item.id)
                    field.onChange(updatedItems)
                  }}
                  className="border-light"
                />
                <span className="text-sm text-light">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </FormField>

      <FormField
        name="improvement"
        form={form}
        showMessage
        label="What improvements would you suggest for the next version? (Choose your top 5 in order)"
      >
        {(field) => (
          <React.Fragment>
            <div className="mb-2 space-y-1 text-sm text-light">
              {improvementOptions.map((option, index) => (
                <p key={index}>{`${index + 1}. ${option}`}</p>
              ))}
            </div>
            <Textarea
              {...field}
              placeholder="Tell us your suggestions"
              className="h-[80px] w-full bg-[#18181C] text-xs text-light rounded-[9px]"
            />
          </React.Fragment>
        )}
      </FormField>
    </>
  )
}

export function SecondPage({ form }: { form: any }) {
  return (
    <>
      <FormField
        name="confusion"
        form={form}
        showMessage
        label="Was there anything you found confusing or difficult to use?"
      >
        <Textarea
          placeholder="Tell us what you think"
          className="max-h-[80px] w-full bg-[#18181C] text-xs text-light rounded-[9px]"
        />
      </FormField>

      <FormField
        name="likelyRecommend"
        form={form}
        showMessage
        label="How likely are you to recommend our product to others?"
      >
        {(field) => (
          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className="pt-2 w-full grid grid-cols-3 lg:grid-cols-5 gap-2"
          >
            {SATISFACTION_OPTIONS.map((option: any) => (
              <RadioGroupItem key={option.value} value={option.value}>
                <span className="text-3xl">{option.emoji}</span>
                <span className="text-sm">{option.label}</span>
              </RadioGroupItem>
            ))}
          </RadioGroup>
        )}
      </FormField>
      <FormField
        name="addition"
        form={form}
        showMessage
        label="Is there anything else you'd like to add?"
      >
        <Textarea
          placeholder="Tell us what you think"
          className="max-h-[80px] w-full bg-[#18181C] text-xs text-light rounded-[9px]"
        />
      </FormField>

      <FormField
        name="biggestPain"
        form={form}
        showMessage
        label="What are your biggest pain points in the NFT industry?"
      >
        <Textarea
          placeholder="Tell us what you think"
          className="max-h-[80px] w-full bg-[#18181C] text-xs text-light rounded-[9px]"
        />
      </FormField>
    </>
  )
}
