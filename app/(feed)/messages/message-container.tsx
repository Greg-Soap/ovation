'use client'
import EmojiPicker, { EmojiStyle, Theme } from 'emoji-picker-react';
import GalleryIcon from '@/components/icons/galleryIcon';
import EmojiIcon from '@/components/icons/emojiIcon';
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import SendIcon from '@/components/icons/sendIcon'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Textarea } from '@/components/ui/textarea';

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

export default function MessageContainer({ friend }: any) {
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
  const handleEmojiSelect = (emojiObject:any) => {
    console.log(emojiObject)
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <section className="col-span-2 flex flex-col other-link  bg-[#111115] overflow-hidden">
      <div className="w-full border-b border-[#1A1A1A] py-9 flex flex-col items-center gap-4 h-fit">
        <Image
          src={friend.friendDisplayPicture}
          alt="User Display Picture"
          width={99}
          height={99}
        />

        <div className="flex flex-col gap-1 w-fit items-center">
          <p className="text-white text-2xl font-semibold w-fit leading-[30px] text-center">
            {friend.displayName}
          </p>
          <p className="text-lg text-[#808080] w-fit leading-[27px]">
            {friend.userName}
          </p>
        </div>

        <p className="text-sm text-[#E6E6E6] text-center max-w-[70%]">
          {friend.biography}
        </p>

        <div className="flex items-center gap-6">
          <p className="flex items-center gap-[9px] text-lg text-[#E6E6E6] font-semibold">
            {friend.followingCount}{' '}
            <span className="text-[#808080] font-medium">Following</span>
          </p>

          <p className="flex items-center gap-[9px] text-lg text-[#E6E6E6] font-semibold">
            {friend.followerCount + 'K'}
            <span className="text-[#808080] font-medium">Followers</span>
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col p-[30px] gap-[35px]">
        <div className="w-full flex flex-col items-end">
          <p className="px-5 py-[10px] bg-[#1D3E00] rounded-s-[20px] rounded-tr-[20px] text-white font-medium max-w-[50%]">
            Hello, how are you doing?
          </p>
          <p className="text-sm text-[#808080]">08:15 AM</p>
        </div>

        <div className="w-full flex flex-col items-start">
          <p className="px-5 py-[10px] bg-[#232227] rounded-e-[20px] rounded-tl-[20px] text-white font-medium max-w-[50%]">
            Hello, how are you doing?
          </p>
          <p className="text-sm text-[#808080]">08:15 AM</p>
        </div>

        <div className="w-full flex flex-col items-end">
          <p className="px-5 py-[10px] bg-[#1D3E00] rounded-s-[20px] rounded-tr-[20px] text-white font-medium max-w-[50%]">
            I have a question about the return policy for a product I purchased.
          </p>
          <p className="text-sm text-[#808080]">08:15 AM</p>
        </div>

        <div className="w-full flex flex-col items-start">
          <div className="flex items-center h-auto gap-2 px-5 py-[10px] bg-[#232227] rounded-e-[20px] rounded-tl-[20px]">
            <div className="bg-[#698A0D] w-[15px] h-[15px] rounded-full animate-bounce"></div>
            <div className="bg-[#698A0D] w-[15px] h-[15px] rounded-full animate-bounce delay-300"></div>
            <div className="bg-[#698A0D] w-[15px] h-[15px] rounded-full animate-bounce delay-500"></div>
          </div>
        </div>
      </div>

      <div className="w-full py-[34px] px-9 border-t border-[#1A1A1A] sticky bottom-0 bg-[#111115]">

        <div className="w-full flex items-center h bg-[#232227] rounded-[500px] p-5 h-fit">
          <div className="flex">
            <Button variant={'msgBox'}>
              <GalleryIcon className="w-6 h-6 fill-[#E7F8B9] stroke-[#E7F8B9]" />
            </Button>


            <Popover>
              <PopoverTrigger>
                <Button variant={'msgBox'}>
                  <EmojiIcon className="w-6 h-6" />
                </Button>
              </PopoverTrigger>

              <PopoverContent>
                <EmojiPicker  emojiStyle={EmojiStyle.TWITTER} theme={Theme.DARK} onEmojiClick={handleEmojiSelect}/>
              </PopoverContent>
            </Popover>

          </div>

          <Textarea
            placeholder="Type out a new message..."
            value={message}
            className="min-h-[58px] h-auto text-white bg-transparent border-[10rem] border-black outline-none ring-0 focus:outline-none focus-visible:border-none ml-0 py-0"
            onChange={handleChange}
          />

          <Button variant={'msgBox'}

            disabled={sendStatus}
          >
            <SendIcon className='' />
          </Button>
        </div>
      </div>
    </section>
  )
}
