import { useFormContext } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowUpRight } from 'lucide-react'
import OvationService from '@/services/ovation.service'
import { FormField } from '@/components/customs/custom-form'
import colors from '@/lib/colors'
import GoogleAuth from '../../../../components/google-auth'
import { useState } from 'react'

export default function PersonalInfoForm({
  setPage,
}: {
  setPage: (page: number) => void
}) {
  const [username, setUsername] = useState('')

  const form = useFormContext()
  const { mutate: checkUsername, isPending } = useMutation({
    mutationFn: OvationService.checkUsername,
    onSuccess: () => {
      form.clearErrors('personalInfo.username')

      if (form.getValues('type') == 'Google') {
        const googleObject = JSON.parse(
          window.localStorage.getItem('google_info') as string,
        )
        form.setValue('personalInfo.displayName', googleObject.name)
        form.setValue('personalInfo.email', googleObject.email)
        form.setValue('personalInfo.username', username)
      }
      setPage(2)
    },
    onError: () => {
      form.setValue('type', 'Normal')
      form.setError('personalInfo.username', {
        type: 'manual',
        message: 'This username is already taken',
      })
    },
  })

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValid = await form.trigger([
      'personalInfo.displayName',
      'personalInfo.email',
      'personalInfo.username',
      'personalInfo.password',
    ])
    if (isValid) {
      const _username = form.getValues('personalInfo.username')
      form.setValue('type', 'Normal')
      checkUsername(_username)
    }
  }
  function generateRandomValue() {
    let result = Math.floor(Math.random() * 1000)
    return result
  }

  const signUpGoogle = async ({ googleObject }: any) => {
    const username = googleObject.email.split('@')[0]
    const formedusername = username + generateRandomValue()

    try {
      setUsername(formedusername)
      checkUsername(formedusername)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-7">
      {/* <div className="  flex justify-between mb-4">
          <Button
            onClick={loginGoogle}
            className="p-4 text-[10px] font-semibold md:text-base w-full bg-white flex gap-4"
          >
            <Google />
            <p>Login with Google</p>
          </Button>
        </div> */}
      {/* <div className="flex items-center justify-between mb-5">
          <span className="w-[46%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]  text-[#C1C0C6]" />
          <p className="text-[10px] font-medium text-[#C1C0C6]">OR</p>
          <span className="w-[46%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]" />
        </div> */}
      <GoogleAuth func={signUpGoogle} form={form} />
      <FormField
        name="personalInfo.displayName"
        form={form}
        label="Display name"
        showMessage
      >
        <Input
          className="h-[46px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
          placeholder="kvngCZ"
          type="text"
        />
      </FormField>
      <FormField
        name="personalInfo.username"
        form={form}
        label="Username"
        showMessage
      >
        <Input
          className="h-[46px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
          placeholder="kvngCZ"
          type="text"
        />
      </FormField>
      <FormField
        name="personalInfo.email"
        form={form}
        label="Email"
        showMessage
      >
        <Input
          className="h-[46px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
          placeholder="cz@blockchain.com"
          type="email"
        />
      </FormField>
      <FormField
        name="personalInfo.password"
        form={form}
        label="Password"
        showMessage
      >
        {(field) => (
          <>
            <PasswordInput
              placeholder="*********"
              value={field.value}
              onChange={field.onChange}
            />
            <p className="text-xs text-light mt-2">
              Password should be at least 8 characters long and contain at least
              one uppercase letter, one lowercase letter, one number, and one
              special character.
            </p>
          </>
        )}
      </FormField>

      <Button
        type="submit"
        className="w-full h-[52px] hover:scale-95 text-sm font-semibold"
        disabled={isPending}
      >
        {isPending ? 'Checking username...' : 'Continue'}
      </Button>
      <div className="flex items-center justify-center w-full text-xs">
        <p>
          Already have an account?{' '}
          <a href="/login" className="text-primary">
            Login
          </a>{' '}
        </p>
        <ArrowUpRight className="w-4 h-4" color={colors.primary.DEFAULT} />
      </div>
    </form>
  )
}
