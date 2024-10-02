'use client'

import EmojiPicker, { EmojiStyle, Theme } from 'emoji-picker-react'
import GalleryIcon from '@/components/icons/galleryIcon'
import EmojiIcon from '@/components/icons/emojiIcon'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import SendIcon from '@/components/icons/sendIcon'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { ArrowLeft } from 'iconsax-react'

interface FriendProps {
  friendDisplayPicture: string
  displayName: string
  userName: string
  lastMessage: string
  lastActive: string
  biography: string
  followingCount: number
  followerCount: number
  isOpened: boolean
}

export default function MessageContainer({ friend, goBack }: any) {
  const [sendStatus, setSendStatus] = useState<boolean>(true)
  const [message, setMessage] = useState<string>('')

  const handleChange = (e: any) => {
    if (e.target.value === '') {
      setSendStatus(true)
    } else {
      setSendStatus(false)
    }

    setMessage(e.target.value)
  }
  const handleEmojiSelect = (emojiObject: any) => {
    console.log(emojiObject)
    setMessage((prevMessage) => prevMessage + emojiObject.emoji)
  }

  if (!friend) {
    return (
      <section
        className={`${friend ? 'flex' : 'hidden lg:flex'} w-full h-[100vh] lg:h-full lg:col-span-2 flex-col items-center justify-center bg-primaryBg other-link overflow-auto`}
      >
        <div className="flex flex-col items-center gap-[13px]">
          <div className="flex flex-col items-center gap-[6px]">
            <p className="text-white100 text-xl font-semibold">
              Select Message
            </p>
            <p className="text-white90 text-[11px]">
              Choose from previous conversation or start a new one below
            </p>
          </div>

          <Button
            variant={'default'}
            className="px-3 py-2 h-fit rounded-[27px] text-xs text-primaryBg font-semibold transition-all duration-300 hover:opacity-80"
          >
            New message
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section
      className={`${friend ? 'flex' : 'hidden lg:flex'} w-full h-[100vh] lg:h-full lg:col-span-2  flex-col items-center justify-center bg-primaryBg other-link overflow-scroll`}
    >
      <div className="flex lg:hidden bg-[rgba(17,17,21,0.8)] items-center gap-4 w-full p-5 absolute top-0">
        <ArrowLeft color="white" variant="Outline" size={24} onClick={goBack} />
        <p className="text-sm font-medium text-white100">
          {friend.displayName}
        </p>
      </div>

      <div className="w-full border-b border-sectionBorder py-9 flex flex-col items-center gap-4 h-fit mt-0 lg:mt-[250px]">
        <Image
          src={friend.friendDisplayPicture}
          alt="User Display Picture"
          width={81}
          height={81}
        />

        <div className="flex flex-col gap-1 w-fit items-center">
          <p className="text-white100 text-xl font-semibold w-fit leading-[30px] text-center">
            {friend.displayName}
          </p>
          <p className="text-sm text-white50 w-fit">{friend.userName}</p>
        </div>

        <p className="text-xs text-white90 text-center max-w-[70%]">
          {friend.biography}
        </p>

        <div className="flex items-center gap-6">
          <p className="flex items-center gap-[9px] text-sm text-white90 font-semibold">
            {friend.followingCount}{' '}
            <span className="text-white50 font-medium">Following</span>
          </p>

          <p className="flex items-center gap-[9px] text-sm text-white90 font-semibold">
            {`${friend.followerCount}K`}
            <span className="text-white50 font-medium">Followers</span>
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col px-3 pt-[30px] pb-[100px] md:px-[30px] md:pt-[30px] md:pb-[90px] xir:p-[30px] gap-5 md:gap-[35px]">
        <div className="w-full flex flex-col gap-1 items-end">
          <p className="px-5 py-[10px] bg-[#1D3E00] rounded-s-[20px] rounded-tr-[20px] text-white100 text-sm font-medium max-w-[85%] lg:max-w-[50%]">
            Hello, how are you doing?
          </p>
          <p className="text-[11px] text-white50">08:15 AM</p>
        </div>

        <div className="w-full flex flex-col gap-1 items-start">
          <p className="px-5 py-[10px] bg-popBg rounded-e-[20px] rounded-tl-[20px] text-white100 text-sm font-medium max-w-[85%] lg:max-w-[50%]">
            Hello, how are you doing?
          </p>
          <p className="text-[11px] text-white50">08:15 AM</p>
        </div>

        <div className="w-full flex flex-col gap-1 items-end">
          <p className="px-5 py-[10px] bg-[#1D3E00] rounded-s-[20px] rounded-tr-[20px] text-white100 text-sm font-medium max-w-[85%] lg:max-w-[50%]">
            I have a question about the return policy for a product I purchased.
          </p>
          <p className="text-[11px] text-white50">08:15 AM</p>
        </div>

        <div className="w-full flex flex-col gap-1 items-start">
          <div className="flex items-center h-auto gap-2 px-5 py-[10px] bg-popBg rounded-e-[20px] rounded-tl-[20px]">
            <div className="bg-[#698A0D] w-3 h-3 rounded-full animate-bounce" />
            <div className="bg-[#698A0D] w-3 h-3 rounded-full animate-bounce delay-300" />
            <div className="bg-[#698A0D] w-3 h-3 rounded-full animate-bounce delay-500" />
          </div>
        </div>
      </div>

      <div className="w-full p-5 border-t border-sectionBorder absolute lg:sticky bottom-[65px] bg-primaryBg">
        <div className="w-full flex items-center bg-popBg rounded-[500px] p-2 h-fit">
          <div className="flex">
            <Button variant={'msgBox'}>
              <GalleryIcon className="w-6 h-6 mr-[-18px] fill-[#E7F8B9] stroke-[#E7F8B9]" />
            </Button>

            <Popover>
              <PopoverTrigger>
                <Button variant={'msgBox'}>
                  <EmojiIcon className="w-6 h-6" />
                </Button>
              </PopoverTrigger>

              <PopoverContent>
                <EmojiPicker
                  emojiStyle={EmojiStyle.TWITTER}
                  theme={Theme.DARK}
                  onEmojiClick={handleEmojiSelect}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Input
            placeholder="Type out a new message..."
            value={message}
            className="max-h-[24px] h-auto text-white100 bg-transparent border-[10rem] border-black outline-none ring-0 focus:outline-none focus-visible:border-none ml-0 py-0"
            onChange={handleChange}
          />

          <Button variant={'msgBox'} disabled={sendStatus}>
            <SendIcon className="" />
          </Button>
        </div>
      </div>
    </section>
  )
}
