'use client'

import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { type ReactElement, useState, type ChangeEvent } from 'react'
import VerifyIcon from '../../../../components/icons/verifyIcon'
import NftIcon from '../../../../components/icons/nftIcon'
import GalleryIcon from '../../../../components/icons/galleryIcon'
import PollIcon from '../../../../components/icons/pollIcon'
import EventIcon from '../../../../components/icons/eventIcon'
import MicrophoneIcon from '../../../../components/icons/microphoneIcon'

export default function PublishPost() {
  interface Tag {
    icon: ReactElement
    text: string
    isActive: boolean
  }

  const [tags, setTags] = useState<Tag[]>([
    {
      icon: <NftIcon className="w-[15px] h-4 stroke-[#E6E6E6]" />,
      text: 'NFT',
      isActive: false,
    },
    {
      icon: (
        <GalleryIcon className="h-4 w-[17px] fill-[#E6E6E6] stroke-[#E6E6E6]" />
      ),
      text: 'Media',
      isActive: false,
    },
    { icon: <PollIcon />, text: 'Poll', isActive: false },
    {
      icon: <EventIcon className="w-[17px] h-4 stroke-[#E6E6E6]" />,
      text: 'Event',
      isActive: false,
    },
    { icon: <MicrophoneIcon />, text: 'Record', isActive: false },
  ])

  const [disabledBtn, setDisabledBtn] = useState<boolean>(true)

  const handleClick = (index: number) => {
    const updatedList = tags.map((tag, i) => ({
      ...tag,
      isActive: i === index ? !tag.isActive : false,
    }))

    setTags(updatedList)
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === '') {
      setDisabledBtn(true)
    } else {
      setDisabledBtn(false)
    }
  }

  return (
    <section className="w-full flex items-center px-[10px] py-[25px] border-b border-[#1A1A1A]">
      <div className="w-full flex flex-col h-fit bg-[#18181C] rounded-[20px] px-[23px] py-6 gap-5">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/images/timeline/Shape.png"
            alt="User Display Picture"
            width={40}
            height={40}
          />

          <div className="flex flex-col">
            <p className="flex gap-1 items-center text-base font-semibold leading-5 ">
              displayname
              <VerifyIcon />
            </p>
            <p className="text-xs leading-5 font-medium text-light">
              @username
            </p>
          </div>
        </div>

        <Textarea
          className="min-h-[65px] border-none outline-none rounded-[10px] bg-[#232227] text-sm text-light ring-offset-0 placeholder:text-light focus-visible:ring-0"
          placeholder="Type your message here."
          onChange={handleChange}
        />

        <div className="flex pt-5 border-t border-[#353538] w-full items-center justify-between">
          <div className="flex items-center gap-3">
            {tags.map((tag, index) => (
              <Button
                variant="outline"
                className={`flex items-center px-4 py-3 font-semibold gap-[6px] rounded-[400px] text-xs text-foreground border-[#353538] hover:bg-[#cff07333] hover:text-foreground ${tag.isActive ? 'bg-[#cff07366]' : 'bg-[#232227]'}`}
                key={index}
                onClick={() => handleClick(index)}
              >
                {tag.icon}
                {tag.text}
              </Button>
            ))}
          </div>

          <Button
            variant="secondary"
            disabled={disabledBtn}
            className="px-4 py-3 font-semibold text-xs rounded-[400px] bg-[#cff07366] text-foreground hover:bg-[#cff07333] aria-disabled:true"
          >
            Publish Post
          </Button>
        </div>
      </div>
    </section>
  )
}
