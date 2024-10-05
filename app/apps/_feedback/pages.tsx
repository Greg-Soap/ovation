// FirstPage.tsx
import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { type FormData, ITEMS, SATISFACTION_OPTIONS } from './feedback'

export const FirstPage: React.FC = () => {
  const { control } = useFormContext<FormData>()

  return (
    <>
      <FormField
        control={control}
        name="userEmail"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel className="text-sm ">Email address</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter your email address"
                type="email"
                className="bg-[#18181C] rounded-[8px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="satisfactory"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm ">
              How satisfied are you with the overall experience of using our
              product?
            </FormLabel>
            <FormControl>
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
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="usefulFeature"
        render={() => (
          <FormItem>
            <FormLabel className="text-sm mb-4 ">
              Which feature did you find most valuable or useful?
            </FormLabel>
            <div className="flex flex-col gap-3">
              {ITEMS.map((item: any) => (
                <FormField
                  key={item.id}
                  control={control}
                  name="usefulFeature"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            const updatedItems = checked
                              ? [...field.value, item.id]
                              : field.value?.filter(
                                  (value: any) => value !== item.id,
                                )
                            field.onChange(updatedItems)
                          }}
                          className="border-[#B3B3B3]"
                        />
                      </FormControl>
                      <FormLabel className="font-normal m-0 text-sm text-lighter leading-none">
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
        control={control}
        name="improvement"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel className="text-sm ">
              What improvements would you suggest for the next version? (Choose
              your top 5 in order)
            </FormLabel>
            <FormControl>
              <React.Fragment>
                <div className="mb-2 space-y-1 text-sm text-light">
                  <p>1. Posting timeline + replies</p>
                  <p>
                    2. Post initiatives (connect w/ X Co Hosts, Project Collabs,
                    KOLs, etc)
                  </p>
                  <p>3. Swap tokens (in-app dex, e.g. Uniswap)</p>
                  <p>
                    4. Personalized Marketplace (NFTs based on recommendation)
                  </p>
                  <p>5. Private Communities (Discord-like features)</p>
                  <p>6. Other: _________</p>
                </div>
                <Textarea
                  {...field}
                  placeholder="Tell us your suggestions"
                  className="h-[80px] w-full bg-[#18181C] text-xs text-light rounded-[9px]"
                />
              </React.Fragment>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export const SecondPage: React.FC = () => {
  const { control } = useFormContext<FormData>()

  return (
    <>
      <FormField
        control={control}
        name="confusion"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm ">
              Was there anything you found confusing or difficult to use?
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Tell us what you think"
                className="max-h-[80px] w-full bg-[#18181C] text-xs text-light rounded-[9px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="likelyRecommend"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm ">
              How likely are you to recommend our product to others?
            </FormLabel>
            <FormControl>
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
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="addition"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm ">
              Is there anything else you&apos;d like to add?
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Tell us what you think"
                className="max-h-[80px] w-full bg-[#18181C] text-xs text-light rounded-[9px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="biggestPain"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm ">
              What are your biggest pain points in the NFT industry?
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Tell us what you think"
                className="max-h-[80px] w-full bg-[#18181C] text-xs text-light rounded-[9px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
