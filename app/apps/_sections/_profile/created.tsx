'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import LikeIcon from '@/components/icons/likeIcon'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Button {
  name: string
  itemCount: number
  isActive: boolean
}

interface CreatedNFT {
  imgSrc: string
  artist: string
  price: number
  isLiked: boolean
  likeCount: number
  isHidden: boolean
  isComplete: boolean
  isDomain: boolean
  isCollectible: boolean
  isMetaverse: boolean
  isArt: boolean
}

const buttons: Button[] = [
  { name: 'All', itemCount: 20, isActive: true },
  { name: 'Complete', itemCount: 4, isActive: false },
  { name: 'Domain', itemCount: 4, isActive: false },
  { name: 'Collectibles', itemCount: 4, isActive: false },
  { name: 'Metaverse', itemCount: 4, isActive: false },
  { name: 'Art', itemCount: 4, isActive: false },
]

const createdNFT: CreatedNFT[] = [
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Bored Ape',
    price: 14,
    isLiked: false,
    likeCount: 40,
    isHidden: false,
    isComplete: true,
    isDomain: false,
    isCollectible: false,
    isMetaverse: false,
    isArt: false,
  },
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Micheal Marcagi',
    price: 14,
    isLiked: false,
    likeCount: 39,
    isHidden: false,
    isComplete: false,
    isDomain: true,
    isCollectible: false,
    isMetaverse: false,
    isArt: false,
  },
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Hozier',
    price: 14,
    isLiked: false,
    likeCount: 38,
    isHidden: false,
    isComplete: false,
    isDomain: false,
    isCollectible: true,
    isMetaverse: false,
    isArt: false,
  },
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Royel Otis',
    price: 14,
    isLiked: false,
    likeCount: 37,
    isHidden: false,
    isComplete: false,
    isDomain: false,
    isCollectible: false,
    isMetaverse: true,
    isArt: false,
  },
  {
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Matt Hansen',
    price: 14,
    isLiked: false,
    likeCount: 36,
    isHidden: false,
    isComplete: false,
    isDomain: false,
    isCollectible: false,
    isMetaverse: false,
    isArt: true,
  },
]

