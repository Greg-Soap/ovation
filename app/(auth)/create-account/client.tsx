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
import metamask from '@/public/assets/images/ovationWallets/ovationWalletIcon1.svg'
import bnb from '@/public/assets/images/ovationWallets/ovationWalletIcon2.svg'
import trust from '@/public/assets/images/ovationWallets/ovationWalletIcon3.svg'
import wallet from '@/public/assets/images/ovationWallets/ovationWalletIcon4.svg'
import phantom from '@/public/assets/images/ovationWallets/ovationWalletIcon5.svg'
import okx from '@/public/assets/images/ovationWallets/ovationWalletIcon6.svg'
import cmc from '@/public/assets/images/ovationWallets/ovationWalletIcon7.svg'
import pal from '@/public/assets/images/ovationWallets/ovationWalletIcon8.svg'
import tPocket from '@/public/assets/images/ovationWallets/ovationWalletIcon9.svg'
import brave from '@/public/assets/images/ovationWallets/ovationWalletIcon10.svg'
import opera from '@/public/assets/images/ovationWallets/ovationWalletIcon11.svg'
import math from '@/public/assets/images/ovationWallets/ovationWalletIcon12.svg'
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
                <div className="flex flex-wrap w-full gap-4">
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
          <Button
            onClick={() => setPage(4)}
            className="text-start flex justify-between p-[1rem] h-[58px] w-[242px] text-sm font-semibold text-white border-[1px] border-solid bg-transparent border-[#353538]"
          >
            <p>Metamask</p>
            <Image src={metamask} alt="metamask icon" />
          </Button>
          <Button
            onClick={() => setPage(4)}
            className="text-start flex justify-between p-[1rem] h-[58px] w-[242px] text-sm font-semibold text-white border-[1px] border-solid bg-transparent border-[#353538]"
          >
            <p>Trust Wallet</p>
            <Image src={trust} alt="metamask icon" />
          </Button>
          <Button
            onClick={() => setPage(4)}
            className="text-start flex justify-between p-[1rem] h-[58px] w-[242px] text-sm font-semibold text-white border-[1px] border-solid bg-transparent border-[#353538]"
          >
            <p>Phantom</p>
            <Image src={phantom} alt="metamask icon" />
          </Button>
          <Button
            onClick={() => setPage(4)}
            className="text-start flex justify-between p-[1rem] h-[58px] w-[242px] text-sm font-semibold text-white border-[1px] border-solid bg-transparent border-[#353538]"
          >
            <p>Binance Chain</p>
            <Image src={bnb} alt="metamask icon" />
          </Button>
          <Button
            onClick={() => setPage(4)}
            className="text-start flex justify-between p-[1rem] h-[58px] w-[242px] text-sm font-semibold text-white border-[1px] border-solid bg-transparent border-[#353538]"
          >
            <p>WalletConnect</p>
            <Image src={wallet} alt="metamask icon" />
          </Button>
          <Button
            onClick={() => setPage(4)}
            className="text-start flex justify-between p-[1rem] h-[58px] w-[242px] text-sm font-semibold text-white border-[1px] border-solid bg-transparent border-[#353538]"
          >
            <p>Coinmarketcap</p>
            <Image src={cmc} alt="metamask icon" />
          </Button>
          <Button
            onClick={() => setPage(4)}
            className="text-start flex justify-between p-[1rem] h-[58px] w-[242px] text-sm font-semibold text-white border-[1px] border-solid bg-transparent border-[#353538]"
          >
            <p>OKX</p>
            <Image src={okx} alt="metamask icon" />
          </Button>
          <Button
            onClick={() => setPage(4)}
            className="text-start flex justify-between p-[1rem] h-[58px] w-[242px] text-sm font-semibold text-white border-[1px] border-solid bg-transparent border-[#353538]"
          >
            <p>Opera Wallet</p>
            <Image src={opera} alt="metamask icon" />
          </Button>
          <Button
            onClick={() => setPage(4)}
            className="text-start flex justify-between p-[1rem] h-[58px] w-[242px] text-sm font-semibold text-white border-[1px] border-solid bg-transparent border-[#353538]"
          >
            <p> BraveWallet</p>
            <Image src={brave} alt="metamask icon" />
          </Button>
          <Button
            onClick={() => setPage(4)}
            className="text-start flex justify-between p-[1rem] h-[58px] w-[242px] text-sm font-semibold text-white border-[1px] border-solid bg-transparent border-[#353538]"
          >
            <p> MathWallet</p>
            <Image src={math} alt="metamask icon" />
          </Button>
          <Button
            onClick={() => setPage(4)}
            className="text-start flex justify-between p-[1rem] h-[58px] w-[242px] text-sm font-semibold text-white border-[1px] border-solid bg-transparent border-[#353538]"
          >
            <p> SafePal</p>
            <Image src={pal} alt="metamask icon" />
          </Button>
          <Button
            onClick={() => setPage(4)}
            className="text-start flex justify-between p-[1rem] h-[58px] w-[242px] text-sm font-semibold text-white border-[1px] border-solid bg-transparent border-[#353538]"
          >
            <p> TokenPocket</p>
            <Image src={tPocket} alt="metamask icon" />
          </Button>
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
      router.push('/apps/timeline')
    }

    return (
      <div className=" flex flex-col gap-7">
        <div className="flex text-white text-sm items-center justify-between p-4 border-[1px] border-[#353538] rounded-full">
          <p>OXrvsh.srvydubhjnikm</p>
          <Image src={bnb} alt="wallet icon" />
        </div>
        <Button
          onClick={() => handleClick()}
          className=" w-full text-sm font-semibold h-[53px]"
        >
          Make my profile
        </Button>
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
          <h1 className="text-3xl font-semibold text-white">Create Account</h1>
          <div className="flex gap-2 items-center justify-start">
            <p
              onClick={() => setPage(1)}
              className={`${page >= 1 ? 'text-[#E6E6E6]' : ''} cursor-pointer`}
            >
              Personal info
            </p>
            <ChevronRight color="#cff073" height={'14px'} width={'14px'} />
            <p
              onClick={() => setPage(2)}
              className={`${page >= 2 ? 'text-[#E6E6E6]' : ''} cursor-pointer`}
            >
              Choose path
            </p>
            <ChevronRight color="#cff073" height={'14px'} width={'14px'} />
            <p
              onClick={() => setPage(3)}
              className={`${page >= 3 ? 'text-[#E6E6E6]' : ''} cursor-pointer`}
            >
              Connect wallet
            </p>
            <ChevronRight color="#cff073" height={'14px'} width={'14px'} />
          </div>
        </div>
        <Button
          onClick={() => setPage(3)}
          className={`${page === 2 ? 'visible' : 'hidden'} bg-white text-black font-semibold text-sm`}
        >
          Skip
        </Button>
      </div>
      <Form {...form}>{renderCurrentForm()}</Form>
    </div>
  )
}
