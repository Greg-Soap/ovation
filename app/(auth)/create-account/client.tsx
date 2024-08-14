'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import PathICon from '@/components/icons/pathIcon'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import arrow from '@/public/assets/images/arrow-right.png'
import Bnb from '@/public/assets/images/ovationWallets/ovationWalletIcon2'

import Google from '@/public/assets/images/ovationAuthGoogle'
import Ether from '@/public/assets/images/ovationAuthEthereum'
import walletData from './_data'
import { useState } from 'react'

const formSchema = z.object({
  email: z.string().email('Input a valid email address'),
  password: z.string(),
  passwordConfirm: z.string(),
  displayName: z.string(),
  userName: z.string(),
  path: z.string().optional(),
  wallet: z.string(),
})

export default function AccountForm() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [active, setActive] = useState(0)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      userName: '',
      displayName: '',
      path: '',
      wallet: '',
      password: '',
      passwordConfirm: '',
    },
  })
  const { setValue } = useForm()

  function formSubmit() {
    console.log('submitted')
    toast.success('submitted')
  }

  function renderForm1() {
    return (
      <div>
        <div className="  flex justify-between mb-4">
          <Button className="text-[10px] font-semibold p-4 md:text-base w-[48%] bg-white flex gap-4">
            {/* <Image src={ether} alt="ether image" /> */}
            <Ether />
            <p>Login with Wallet</p>
          </Button>
          <Button className="p-4 text-[10px] font-semibold md:text-base w-[48%] bg-white flex gap-4">
            {/* <Image src={Google} alt="google image" /> */}
            <Google />
            <p>Login with Google</p>
          </Button>
        </div>
        <div className="flex items-center justify-between mb-5">
          <span className="w-[46%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]  text-[#C1C0C6]" />
          <p className="text-[10px] font-medium text-[#C1C0C6]">OR</p>
          <span className="w-[46%] h-[1px] border-[#C1C0C6] border-b-0 border-[1px]" />
        </div>
        <form
          onSubmit={form.handleSubmit(formSubmit)}
          className="flex flex-col gap-7"
        >
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display name</FormLabel>
                <FormControl {...field}>
                  <Input
                    className="h-[46px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                    placeholder="kvngCZ"
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl {...field}>
                  <Input
                    className="h-[46px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                    placeholder="chang_zhao"
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl {...field}>
                  <Input
                    className="h-[46px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                    placeholder="cz@blockchain.com"
                    type="email"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl {...field}>
                  <Input
                    className="h-[46px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                    placeholder="*********"
                    type="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl {...field}>
                  <Input
                    className="h-[46px] bg-transparent border-[#353538] border-solid  border-[1px] focus:border-solid focus:border-[1px] focus:border-[#353538] rounded-full"
                    placeholder="*********"
                    type="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="w-full h-[52px] hover:scale-95 text-sm font-semibold"
            onClick={() => setPage(2)}
          >
            Continue
          </Button>
        </form>
      </div>
    )
  }

  function renderForm2() {
    function handleButtonClick(num: number, value: string) {
      setValue('path', value)
      setActive(num)
    }
    return (
      <form
        onSubmit={form.handleSubmit(formSubmit)}
        className="flex flex-col gap-7"
      >
        <FormField
          control={form.control}
          name="path"
          render={({ field }) => (
            <FormItem>
              <FormControl {...field}>
                <div className="flex flex-col md:flex-row items-center  flex-wrap  w-full gap-4">
                  <Button
                    onClick={() => handleButtonClick(1, 'Artist')}
                    className={` ${active === 1 ? 'border-[#cff073] border-1 shadow-2xl scale-95' : 'border-[#353538]'} h-[234px] hover:scale-95 max-w-[242px]  bg-transparent border-[1px] flex flex-col gap-2 rounded-lg`}
                  >
                    <span className="rounded-full mb-5 w-9 h-9 bg-[#283502] items-center flex justify-center">
                      <PathICon />
                    </span>
                    <h3 className="font-semibold text-sm text-white">ARTIST</h3>
                    <p className="text-[11px] text-wrap  text-[#B3B3B3]">
                      Ovation elevates the experience of artists, enhancing
                      their visibility and reputation...
                    </p>
                  </Button>
                  <Button
                    onClick={() => handleButtonClick(2, 'Enthusiast')}
                    className={`${active === 2 ? 'border-[#EF91FF] scale-95' : 'border-[#353538]'} h-[234px] hover:scale-95 max-w-[242px]  bg-transparent border-[1px] flex flex-col gap-2 rounded-lg`}
                  >
                    <span className="rounded-full mb-5 w-9 h-9 bg-[#42044C] items-center flex justify-center">
                      <PathICon strokeLine="#EF91FF" />
                    </span>
                    <h3 className="font-semibold text-sm text-white">
                      ENTHUSIAST
                    </h3>
                    <p className="text-[11px] text-wrap text-[#B3B3B3]">
                      ENTHUSIAST Ovation allows enthusiasts to connect with
                      their favourite creators and communities...
                    </p>
                  </Button>
                  <Button
                    onClick={() => handleButtonClick(3, 'Project')}
                    className={` ${active === 3 ? 'border-[#FF9B02] scale-95' : 'border-[#353538]'} h-[234px] hover:scale-95 max-w-[242px]  bg-transparent border-[1px] flex flex-col gap-2 rounded-lg`}
                  >
                    <span className="rounded-full mb-5 w-9 h-9 bg-[#2F2009] items-center flex justify-center">
                      <PathICon strokeLine="#FF9B02" />
                    </span>
                    <h3 className="font-semibold text-sm text-white">
                      PROJECT
                    </h3>
                    <p className="text-[11px] text-wrap text-[#B3B3B3]">
                      Ovation elevates the experience of artists, enhancing
                      their visibility and reputation...
                    </p>
                  </Button>
                  <Button
                    onClick={() => handleButtonClick(4, 'Trader')}
                    className={` ${active === 4 ? 'border-[#0094FF] scale-95 shadow-lg' : 'border-[#353538]'} h-[234px] hover:scale-95 max-w-[242px]  bg-transparent border-[1px] flex flex-col gap-2 rounded-lg`}
                  >
                    <span className="rounded-full mb-5 w-9 h-9 bg-[#0B293F] items-center flex justify-center">
                      <PathICon strokeLine="#0094FF" />
                    </span>
                    <h3 className="font-semibold text-sm text-white">TRADER</h3>
                    <p className="text-[11px] text-wrap text-[#B3B3B3]">
                      Ovation allows traders to track, trade, and barter NFTs.
                      Traders can explore...
                    </p>
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          onClick={() => setPage(3)}
          className="hover:scale-95 w-full h-[52px] text-sm font-semibold"
        >
          Continue
        </Button>
      </form>
    )
  }

  function renderForm3() {
    return (
      <div className="flex flex-col gap-7">
        <div className="grid grid-cols-2 gap-4">
          {walletData.map((wallet) => (
            <Button
              key={wallet.id}
              onClick={() => setPage(4)}
              className="text-start flex justify-between p-2 md:p-[1rem] h-[58px] w-full md:w-[242px] text-xs md:text-sm font-semibold text-white border-[1px] border-solid bg-transparent border-[#353538]"
            >
              <p> {wallet.name}</p>
              {/* <Image
                className="w-6 h-6s"
                src={wallet.img}
                alt={`${wallet.name} icon`}
              /> */}
              <wallet.img />
            </Button>
          ))}
        </div>

        <div className="flex gap-2 items-center justify-center">
          <p>Wallet not listed?</p> {''}
          <Link href="" className="h-6 text-[#Cff073]">
            Connect manually
          </Link>
          <Image src={arrow} alt="arrow" />
        </div>
      </div>
    )
  }

  function renderForm4() {
    const handleClick = () => {
      toast.success('Profile created successfully')
      router.push('/apps/discover')
    }

    return (
      <div className=" flex flex-col gap-7">
        <div className="flex text-white text-sm items-center justify-between p-4 border-[1px] border-[#353538] rounded-full">
          <p>OXrvsh.srvydubhjnikm</p>
          <Bnb />
        </div>
        <Button
          onClick={() => handleClick()}
          className=" w-full text-sm font-semibold h-[53px]"
        >
          Make my profile
        </Button>
        <p className="text-center mb-4">
          By clicking &quot;make my profile&quot; you agree to our privacy
          terms, code of conduct and Conditions.
        </p>
        <div className="flex gap-2 items-center justify-center">
          <p> Not you?</p> {''}
          <Button
            onClick={() => setPage(3)}
            className="h-6 bg-transparent text-[#Cff073]"
          >
            Change wallet
          </Button>
          <Image src={arrow} alt="arrow" />
        </div>
      </div>
    )
  }

  function renderCurrentForm() {
    switch (page) {
      case 1:
        return renderForm1()
      case 2:
        return renderForm2()
      case 3:
        return renderForm3()
      case 4:
        return renderForm4()
    }
  }

  return (
    <div className="flex flex-col gap-11">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-white items-center justify-between  flex">
            <span> Create Account</span>
            <Button
              onClick={() => setPage(3)}
              className={`${page === 2 ? 'visible' : 'hidden'} bg-white text-black font-semibold text-sm`}
            >
              Skip
            </Button>
          </h1>
          <div className="flex gap-1 items-center justify-start">
            <p
              onClick={() => setPage(1)}
              className={`${page >= 1 ? 'text-[#E6E6E6] font-semibold' : ''} text-xs md:text-base  text-center flex gap-0 w-fit cursor-pointer`}
            >
              Personal info
            </p>
            <ChevronRight color="#cff073" height={'14px'} width={'14px'} />
            <p
              onClick={() => setPage(2)}
              className={`${page >= 2 ? 'text-[#E6E6E6] font-semibold' : ''} text-xs md:text-base  cursor-pointer`}
            >
              Choose path
            </p>
            <ChevronRight color="#cff073" height={'14px'} width={'14px'} />
            <p
              onClick={() => setPage(3)}
              className={`${page >= 3 ? 'text-[#E6E6E6] font-semibold' : ''} text-xs md:text-base  cursor-pointer`}
            >
              Connect wallet
            </p>
            <ChevronRight color="#cff073" height={'14px'} width={'14px'} />
          </div>
        </div>
      </div>
      <Form {...form}>{renderCurrentForm()}</Form>
    </div>
  )
}
