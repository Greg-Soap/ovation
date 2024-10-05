'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { BorderBeam } from '@/components/animations/border-beam'
import axios from 'axios'
import ovationService from '@/services/ovation.service'

const formSchema = z.object({
  subscriberEmail: z.string().email({
    message: 'Email must be correct.',
  }),
})

export function Newsletter() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subscriberEmail: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await ovationService.subscribeToNewsletter(values.subscriberEmail)

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
    <section className="pt-[60px] md:pt-[120px] pb-[40px] md:pb-[80px] container flex items-center gap-6 md:gap-12 flex-col md:flex-row ">
      <div className="w-full">
        <h2 className="text-2xl font-heading uppercase font-bold">subscribe</h2>
        <p className="text-base md:text-lg text-lighter">
          Learn about the Ovation alpha launch and other important updates.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full "
        >
          <FormField
            control={form.control}
            name="subscriberEmail"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <div className="relative border border-[#FFFFFF33] bg-[#FFFFFF0D] rounded-full">
                    <Input
                      placeholder="Your email address"
                      {...field}
                      className="h-[65px]"
                    />
                    <Button
                      className="absolute top-[20%] right-[15px]"
                      type="submit"
                    >
                      Subscribe
                    </Button>
                    <BorderBeam
                      size={125}
                      duration={8}
                      anchor={90}
                      colorFrom="#C1FE17"
                      colorTo="#bbff00"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  )
}
