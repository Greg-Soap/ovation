import { Button } from '@/components/ui/button'
import { WalletAcct } from '@/models/all.model'
import { useQuery } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import { PlusIcon } from 'lucide-react'
// import Image from 'next/image'

export default function WalletForm() {
  // const { data: walletsData } = useQuery({
  //   queryKey: ['wallets'],
  //   queryFn: () => ovationService.getUserWallets(),
  // })
  const wallets: any = []
  console.log({ wallets })
  return (
    <div className="flex flex-col gap-[23px] w-full xl:max-w-[637px] px-4 sm:px-10 2xl:px-20">
      <Button
        variant="outline"
        className="w-full h-[46px] flex items-center gap-[7px] text-[13px] font-semibold text-[#F8F8FF] border-[#29292F] rounded-full"
      >
        Add new wallet <PlusIcon size={16} />
      </Button>

      {wallets?.map((wallet: any, index: any) => (
        <div
          className="w-full flex items-center justify-between bg-[#18181C] p-4 py-2.5 rounded-full"
          key={index}
        >
          <div className="flex items-center gap-[7px]">
            {/* <Image
              src={wallet.profile}
              alt='Profile'
              width={30}
              height={30}
              className='rounded-full'
            /> */}

            <div className="flex flex-col">
              <p className="text-sm font-semibold text-[#F8F8FF]">
                {wallet.walletAddress}
              </p>
              <div className="flex items-center gap-[3px] text-xs text-[#B3B3B3]">
                {/* <p>${wallet.capital}</p> */}
                <Dot />
                {/* <p>{wallet.nftCount} NFTs</p> */}
              </div>
            </div>
          </div>

          <Button className="text-[10px] text-[#0B0A10] font-medium h-fit">
            Disconnect
          </Button>
        </div>
      ))}
    </div>
  )
}

function Dot() {
  return <div className="w-0.5 h-0.5 bg-[#B3B3B3]" />
}
