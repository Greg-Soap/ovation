import Image from 'next/image'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import type { ReactElement } from 'react'
import React, { useState } from 'react'
import VerifyIcon from '../../../../components/icons/verifyIcon'
import MoreIcon from '../../../../components/icons/moreIcon'
import PinIcon from '../../../../components/icons/pinIcon'
import CopyIcon from '../../../../components/icons/copyIcon'
import MuteIcon from '../../../../components/icons/muteIcon'
import ShareIcon from '../../../../components/icons/shareIcon'
import DeleteIcon from '../../../../components/icons/deleteIcon'
import LikeIcon from '../../../../components/icons/likeIcon'
import MessageIcon from '../../../../components/icons/messageIcon'
import RepostIcon from '../../../../components/icons/repostIcon'
import ClapIcon from '../../../../components/icons/clapIcon'
import PlayIcon from '../../../../components/icons/playIcon'

interface PostMenu {
  icon: ReactElement
  text: string
  isDeleteButton: boolean
}

interface PostAction {
  icon: ReactElement
  value: number
  isActive: boolean
}

const postMenu: PostMenu[] = [
  { icon: <PinIcon />, text: 'Pin to profile', isDeleteButton: false },
  { icon: <CopyIcon />, text: 'Copy post link', isDeleteButton: false },
  { icon: <MuteIcon />, text: 'Mute this post', isDeleteButton: false },
  { icon: <ShareIcon />, text: 'Share this post', isDeleteButton: false },
  { icon: <DeleteIcon />, text: 'Delete post', isDeleteButton: true },
]

const posts = [
  {
    id: 1,
    userDisplayPicture: '/assets/images/timeline/Shape.png',
    displayName: 'Trevor Belmont',
    userName: 'trevor12',
    imgSrc: '/assets/images/timeline/_post/post-media.png',
    transcripts: [
      { time: '', text: '' },
      { time: '', text: '' },
      { time: '', text: '' },
      { time: '', text: '' },
      { time: '', text: '' },
    ],
    extraTranscripts: [
      { time: '', text: '', isHidden: false },
      { time: '', text: '', isHidden: false },
      { time: '', text: '', isHidden: false },
      { time: '', text: '', isHidden: false },
      { time: '', text: '', isHidden: false },
    ],
    eventHeader: '',
    eventImage: '',
    eventDate: '',
    eventLocation: '',
    hasMedia: true,
    hasEvent: false,
    hasVoiceRecord: false,
  },
  {
    id: 2,
    userDisplayPicture: '/assets/images/timeline/Oval.png',
    displayName: 'Alucard',
    userName: 'alucard12',
    imgSrc: '',
    transcripts: [
      { time: '', text: '' },
      { time: '', text: '' },
      { time: '', text: '' },
      { time: '', text: '' },
      { time: '', text: '' },
    ],
    extraTranscripts: [
      { time: '', text: '', isHidden: false },
      { time: '', text: '', isHidden: false },
      { time: '', text: '', isHidden: false },
      { time: '', text: '', isHidden: false },
      { time: '', text: '', isHidden: false },
    ],
    eventHeader: 'MINT DAY: Kansas city',
    eventImage: '/assets/images/timeline/_post/image7.png',
    eventDate: 'Wed, 24 Jan, 15:00 - 20:00',
    eventLocation: 'Virtual event',
    hasMedia: false,
    hasEvent: true,
    hasVoiceRecord: false,
  },
  {
    id: 3,
    userDisplayPicture: '/assets/images/timeline/Oval.png',
    displayName: 'Outcast',
    userName: 'lummie12',
    imgSrc: '',
    transcripts: [
      { time: '00.00', text: 'How are you?' },
      { time: '00.05', text: 'Hope you are good?' },
      { time: '00.09', text: 'Where are you?' },
      { time: '00.15', text: 'Come on in' },
      { time: '00.19', text: 'Everyone is welcomed here' },
    ],
    extraTranscripts: [
      { time: '00:26', text: 'Lorem ipsum', isHidden: false },
      { time: '00:30', text: 'Lorem ipsum', isHidden: false },
      { time: '00:37', text: 'Lorem ipsum', isHidden: false },
      { time: '00:44', text: 'Lorem ipsum', isHidden: false },
      { time: '00:56', text: 'Lorem ipsum', isHidden: false },
    ],
    eventHeader: '',
    eventImage: '',
    eventDate: '',
    eventLocation: '',
    hasMedia: false,
    hasEvent: false,
    hasVoiceRecord: true,
  },
  {
    id: 4,
    userDisplayPicture: '/assets/images/timeline/Shape.png',
    displayName: 'Nino Uptown',
    userName: 'sametime',
    imgSrc: '',
    transcripts: [
      { time: '', text: '' },
      { time: '', text: '' },
      { time: '', text: '' },
      { time: '', text: '' },
      { time: '', text: '' },
    ],
    extraTranscripts: [
      { time: '', text: '', isHidden: false },
      { time: '', text: '', isHidden: false },
      { time: '', text: '', isHidden: false },
      { time: '', text: '', isHidden: false },
      { time: '', text: '', isHidden: false },
    ],
    eventHeader: '',
    eventImage: '',
    eventDate: '',
    eventLocation: '',
    hasMedia: false,
    hasEvent: false,
    hasVoiceRecord: false,
  },
]

