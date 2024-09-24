'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import SearchInput from '../../_components/_timeline/search-input'
import MessageContainer from '../../messages/message-container'
import { Button } from '@/components/ui/button'
import { ChatData, getActiveChatsForUser, Participant } from '@/lib/firebaseChatService'

export default function FriendList() {
  interface Friend {
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

  const getChatData = async () => {
    setFriends(await getActiveChatsForUser('07d8376c-7dfa-4b98-b802-043c300ed78a'));
  }

  useEffect(() => {
    getChatData()
  }, [])

  const [friends, setFriends] = useState<ChatData[] | null>()

  const [clickFriend, setClickedFriend] = useState<ChatData | null>(null)

  const handleClick = (index: number) => {
    var updatedList = null as ChatData[] | null
    if (friends != null) {
      updatedList = friends.map((friend, i) => ({
        ...friend,
        isOpened: i === index,
      }))
    }

    setFriends(updatedList)
    if (updatedList != null)
      setClickedFriend(updatedList[index])

  }

  const getParticipants = (data: ChatData): Participant | undefined => {
    return data.participants.find(obj => obj.userId != '07d8376c-7dfa-4b98-b802-043c300ed78a');
  };

  return (
    <>
      <div
        className={`${clickFriend ? 'hidden lg:flex' : 'flex'} w-full h-[100vh] lg:h-full lg:col-span-1 flex-col other-link border-r border-[#1A1A1A] overflow-auto`}>
        <div className='flex flex-col gap-5 px-[30px] py-8'>
          <p className='text-[22px] text-[#F8F8FF] font-semibold'>Messages</p>
          <SearchInput width='full' />
        </div>

        <div className='flex flex-col gap-1 w-full'>
          {friends?.map((friend, index) => (
            <Button
              className={`flex justify-between px-5 py-4 cursor-default ${true && 'bg-[#18181C]'}`}
              key={index}
              onClick={() => handleClick(index)}>
              <div className='flex items-center gap-3'>
                <Image
                  src={getParticipants(friend)?.image ?? ''}
                  alt='User Display Picture'
                  width={36}
                  height={36}
                />

                <div className='flex flex-col gap-1'>
                  <p className='flex text-[#F8F8FF] items-center text-sm font-medium gap-[3px]'>
                    {getParticipants(friend)?.displayName}
                    <span className='text-[#B3B3B3] text-xs font-normal'>{getParticipants(friend)?.username}</span>
                  </p>
                  <p className='text-xs text-[#B3B3B3]'>{friend.lastMessage}</p>
                </div>
              </div>

              <p className='text-[11px] text-[#808080] mt-2'>{friend.lastMessageSentAt.toDateString()}</p>
            </Button>
          ))}
        </div>
      </div>

      <MessageContainer friend={clickFriend} goBack={() => setClickedFriend(null)} />
    </>
  )
}