export default function Created() {
  const [items, setItems] = useState<CreatedNFT[]>(createdNFT)

  const toggleHidden = (index: number) => {
    const updatedList = items.map((item, i) =>
      i === index ? { ...item, isHidden: !item.isHidden } : item,
    )

    setItems(updatedList)
  }

  const toggleLike = (index: number) => {
    const updatedList = items.map((item, i) =>
      i === index ? { ...item, isLiked: !item.isLiked } : item,
    )

    setItems(updatedList)
  }

  return (
    <div className="w-full py-10 flex items-center justify-center">
      <div className="w-[95%] px-7 py-6 rounded-[14px] border border-[#353538] flex flex-col gap-[42px]">
        <div className="flex flex-col gap-[21px]">
          <p className="text-white font-medium">Created</p>

          <div className="flex items-center justify-between">
            <Tabs defaultValue="All" className="w-full flex flex-col gap-10">
              <TabsList className="flex justify-between items-center w-full overflow-x-scroll">
                <div className="flex items-center gap-2">
                  {buttons.map((item, index) => (
                    <TabsTrigger
                      value={item.name}
                      className="bg-[#232227] text-[#999999] p-3 rounded-[50px] h-fit text-xs border-none data-[state=active]:bg-white data-[state=active]:text-[#232227]"
                      key={index}
                    >
                      {item.name + '(' + item.itemCount + ')'}
                    </TabsTrigger>
                  ))}
                </div>

                <Select>
                  <SelectTrigger className="w-fit rounded-[7px] otline-none border border-[#333333] text-white text-xs bg-[#232227]">
                    <SelectValue placeholder="Filters" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </TabsList>
              <TabsContent value="All">
                <div className="flex flex-wrap gap-4">
                  {items.map((item, index) => (
                    <div
                      className="w-[296px] flex flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px]"
                      key={index}
                    >
                      <Image
                        src={item.imgSrc}
                        alt="NFT Preview"
                        width={317}
                        height={217}
                        className="rounded-t-[10px]"
                      />

                      <div className="flex flex-col items-center justify-between bg-[#111115] border border-[#FFFFFF0D] px-3 py-3 rounded-b-[10px] gap-3">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex flex-col items-start">
                            <p className="text-[11px] text-[#999999]">Artist</p>
                            <p className="text-white text-sm font-semibold">
                              {item.artist}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-[11px] text-[#999999]">Price</p>
                            <p className="text-white text-sm font-semibold">
                              {item.price + ' ' + 'ETH'}
                            </p>
                          </div>
                        </div>

                        <div className="flex w-full items-center justify-between pt-3 border-t border-[#353538]">
                          <div className="flex items-center gap-1">
                            <LikeIcon
                              className={`w-4 h-4 transition-all duration-300 ${item.isLiked ? 'stroke-none fill-[#CFF073]' : 'stroke-white fill-none'}`}
                              onClick={() => toggleLike(index)}
                            />
                            <p className="text-xs text-white font-normal">
                              {item.isLiked
                                ? item.likeCount + 1
                                : item.likeCount}
                            </p>
                          </div>

                          <Button
                            variant="default"
                            className={`${item.isHidden ? 'outline outline-1 outline-[#CFF073] bg-transparent text-[#CFF073]' : 'bg-[#CFF073] text-[#111115]'} px-3 py-[6px] h-fit text-[10px] font-medium`}
                            onClick={() => toggleHidden(index)}
                          >
                            {item.isHidden ? 'Unhide' : 'Hide'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="Complete">
                <div className="flex flex-wrap gap-4">
                  {items.map((item, index) => (
                    <div
                      className={`${item.isComplete ? 'flex' : 'hidden'} w-[296px] flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px]`}
                      key={index}
                    >
                      <Image
                        src={item.imgSrc}
                        alt="NFT Preview"
                        width={317}
                        height={217}
                        className="rounded-t-[10px]"
                      />

                      <div className="flex flex-col items-center justify-between bg-[#111115] border border-[#FFFFFF0D] px-3 py-3 rounded-b-[10px] gap-3">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex flex-col items-start">
                            <p className="text-[11px] text-[#999999]">Artist</p>
                            <p className="text-white text-sm font-semibold">
                              {item.artist}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-[11px] text-[#999999]">Price</p>
                            <p className="text-white text-sm font-semibold">
                              {item.price + ' ' + 'ETH'}
                            </p>
                          </div>
                        </div>

                        <div className="flex w-full items-center justify-between pt-3 border-t border-[#353538]">
                          <div className="flex items-center gap-1">
                            <LikeIcon
                              className={`w-4 h-4 ${item.isLiked ? 'stroke-none fill-[#CFF073]' : 'stroke-white fill-none'}`}
                              onClick={() => toggleLike(index)}
                            />
                            <p className="text-xs text-white font-normal">
                              {item.isLiked
                                ? item.likeCount + 1
                                : item.likeCount}
                            </p>
                          </div>

                          <Button
                            variant="default"
                            className={`${item.isHidden ? 'outline outline-1 outline-[#CFF073] bg-transparent text-[#CFF073]' : 'bg-[#CFF073] text-[#111115]'} px-3 py-[6px] h-fit text-[10px] font-medium`}
                            onClick={() => toggleHidden(index)}
                          >
                            {item.isHidden ? 'Unhide' : 'Hide'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="Domain">
                <div className="flex flex-wrap gap-4">
                  {items.map((item, index) => (
                    <div
                      className={`${item.isDomain ? 'flex' : 'hidden'} w-[296px] flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px]`}
                      key={index}
                    >
                      <Image
                        src={item.imgSrc}
                        alt="NFT Preview"
                        width={317}
                        height={217}
                        className="rounded-t-[10px]"
                      />

                      <div className="flex flex-col items-center justify-between bg-[#111115] border border-[#FFFFFF0D] px-3 py-3 rounded-b-[10px] gap-3">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex flex-col items-start">
                            <p className="text-[11px] text-[#999999]">Artist</p>
                            <p className="text-white text-sm font-semibold">
                              {item.artist}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-[11px] text-[#999999]">Price</p>
                            <p className="text-white text-sm font-semibold">
                              {item.price + ' ' + 'ETH'}
                            </p>
                          </div>
                        </div>

                        <div className="flex w-full items-center justify-between pt-3 border-t border-[#353538]">
                          <div className="flex items-center gap-1">
                            <LikeIcon
                              className={`w-4 h-4 ${item.isLiked ? 'stroke-none fill-[#CFF073]' : 'stroke-white fill-none'}`}
                              onClick={() => toggleLike(index)}
                            />
                            <p className="text-xs text-white font-normal">
                              {item.isLiked
                                ? item.likeCount + 1
                                : item.likeCount}
                            </p>
                          </div>

                          <Button
                            variant="default"
                            className={`${item.isHidden ? 'outline outline-1 outline-[#CFF073] bg-transparent text-[#CFF073]' : 'bg-[#CFF073] text-[#111115]'} px-3 py-[6px] h-fit text-[10px] font-medium`}
                            onClick={() => toggleHidden(index)}
                          >
                            {item.isHidden ? 'Unhide' : 'Hide'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="Collectibles">
                <div className="flex flex-wrap gap-4">
                  {items.map((item, index) => (
                    <div
                      className={`${item.isCollectible ? 'flex' : 'hidden'} w-[296px] flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px]`}
                      key={index}
                    >
                      <Image
                        src={item.imgSrc}
                        alt="NFT Preview"
                        width={317}
                        height={217}
                        className="rounded-t-[10px]"
                      />

                      <div className="flex flex-col items-center justify-between bg-[#111115] border border-[#FFFFFF0D] px-3 py-3 rounded-b-[10px] gap-3">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex flex-col items-start">
                            <p className="text-[11px] text-[#999999]">Artist</p>
                            <p className="text-white text-sm font-semibold">
                              {item.artist}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-[11px] text-[#999999]">Price</p>
                            <p className="text-white text-sm font-semibold">
                              {item.price + ' ' + 'ETH'}
                            </p>
                          </div>
                        </div>

                        <div className="flex w-full items-center justify-between pt-3 border-t border-[#353538]">
                          <div className="flex items-center gap-1">
                            <LikeIcon
                              className={`w-4 h-4 ${item.isLiked ? 'stroke-none fill-[#CFF073]' : 'stroke-white fill-none'}`}
                              onClick={() => toggleLike(index)}
                            />
                            <p className="text-xs text-white font-normal">
                              {item.isLiked
                                ? item.likeCount + 1
                                : item.likeCount}
                            </p>
                          </div>

                          <Button
                            variant="default"
                            className={`${item.isHidden ? 'outline outline-1 outline-[#CFF073] bg-transparent text-[#CFF073]' : 'bg-[#CFF073] text-[#111115]'} px-3 py-[6px] h-fit text-[10px] font-medium`}
                            onClick={() => toggleHidden(index)}
                          >
                            {item.isHidden ? 'Unhide' : 'Hide'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="Metaverse">
                <div className="flex flex-wrap gap-4">
                  {items.map((item, index) => (
                    <div
                      className={`${item.isMetaverse ? 'flex' : 'hidden'} w-[296px] flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px]`}
                      key={index}
                    >
                      <Image
                        src={item.imgSrc}
                        alt="NFT Preview"
                        width={317}
                        height={217}
                        className="rounded-t-[10px]"
                      />

                      <div className="flex flex-col items-center justify-between bg-[#111115] border border-[#FFFFFF0D] px-3 py-3 rounded-b-[10px] gap-3">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex flex-col items-start">
                            <p className="text-[11px] text-[#999999]">Artist</p>
                            <p className="text-white text-sm font-semibold">
                              {item.artist}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-[11px] text-[#999999]">Price</p>
                            <p className="text-white text-sm font-semibold">
                              {item.price + ' ' + 'ETH'}
                            </p>
                          </div>
                        </div>

                        <div className="flex w-full items-center justify-between pt-3 border-t border-[#353538]">
                          <div className="flex items-center gap-1">
                            <LikeIcon
                              className={`w-4 h-4 ${item.isLiked ? 'stroke-none fill-[#CFF073]' : 'stroke-white fill-none'}`}
                              onClick={() => toggleLike(index)}
                            />
                            <p className="text-xs text-white font-normal">
                              {item.isLiked
                                ? item.likeCount + 1
                                : item.likeCount}
                            </p>
                          </div>

                          <Button
                            variant="default"
                            className={`${item.isHidden ? 'outline outline-1 outline-[#CFF073] bg-transparent text-[#CFF073]' : 'bg-[#CFF073] text-[#111115]'} px-3 py-[6px] h-fit text-[10px] font-medium`}
                            onClick={() => toggleHidden(index)}
                          >
                            {item.isHidden ? 'Unhide' : 'Hide'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="Art">
                <div className="flex flex-wrap gap-4">
                  {items.map((item, index) => (
                    <div
                      className={`${item.isArt ? 'flex' : 'hidden'} w-[296px] flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px]`}
                      key={index}
                    >
                      <Image
                        src={item.imgSrc}
                        alt="NFT Preview"
                        width={317}
                        height={217}
                        className="rounded-t-[10px]"
                      />

                      <div className="flex flex-col items-center justify-between bg-[#111115] border border-[#FFFFFF0D] px-3 py-3 rounded-b-[10px] gap-3">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex flex-col items-start">
                            <p className="text-[11px] text-[#999999]">Artist</p>
                            <p className="text-white text-sm font-semibold">
                              {item.artist}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-[11px] text-[#999999]">Price</p>
                            <p className="text-white text-sm font-semibold">
                              {item.price + ' ' + 'ETH'}
                            </p>
                          </div>
                        </div>

                        <div className="flex w-full items-center justify-between pt-3 border-t border-[#353538]">
                          <div className="flex items-center gap-1">
                            <LikeIcon
                              className={`w-4 h-4 ${item.isLiked ? 'stroke-none fill-[#CFF073]' : 'stroke-white fill-none'}`}
                              onClick={() => toggleLike(index)}
                            />
                            <p className="text-xs text-white font-normal">
                              {item.isLiked
                                ? item.likeCount + 1
                                : item.likeCount}
                            </p>
                          </div>

                          <Button
                            variant="default"
                            className={`${item.isHidden ? 'outline outline-1 outline-[#CFF073] bg-transparent text-[#CFF073]' : 'bg-[#CFF073] text-[#111115]'} px-3 py-[6px] h-fit text-[10px] font-medium`}
                            onClick={() => toggleHidden(index)}
                          >
                            {item.isHidden ? 'Unhide' : 'Hide'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
