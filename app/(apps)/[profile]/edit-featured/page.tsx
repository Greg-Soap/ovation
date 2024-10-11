'use client'

import { ArrowLeft } from 'iconsax-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export default function EditFeatured() {
  const router = useRouter()

  return (
    <section className="other-link w-full flex flex-col items-center">
      <div className="w-full flex items-center justify-between border-b border-[#1A1A1A] px-6 py-8">
        <div className="flex items-center gap-1">
          <Button className="p-1 h-fit rounded-none bg-transparent">
            <ArrowLeft
              color="white"
              variant="Outline"
              size={16}
              onClick={() => router.back()}
            />
          </Button>

          <p className="text-[23px]  font-semibold">Featured</p>
        </div>

        <Popover>
          <PopoverTrigger className="text-[10px] font-semibold text-[#111115] px-3 py-2 rounded-[24px] h-fit bg-primary">
            Add featured
          </PopoverTrigger>
          <PopoverContent className="max-w-[104px] flex flex-col rounded-[6px] bg-[#232227] p-0 border-none">
            <Button className="bg-[#232227] px-2 py-2.5 text-[11px]  rounded-none w-full h-fit rounded-t-[6px] flex justify-start">
              Event
            </Button>
            <Button className="bg-[#232227] px-2 py-2.5 text-[11px]  rounded-none w-full h-fit border-t border-[#333333] flex justify-start">
              NFT
            </Button>
            <Button className="bg-[#232227] px-2 py-2.5 text-[11px]  rounded-none w-full h-fit border-t border-[#333333] rounded-b-[6px] flex justify-start">
              Article
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-[95%] flex flex-col items-center py-6 gap-4 relative">
        {featuredList.map((item, index) => (
          <FeaturedCard
            key={index}
            imgSrc={item.imgSrc}
            type={item.type}
            creator={item.creator}
            eventName={item.eventName}
            description={item.description}
            price={item.price}
            location={item.location}
            date={item.date}
            isNft={item.isNft}
            isEvent={item.isEvent}
          />
        ))}
      </div>
    </section>
  )
}

function FeaturedCard({
  imgSrc,
  type,
  creator,
  eventName,
  description,
  price,
  location,
  date,
  isNft,
  isEvent,
}: any) {
  return (
    <div className="w-full flex flex-row gap-3 items-center">
      <Button className="px-0 py-1 rounded-none h-fit bg-transparent gap-1 flex flex-col">
        <DragIndicator />
      </Button>

      <div className="w-full flex items-center bg-[#18181C] rounded-[8px] border border-[#FFFFFF14] pl-3 py-3 gap-5">
        <div className="max-w-[325px] h-full flex">
          <img
            src={imgSrc}
            alt="Preview"
            className="w-auto h-full rounded-[10px]"
          />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] text-[#E7F7B9]">{type}</p>
            <p className="text-[17px] font-semibold ">
              {isEvent ? eventName : creator}
            </p>
            <p
              className={`${isEvent ? 'hidden' : 'flex'} text-lighter text-[13px] w-[80%] max-w-[798px]`}
            >
              {isNft ? price : description}
            </p>

            <div
              className={`${isEvent ? 'flex' : 'hidden'} items-center gap-[5px]`}
            >
              <p className="text-lighter text-[13px]">{date}</p>
            </div>
            <div
              className={`${isEvent ? 'flex' : 'hidden'} items-center gap-[5px]`}
            >
              <p className="text-lighter text-[13px] underline">{location}</p>
            </div>
          </div>

          <Button
            variant={`outline`}
            className="border-[#E2F6AB] px-[13px] py-2 h-fit bg-transparent w-fit rounded-[41px] text-xs text-[#E2F6AB] hover:bg-transparent hover:text-[#E2F6AB]"
          >
            Remove from featured
          </Button>
        </div>
      </div>
    </div>
  )
}

function DragIndicator() {
  return (
    <>
      <div className="h-[1px] w-3 bg-[#6D6C70]"></div>
      <div className="h-[1px] w-3 bg-[#6D6C70]"></div>
      <div className="h-[1px] w-3 bg-[#6D6C70]"></div>
      <div className="h-[1px] w-3 bg-[#6D6C70]"></div>
      <div className="h-[1px] w-3 bg-[#6D6C70]"></div>
      <div className="h-[1px] w-3 bg-[#6D6C70]"></div>
    </>
  )
}

interface FeaturedList {
  imgSrc?: string
  type?: string
  eventName?: string
  creator?: string
  price?: string
  description?: string
  location?: string
  date?: string
  isNft?: boolean
  isEvent?: boolean
}

const featuredList: FeaturedList[] = [
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    type: 'NFT',
    eventName: '',
    creator: 'Bored Ape',
    price: '144 ETH',
    description: '',
    location: '',
    date: '',
    isNft: true,
    isEvent: false,
  },
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    type: 'PROJECT',
    eventName: '',
    creator: 'MAD LADS',
    price: '',
    description: `NFT stands for Non-Fungible Token. It's a type of digital asset that, NFT stands for Non-Fungible Token. It's a type of digital asset that, NFT stands for Non-Fungible Token. It's a type of digital asset that, NFT stands for Non-Fungible Token. It's a type of digital asset that, NFT stands for Non-Fungible Token. It's a type of digital asset that`,
    location: '',
    date: '',
    isNft: false,
    isEvent: false,
  },
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    type: 'ARTICLE',
    eventName: '',
    creator: 'WHAT IS NFT',
    price: '144 ETH',
    description: `NFT stands for Non-Fungible Token. It's a type of digital asset that represents ownership or proof of authenticity of a unique item or piece of content using blockchain technology. Unlike cryptocurrencies such as Bitcoin or Ethereum, which are fungible and can be exchanged on a one-to-one basis, NFTs are indivisible, exchanged on a one-to-one basis, N.....more`,
    location: '',
    date: '',
    isNft: false,
    isEvent: false,
  },
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    type: 'EVENT',
    eventName: 'MINT DAY',
    creator: '',
    price: '',
    description: '',
    location: 'Virtual event',
    date: 'Wed, 24 Jan, 15:00 - 20:00',
    isNft: false,
    isEvent: true,
  },
]
