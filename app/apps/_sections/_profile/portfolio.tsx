'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import LikeIcon from '@/components/icons/likeIcon'

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
    isComplete: false,
    isDomain: false,
    isCollectible: false,
    isMetaverse: false,
    isArt: true,
  },
]

export default function Portfolio() {
  const [items, setItems] = useState<CreatedNFT[]>(createdNFT)

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
          <p className="text-white font-medium">NFTS</p>

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
                      className="w-[296px] flex flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px] relative"
                      key={index}
                    >
                      <div className="flex items-center p-2 rounded-full bg-[#333726] absolute right-5 top-3">
                        <LikeIcon
                          className={`w-4 h-4 transition-all duration-300 ${item.isLiked ? 'stroke-none fill-[#CFF073]' : 'stroke-[#CFF073] fill-none'}`}
                          onClick={() => toggleLike(index)}
                        />
                      </div>
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
                            <p className="text-[11px] text-white">
                              {item.artist}
                            </p>
                            <p className="text-[#999999] text-[11px] font-semibold">
                              {item.price + ' ' + 'ETH'}
                            </p>
                          </div>

                          <Popover>
                            <PopoverTrigger>
                              <Button
                                variant="default"
                                className="text-white gap-1 flex items-center bg-transparent h-fit p-1"
                              >
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="rounded-[7px] bg-[#232227] flex flex-col w-fit p-0 border-none">
                              <Button
                                variant="default"
                                className="text-white text-xs justify-start font-medium px-3 py-[10px] bg-transparent w-full h-fit border-b border-[#333333] rounded-none"
                              >
                                Feature NFT
                              </Button>
                              <Button
                                variant="default"
                                className="text-white text-xs justify-start font-medium px-3 py-[10px] w-full bg-transparent h-fit"
                              >
                                Make NFT public
                              </Button>
                            </PopoverContent>
                          </Popover>
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
                      className={`${item.isComplete ? 'flex' : 'hidden'} w-[296px] flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px] relative`}
                      key={index}
                    >
                      <div className="flex items-center p-2 rounded-full bg-[#333726] absolute right-5 top-3">
                        <LikeIcon
                          className={`w-4 h-4 transition-all duration-300 ${item.isLiked ? 'stroke-none fill-[#CFF073]' : 'stroke-[#CFF073] fill-none'}`}
                          onClick={() => toggleLike(index)}
                        />
                      </div>
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
                            <p className="text-[11px] text-white">
                              {item.artist}
                            </p>
                            <p className="text-[#999999] text-[11px] font-semibold">
                              {item.price + ' ' + 'ETH'}
                            </p>
                          </div>

                          <Popover>
                            <PopoverTrigger>
                              <Button
                                variant="default"
                                className="text-white gap-1 flex items-center bg-transparent h-fit p-1"
                              >
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="rounded-[7px] bg-[#232227] flex flex-col w-fit p-0 border-none">
                              <Button
                                variant="default"
                                className="text-white text-xs justify-start font-medium px-3 py-[10px] bg-transparent w-full h-fit border-b border-[#333333] rounded-none"
                              >
                                Feature NFT
                              </Button>
                              <Button
                                variant="default"
                                className="text-white text-xs justify-start font-medium px-3 py-[10px] w-full bg-transparent h-fit"
                              >
                                Make NFT public
                              </Button>
                            </PopoverContent>
                          </Popover>
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
                      className={`${item.isDomain ? 'flex' : 'hidden'} w-[296px] flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px] relative`}
                      key={index}
                    >
                      <div className="flex items-center p-2 rounded-full bg-[#333726] absolute right-5 top-3">
                        <LikeIcon
                          className={`w-4 h-4 transition-all duration-300 ${item.isLiked ? 'stroke-none fill-[#CFF073]' : 'stroke-[#CFF073] fill-none'}`}
                          onClick={() => toggleLike(index)}
                        />
                      </div>
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
                            <p className="text-[11px] text-white">
                              {item.artist}
                            </p>
                            <p className="text-[#999999] text-[11px] font-semibold">
                              {item.price + ' ' + 'ETH'}
                            </p>
                          </div>

                          <Popover>
                            <PopoverTrigger>
                              <Button
                                variant="default"
                                className="text-white gap-1 flex items-center bg-transparent h-fit p-1"
                              >
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="rounded-[7px] bg-[#232227] flex flex-col w-fit p-0 border-none">
                              <Button
                                variant="default"
                                className="text-white text-xs justify-start font-medium px-3 py-[10px] bg-transparent w-full h-fit border-b border-[#333333] rounded-none"
                              >
                                Feature NFT
                              </Button>
                              <Button
                                variant="default"
                                className="text-white text-xs justify-start font-medium px-3 py-[10px] w-full bg-transparent h-fit"
                              >
                                Make NFT public
                              </Button>
                            </PopoverContent>
                          </Popover>
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
                      className={`${item.isCollectible ? 'flex' : 'hidden'} w-[296px] flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px] relative`}
                      key={index}
                    >
                      <div className="flex items-center p-2 rounded-full bg-[#333726] absolute right-5 top-3">
                        <LikeIcon
                          className={`w-4 h-4 transition-all duration-300 ${item.isLiked ? 'stroke-none fill-[#CFF073]' : 'stroke-[#CFF073] fill-none'}`}
                          onClick={() => toggleLike(index)}
                        />
                      </div>
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
                            <p className="text-[11px] text-white">
                              {item.artist}
                            </p>
                            <p className="text-[#999999] text-[11px] font-semibold">
                              {item.price + ' ' + 'ETH'}
                            </p>
                          </div>

                          <Popover>
                            <PopoverTrigger>
                              <Button
                                variant="default"
                                className="text-white gap-1 flex items-center bg-transparent h-fit p-1"
                              >
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="rounded-[7px] bg-[#232227] flex flex-col w-fit p-0 border-none">
                              <Button
                                variant="default"
                                className="text-white text-xs justify-start font-medium px-3 py-[10px] bg-transparent w-full h-fit border-b border-[#333333] rounded-none"
                              >
                                Feature NFT
                              </Button>
                              <Button
                                variant="default"
                                className="text-white text-xs justify-start font-medium px-3 py-[10px] w-full bg-transparent h-fit"
                              >
                                Make NFT public
                              </Button>
                            </PopoverContent>
                          </Popover>
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
                      className={`${item.isMetaverse ? 'flex' : 'hidden'} w-[296px] flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px] relative`}
                      key={index}
                    >
                      <div className="flex items-center p-2 rounded-full bg-[#333726] absolute right-5 top-3">
                        <LikeIcon
                          className={`w-4 h-4 transition-all duration-300 ${item.isLiked ? 'stroke-none fill-[#CFF073]' : 'stroke-[#CFF073] fill-none'}`}
                          onClick={() => toggleLike(index)}
                        />
                      </div>
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
                            <p className="text-[11px] text-white">
                              {item.artist}
                            </p>
                            <p className="text-[#999999] text-[11px] font-semibold">
                              {item.price + ' ' + 'ETH'}
                            </p>
                          </div>

                          <Popover>
                            <PopoverTrigger>
                              <Button
                                variant="default"
                                className="text-white gap-1 flex items-center bg-transparent h-fit p-1"
                              >
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="rounded-[7px] bg-[#232227] flex flex-col w-fit p-0 border-none">
                              <Button
                                variant="default"
                                className="text-white text-xs justify-start font-medium px-3 py-[10px] bg-transparent w-full h-fit border-b border-[#333333] rounded-none"
                              >
                                Feature NFT
                              </Button>
                              <Button
                                variant="default"
                                className="text-white text-xs justify-start font-medium px-3 py-[10px] w-full bg-transparent h-fit"
                              >
                                Make NFT public
                              </Button>
                            </PopoverContent>
                          </Popover>
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
                      className={`${item.isArt ? 'flex' : 'hidden'} w-[296px] flex-col bg-[#18181C] border border-[#FFFFFF14] rounded-[10px] relative`}
                      key={index}
                    >
                      <div className="flex items-center p-2 rounded-full bg-[#333726] absolute right-5 top-3">
                        <LikeIcon
                          className={`w-4 h-4 transition-all duration-300 ${item.isLiked ? 'stroke-none fill-[#CFF073]' : 'stroke-[#CFF073] fill-none'}`}
                          onClick={() => toggleLike(index)}
                        />
                      </div>
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
                            <p className="text-[11px] text-white">
                              {item.artist}
                            </p>
                            <p className="text-[#999999] text-[11px] font-semibold">
                              {item.price + ' ' + 'ETH'}
                            </p>
                          </div>

                          <Popover>
                            <PopoverTrigger>
                              <Button
                                variant="default"
                                className="text-white gap-1 flex items-center bg-transparent h-fit p-1"
                              >
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                                <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="rounded-[7px] bg-[#232227] flex flex-col w-fit p-0 border-none">
                              <Button
                                variant="default"
                                className="text-white text-xs justify-start font-medium px-3 py-[10px] bg-transparent w-full h-fit border-b border-[#333333] rounded-none"
                              >
                                Feature NFT
                              </Button>
                              <Button
                                variant="default"
                                className="text-white text-xs justify-start font-medium px-3 py-[10px] w-full bg-transparent h-fit"
                              >
                                Make NFT public
                              </Button>
                            </PopoverContent>
                          </Popover>
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
