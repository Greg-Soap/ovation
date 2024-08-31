'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormControl, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
})

export default function PasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <form className='pt-[50px] h-full flex flex-col w-full'>
        <div className='pl-20 h-full flex gap-7 flex-col box-border '>
          <FormField
            name='oldPassword'
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Input your old password'
                    className=' max-w-[940px] h-[58px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                    type='password'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name='newPassword'
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Input your new password'
                    className=' max-w-[940px] h-[58px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                    type='password'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name='confirmPassword'
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='confirm your new password'
                    className=' max-w-[940px] h-[58px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                    type='password'
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className=' flex  gap-4  items-center bg-[#18181C] sticky justify-end lg:pr-20  bottom-0  w-full h-[130px]   text-red-500'>
          <Button
            variant={'outline'}
            className='h-[56px] font-semibold text-white rounded-full   w-[150px] bg-[#18181C] border-[1px] border-[#353538]'>
            Cancel changes
          </Button>
          <Button className='  h-[56px] font-semibold  rounded-full w-[150px]'>Save changes</Button>
        </div>
      </form>
    </Form>
  )
}