export default function TimelinePosts() {
  const [isShown, setIsShown] = useState(posts)

  const toggleTranscripts = (index: number) => {
    const updatedList = isShown.map((item, i) =>
      i === index
        ? {
            ...item,
            extraTranscripts: item.extraTranscripts.map((transcript) => ({
              ...transcript,
              isHidden: !transcript.isHidden,
            })),
          }
        : item,
    )

    setIsShown(updatedList)
  }

  const [postActions, setPostActions] = useState<PostAction[]>([
    { icon: <LikeIcon className="w-[17px] h-4" />, value: 43, isActive: false },
    { icon: <MessageIcon />, value: 43, isActive: false },
    { icon: <RepostIcon />, value: 43, isActive: false },
    { icon: <ClapIcon />, value: 43, isActive: false },
  ])

  const handleClick = (index: number) => {
    const updatedList = postActions.map((action, i) => ({
      ...action,
      isActive: i === index ? !action.isActive : action.isActive,
    }))

    setPostActions(updatedList)
  }

  return (
    <>
      {isShown.map((post, index) => (
        <section
          className="w-full  h-fit py-10 px-[10px] flex flex-col  items-center  border-t border-[#1A1A1A]"
          key={post.id}
        >
          <article className="max-w-[820px] flex flex-col  items-end gap-2">
            <div className="w-full flex h-fit items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <Image
                  src={post.userDisplayPicture}
                  alt="User Display Picture"
                  width={36}
                  height={36}
                />

                <div className="flex items-center gap-1">
                  <p className="text-base font-semibold  mr-2 flex items-center gap-1">
                    {post.displayName}
                    <VerifyIcon />
                  </p>
                  <p className="text-xs font-medium text-lighter">
                    {post.userName}
                  </p>
                  <div className="w-1 h-1 rounded-full bg-[#808080]" />
                  <p className="text-xs leading-5 font-medium text-lighter">
                    2h
                  </p>
                </div>
              </div>

              <Popover>
                <PopoverTrigger className="p-1 rounded-full">
                  <MoreIcon />
                </PopoverTrigger>
                <PopoverContent className="w-fit bg-[#232227] flex flex-col items-start px-2 py-4 border-none">
                  {postMenu.map((menu, index) => (
                    <Button
                      variant="default"
                      className={`flex py-[10px] w-full justify-start bg-transparent gap-2 font-medium rounded-none ${menu.isDeleteButton ? 'text-[#FF0000]' : ''}`}
                      key={index}
                    >
                      {menu.icon}
                      {menu.text}
                    </Button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>

            <div
              className={
                'flex flex-col w-[93.5%] h-fit max-w-[820px] gap-[22px]'
              }
            >
              <p className="text-sm leading-5 text-foreground">
                Dedicated NFT enthusiast, embracing the
                <span className="text-primary"> #digital</span> revolution one
                token at a time. Let&apos; explore the world of blockchain art
                together! #NFTCommunity Let&apos; explore the world of
                blockchain art together! #NFTCommunity Let&apos; explore the
                world of blockchain art together! #NFTCommunity
              </p>

              <div
                className={`${post.hasMedia ? 'flex' : 'hidden'} w-full h-auto rounded-[20px] flex-col`}
              >
                <img
                  src={post.imgSrc}
                  alt="Post media"
                  className="w-full h-auto"
                />
              </div>

              <div
                className={`${post.hasVoiceRecord ? 'flex' : 'hidden'} flex-col w-full h-fit`}
              >
                <div className="flex w-full py-3 px-[17px] rounded-[500px] items-center gap-[6px] bg-[#232227] mb-5">
                  <div className="w-fit h-fit rounded-full bg-black">
                    <PlayIcon />
                  </div>
                  <img
                    src="/assets/images/timeline/frame121.svg"
                    alt="Recording"
                    className="w-[82%] h-4"
                  />
                  <p className=" text-sm">05:04</p>
                  <Button
                    variant="default"
                    className="px-3 py-0 h-[20px] bg-[#111115] rounded-[500px] leading-4 text-xs "
                  >
                    1x
                  </Button>
                </div>

                <div className="flex flex-col w-full h-fit px-4 gap-3 border-l-[4px] border-[#4D4D4D]">
                  {post.transcripts.map((list, index) => (
                    <p
                      className="flex items-center gap-2 text-sm text-lighter"
                      key={index}
                    >
                      {list.time} <span className="">{list.text}</span>
                    </p>
                  ))}
                  {post.extraTranscripts.map((list, index) => (
                    <p
                      className={`${list.isHidden ? 'flex' : 'hidden'} items-center gap-2 text-sm text-lighter`}
                      key={index}
                    >
                      {list.time} <span className="">{list.text}</span>
                    </p>
                  ))}
                  <Button
                    variant="default"
                    className="p-0 w-fit h-fit bg-transparent text-sm text-[#9CBD40] font-normal hover:opacity-80 transition-all duration-300"
                    onClick={() => toggleTranscripts(index)}
                  >
                    {isShown ? 'Hide transcript' : 'View transcript'}
                  </Button>
                </div>
              </div>

              <div
                className={`${post.hasEvent ? 'flex' : 'hidden'} flex-col w-full h-fit border border-[#18181C] rounded-lg`}
              >
                <p className="py-5 px-3 text-sm font-semibold  bg-[#18181C]">
                  {post.eventHeader}
                </p>
                <img
                  src={post.eventImage}
                  alt="Link Preview"
                  className="w-full h-auto"
                />
                <div className="px-3 flex flex-col bg-[#18181C] pt-3 py-1">
                  <p className="flex items-center gap-[6px] text-[11px] leading-[15px] text-light">
                    <Image
                      src="/assets/images/timeline/_post/calender.png"
                      alt="calender icon"
                      width={12}
                      height={12}
                    />
                    {post.eventDate}
                  </p>
                  <Button
                    variant="link"
                    className="flex items-center w-fit p-0 leading-[15px] underline gap-[6px] text-[11px] text-light bg-transparent font-normal"
                  >
                    <Image
                      src="/assets/images/timeline/_post/location.png"
                      alt="calender icon"
                      width={12}
                      height={12}
                    />
                    {post.eventLocation}
                  </Button>
                </div>

                <div className="flex w-full items-center justify-end p-3">
                  <Button className="text-[10px] leading-3 text-[#111115] py-2 px-[10px] bg-primary">
                    Add to calender
                  </Button>
                </div>
              </div>

              <div className="w-full flex h-fit gap-3">
                {postActions.map((action, index) => (
                  <Button
                    variant="default"
                    className={`flex gap-1 bg-transparent outline-none px-1 py-0 rounded-none text-xs leading-4 ${action.isActive ? 'text-[#cff073cc] fill-[#cff07366] stroke-[#cff07366]' : 'text-light fill-light stroke-light'}`}
                    key={index}
                    onClick={() => handleClick(index)}
                  >
                    {action.icon}
                    {action.value}
                  </Button>
                ))}
              </div>
            </div>
          </article>
        </section>
      ))}
    </>
  )
}
