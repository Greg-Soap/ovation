import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Image from 'next/image'

interface Wallet {
  profile: string
  address: string
  capital: number
  nftCount: number
}

const wallets: Wallet[] = [
  {
    profile: '/assets/images/pfp3.jpeg',
    address: 'OXr....dubhjnikm',
    capital: 600,
    nftCount: 151,
  },
]

export default function WalletForm() {
  return (
    <div className='flex flex-col gap-[23px] w-full xl:max-w-[637px] px-4 sm:px-10 2xl:px-20'>
      <Button
        variant='outline'
        className='w-full h-[46px] flex items-center gap-[7px] text-[13px] font-semibold text-[#F8F8FF] border-[#29292F] rounded-full'>
        Add new wallet <PlusIcon size={16} />
      </Button>

      {wallets.map((wallet, index) => (
        <div
          className='w-full flex items-center justify-between bg-[#18181C] p-4 py-2.5 rounded-full'
          key={index}>
          <div className='flex items-center gap-[7px]'>
            <Image
              src={wallet.profile}
              alt='Profile'
              width={30}
              height={30}
              className='rounded-full'
            />

            <div className='flex flex-col'>
              <p className='text-sm font-semibold text-[#F8F8FF]'>{wallet.address}</p>
              <div className='flex items-center gap-[3px] text-xs text-[#B3B3B3]'>
                <p>${wallet.capital}</p>
                <Dot />
                <p>{wallet.nftCount} NFTs</p>
              </div>
            </div>
          </div>

          <Button className='text-[10px] text-[#0B0A10] font-medium h-fit'>Disconnect</Button>
        </div>
      ))}
    </div>
  )
}

function Dot() {
  return <div className='w-0.5 h-0.5 bg-[#B3B3B3]' />
}
