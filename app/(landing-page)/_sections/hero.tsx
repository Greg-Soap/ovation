/* eslint-disable @next/next/no-img-element */
'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { BorderBeam } from '@/components/animations/border-beam'
import { FadeText } from '@/components/animations/fade'
import axios from 'axios'
import SuccessMail from '../_components/success'
import { useState } from 'react'
import ovationService from '@/services/ovation.service'
import colors from '@/lib/colors'
import { FormBase, FormField } from '@/components/customs/custom-form'

const formSchema = z.object({
  subscriberEmail: z.string().email({
    message: 'Email must be correct.',
  }),
})

export default function Hero() {
  const [success, setSuccess] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subscriberEmail: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await ovationService.subscribeToNewsletter(values.subscriberEmail)
      setSuccess(true)
      toast.success('Thank you for subscribing to our newsletter!')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { status } = error.response || { status: 0 }

        switch (status) {
          case 409:
            toast.error('Duplicate: This email already exists in our database')
            break
          case 400:
            toast.error("This email doesn't exist")
            break
          case 500:
            toast.error(
              'System: Our system is down temporarily, please try again later',
            )
            break
          default:
            toast.error('An unknown error occurred. Please try again later.')
            break
        }
      } else {
        console.error('Unexpected error:', error)
        toast.error('An unexpected error occurred. Please try again later.')
      }
    }
  }

  return (
    <section className="pt-32 pb-8 flex flex-col items-center justify-center w-fit h-fit bg-vector-one bg-top bg-contain bg-no-repeat relative ">
      <img
        src="assets/images/hero/hero1.png"
        alt=""
        className="absolute hero-img-top-left left-72 top-[70px]"
      />

      <img
        src="assets/images/hero/hero2.png"
        alt=""
        className="absolute right-72 top-[72px] hero-img-top-right"
      />

      <img
        src="assets/images/hero/hero3.png"
        alt=""
        className="absolute left-40 bottom-[290px] hero-img-bottom-left"
      />

      <img
        src="assets/images/hero/hero4.png"
        alt=""
        className="absolute right-40 bottom-[290px] hero-img-bottom-right"
      />

      <div className="text-[10px] leading-[15px] md:text-base text-primary-bright py-[6.5px] px-4 rounded-[20px] border border-[#828774] flex items-center gap-3 bg-custom-gradient mb-10">
        <img
          src="assets/images/Cone.png"
          alt="logo"
          className="w-[14px] h-[14px] md:w-[25px] md:h-[25px]"
        />
        <p>THE LEADING NFT SOCIAL PLATFORM</p>
      </div>

      <FadeText
        direction="up"
        className="text-foreground font-heading text-[30px] leading-[38px] md:text-5xl font-bold text-center w-[55%] mb-3 md:leading-[60px] hero-header"
      >
        Experience the Next-Generation NFT Social Platform
      </FadeText>

      <FadeText
        direction="up"
        className="text-base text-lighter md:text-[22px] md:leading-9  text-center lg:w-[45%]"
      >
        The only web3 social platform offering intelligent profiles,
        personalized portfolios, and a blockchain-enabled UI for a unified NFT
        experience.
      </FadeText>
      {success ? (
        <SuccessMail />
      ) : (
        <div className="lg:w-[50%] w-[90%] flex flex-col gap-4 items-center justify-center mb-10">
          <FormBase
            form={form}
            onSubmit={onSubmit}
            className="w-full mt-10 space-y-8"
          >
            <FormField name="subscriberEmail" form={form} showMessage>
              <div className="relative border border-[#666666] bg-[#FFFFFF1A] rounded-[500px]">
                <Input
                  placeholder="Enter your email"
                  className="text-lg h-[65px]"
                />
                <Button
                  className="absolute top-[20%] right-[15px] text-xs text-[#111115] px-4 py-3 h-fit"
                  type="submit"
                >
                  Submit
                </Button>
                <BorderBeam
                  size={125}
                  duration={8}
                  anchor={90}
                  colorFrom={colors.primary.bright}
                  colorTo={colors.primary.DEFAULT}
                />
              </div>
            </FormField>

            <p className="text-lighter text-center">
              Sign up and be the first to know about our MVP Launch!
            </p>
          </FormBase>
        </div>
      )}
    </section>
  )
}
