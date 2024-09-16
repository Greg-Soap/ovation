'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import PathICon from '@/components/icons/pathIcon'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import arrow from '@/public/assets/images/arrow-right.png'
import Bnb from '@/public/assets/images/ovationWallets/ovationWalletIcon2'
import { useEffect, useState } from 'react'
import WalletConnectComponent from './WalletConnectComponent'
import ovationService from '@/services/ovation.service'
import { useQuery } from '@tanstack/react-query'

const formSchema = z.object({
  personalInfo: z.object({
    displayName: z.string(),
    email: z.string().email('Input a valid email address'),
    username: z.string(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      ),
  }),
  userPath: z.object({
    pathId: z.string().uuid(),
  }),
  userWallet: z.object({
    walletAddress: z.string(),
    walletTypeId: z.string().uuid().nullable(),
    chain: z.string(),
    metadata: z.string().nullable(),
  }),
})

interface Props {
  setOptionalLeft: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AccountForm({ setOptionalLeft }: Props) {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [active, setActive] = useState('')
  const [isManualWallet, setIsManualWallet] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        displayName: '',
        email: '',
        username: '',
        password: '',
      },
      userPath: {
        pathId: '',
      },
      userWallet: {
        walletAddress: '',
        walletTypeId: null,
        chain: '',
        metadata: null,
      },
    },
  })

  useEffect(() => {
    if (page === 1) {
      setOptionalLeft(true)
    } else {
      setOptionalLeft(false)
    }
  }, [page, setOptionalLeft])

  const { data: pathOptions } = useQuery({
    queryKey: ['path'],
    queryFn: () => ovationService.getPath(),
  })

  function renderPersonalInfoForm() {
    return (
      <form onSubmit={form.handleSubmit(() => setPage(2))} className='flex flex-col gap-7'>
        <div className='flex items-center justify-between mb-5'>
          <span className='w-[46%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]  text-[#C1C0C6]' />
          <p className='text-[10px] font-medium text-[#C1C0C6]'>OR</p>
          <span className='w-[46%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]' />
        </div>
        <FormField
          control={form.control}
          name='personalInfo.displayName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className='h-[46px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                  placeholder='kvngCZ'
                  type='text'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='personalInfo.username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className='h-[46px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                  placeholder='chang_zhao'
                  type='text'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='personalInfo.email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className='h-[46px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                  placeholder='cz@blockchain.com'
                  type='email'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='personalInfo.password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className='h-[46px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                  placeholder='*********'
                  type='password'
                />
              </FormControl>
              <p className='text-xs text-[#B3B3B3] mt-2'>
                Password must be at least 8 characters long and contain at least one uppercase
                letter, one lowercase letter, one number, and one special character.
              </p>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          onClick={() => setPage(2)}
          className='w-full h-[52px] hover:scale-95 text-sm font-semibold'>
          Continue
        </Button>
      </form>
    )
  }

  function renderPathSelection() {
    const pathColors = ['#cff073', '#EF91FF', '#FF9B02', '#0094FF']
    const pathBackgrounds = ['#283502', '#42044C', '#2F2009', '#0B293F']

    function handleButtonClick(pathId: string) {
      form.setValue('userPath.pathId', pathId)
      setActive(pathId)
    }

    return (
      <form onSubmit={form.handleSubmit(() => setPage(3))} className='flex flex-col gap-7'>
        <FormField
          control={form.control}
          name='userPath.pathId'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex flex-col md:flex-row items-center flex-wrap w-full gap-4'>
                  {pathOptions?.data?.data?.length === 0 && <p>No path options available</p>}
                  {pathOptions?.data?.data?.map((option, index) => (
                    <Button
                      key={option.pathId}
                      onClick={() => handleButtonClick(option.pathId)}
                      type='button'
                      className={`${
                        active === option.pathId
                          ? `border-[${pathColors[index % 4]}] scale-95 shadow-lg`
                          : 'border-[#353538]'
                      } h-[234px] hover:scale-95 max-w-[242px] bg-transparent border-[1px] flex flex-col gap-2 rounded-lg`}>
                      <span
                        className={`rounded-full mb-5 w-9 h-9 bg-[${pathBackgrounds[index % 4]}] items-center flex justify-center`}>
                        <PathICon strokeLine={pathColors[index % 4]} />
                      </span>
                      <h3 className='font-semibold text-sm text-white'>
                        {option.name.toUpperCase()}
                      </h3>
                      <p className='text-[11px] text-wrap text-[#B3B3B3]'>{option.description}</p>
                    </Button>
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className='hover:scale-95 w-full h-[52px] text-sm font-semibold'>
          Continue
        </Button>
      </form>
    )
  }

  function renderWalletSelection() {
    return (
      <WalletConnectComponent
        setIsManualWallet={setIsManualWallet}
        onWalletConnected={(account) => {
          form.setValue('userWallet.walletAddress', account)
          setPage(4)
        }}
        onWalletDisconnected={() => {
          /* Handle disconnection */
        }}
      />
    )
  }

  function renderManualWalletInput() {
    return (
      <form onSubmit={form.handleSubmit(() => setPage(4))} className='flex flex-col gap-7'>
        <FormField
          control={form.control}
          name='userWallet.walletAddress'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className='h-[46px] bg-transparent border-[#353538] border-solid border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full'
                  placeholder='Enter your wallet address'
                  type='text'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full text-sm font-semibold h-[53px]'>
          Continue
        </Button>
      </form>
    )
  }

  function renderConfirmation() {
    const handleClick = () => {
      toast.success('Profile created successfully')
      router.push('/apps/discover')
    }

    return (
      <div className=' flex flex-col gap-7'>
        <div className='flex text-white text-sm items-center justify-between p-4 border-[1px] border-[#353538] rounded-full'>
          <p>OXrvsh.srvydubhjnikm</p>
          <Bnb />
        </div>
        <Button onClick={handleClick} className=' w-full text-sm font-semibold h-[53px]'>
          Make my profile
        </Button>
        <p className='text-center mb-4'>
          By clicking &quot;make my profile&quot; you agree to our privacy terms, code of conduct
          and Conditions.
        </p>
        <div className='flex gap-2 items-center justify-center'>
          <p> Not you?</p> {''}
          <Button onClick={() => setPage(3)} className='h-6 bg-transparent text-[#Cff073]'>
            Change wallet
          </Button>
          <Image src={arrow} alt='arrow' />
        </div>
      </div>
    )
  }

  function renderCurrentForm() {
    switch (page) {
      case 1:
        return renderPersonalInfoForm()
      case 2:
        return renderPathSelection()
      case 3:
        return isManualWallet ? renderManualWalletInput() : renderWalletSelection()
      case 4:
        return renderConfirmation()
      default:
        return null
    }
  }

  return (
    <div className='flex flex-col gap-11'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-semibold text-white items-center justify-between  flex'>
            <span> Create Account</span>
          </h1>
          <div className='flex gap-1 items-center justify-start'>
            <button
              type='button'
              onClick={() => setPage(1)}
              className={`${page >= 1 ? 'text-[#E6E6E6] font-semibold' : ''} text-xs md:text-base  text-center flex gap-0 w-fit cursor-pointer`}>
              Personal info
            </button>
            <ChevronRight color='#cff073' height={'14px'} width={'14px'} />
            <button
              type='button'
              onClick={() => setPage(2)}
              className={`${page >= 2 ? 'text-[#E6E6E6] font-semibold' : ''} text-xs md:text-base  cursor-pointer`}>
              Choose path
            </button>
            <ChevronRight color='#cff073' height={'14px'} width={'14px'} />
            <button
              type='button'
              onClick={() => setPage(3)}
              className={`${page >= 3 ? 'text-[#E6E6E6] font-semibold' : ''} text-xs md:text-base  cursor-pointer`}>
              Connect wallet
            </button>
            <ChevronRight color='#cff073' height={'14px'} width={'14px'} />
          </div>
        </div>
      </div>
      <Form {...form}>{renderCurrentForm()}</Form>
    </div>
  )
}
