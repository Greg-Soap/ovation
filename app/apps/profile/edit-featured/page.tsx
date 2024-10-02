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
      <div className="w-full flex items-center justify-between border-b border-sectionBorder px-6 py-8">
        <div className="flex items-center gap-1">
          <Button className="p-1 h-fit rounded-none bg-transparent">
            <ArrowLeft
              color="white"
              variant="Outline"
              size={16}
              onClick={() => router.back()}
            />
          </Button>

          <p className="text-[23px] text-white100 font-semibold">Featured</p>
        </div>

        <Popover>
          <PopoverTrigger className="text-[10px] font-semibold text-primaryBg px-3 py-2 rounded-[24px] h-fit bg-button">
            Add featured
          </PopoverTrigger>
          <PopoverContent className="max-w-[104px] flex flex-col rounded-[6px] bg-popBg p-0 border-none">
            <Button className="bg-popBg px-2 py-2.5 text-[11px] text-white100 rounded-none w-full h-fit rounded-t-[6px] flex justify-start">
              Event
            </Button>
            <Button className="bg-popBg px-2 py-2.5 text-[11px] text-white100 rounded-none w-full h-fit border-t border-white20 flex justify-start">
              NFT
            </Button>
            <Button className="bg-popBg px-2 py-2.5 text-[11px] text-white100 rounded-none w-full h-fit border-t white20 rounded-b-[6px] flex justify-start">
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
}: FeaturedList) {
  return (
    <div className="w-full flex flex-row gap-3 items-center">
      <Button className="px-0 py-1 rounded-none h-fit bg-transparent gap-1 flex flex-col">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="h-[1px] w-3 bg-black60" />
        ))}
      </Button>

      <div className="w-full flex items-center bg-secondaryBg rounded-[8px] border border-white08 pl-3 py-3 gap-5">
        <div className="max-w-[325px] h-full flex">
          <img
            src={imgSrc}
            alt="Preview"
            className="w-auto h-full rounded-[10px]"
          />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] text-primary50">{type}</p>
            <p className="text-[17px] font-semibold text-white100">
              {type === 'EVENT' ? eventName : creator}
            </p>
            <p
              className={`${type === 'EVENT' ? 'hidden' : 'flex'} text-white60 text-[13px] w-[80%] max-w-[798px]`}
            >
              {type === 'NFT' ? price : description}
            </p>

            <div
              className={`${type === 'EVENT' ? 'flex' : 'hidden'} items-center gap-[5px]`}
            >
              <p className="text-white60 text-[13px]">{date}</p>
            </div>
            <div
              className={`${type === 'EVENT' ? 'flex' : 'hidden'} items-center gap-[5px]`}
            >
              <p className="text-white60 text-[13px] underline">{location}</p>
            </div>
          </div>

          <Button
            variant={`outline`}
            className="border-primary60 px-[13px] py-2 h-fit bg-transparent w-fit rounded-[41px] text-xs text-primary60 hover:bg-transparent hover:text-primary60"
          >
            Remove from featured
          </Button>
        </div>
      </div>
    </div>
  )
}

const featuredList: FeaturedList[] = [
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    type: 'NFT',
    creator: 'Bored Ape',
    price: '144 ETH',
  },
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    type: 'PROJECT',
    creator: 'MAD LADS',
    description: `NFT stands for Non-Fungible Token. It's a type of digital asset that, NFT stands for Non-Fungible Token. It's a type of digital asset that, NFT stands for Non-Fungible Token. It's a type of digital asset that, NFT stands for Non-Fungible Token. It's a type of digital asset that, NFT stands for Non-Fungible Token. It's a type of digital asset that`,
  },
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    type: 'ARTICLE',
    creator: 'WHAT IS NFT',
    price: '144 ETH',
    description: `NFT stands for Non-Fungible Token. It's a type of digital asset that represents ownership or proof of authenticity of a unique item or piece of content using blockchain technology. Unlike cryptocurrencies such as Bitcoin or Ethereum, which are fungible and can be exchanged on a one-to-one basis, NFTs are indivisible, exchanged on a one-to-one basis, N.....more`,
  },
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    type: 'EVENT',
    eventName: 'MINT DAY',
    location: 'Virtual event',
    date: 'Wed, 24 Jan, 15:00 - 20:00',
  },
]

interface FeaturedList {
  imgSrc: string
  type: 'EVENT' | 'NFT' | 'ARTICLE' | 'PROJECT'
  eventName?: string
  creator?: string
  price?: string
  description?: string
  location?: string
  date?: string
}
