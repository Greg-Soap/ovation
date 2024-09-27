'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import SearchInput from '../../_components/_timeline/search-input'
import MessageContainer from '../../messages/message-container'
import { Button } from '@/components/ui/button'
import {
  type ChatData,
  getActiveChatsForUser,
  type Participant,
} from '@/lib/firebaseChatService'
import { getUserId } from '@/lib/helper-func'

export default function FriendList() {
  const [friends, setFriends] = useState<ChatData[]>([])
  const [selectedFriend, setSelectedFriend] = useState<ChatData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchChatData()
  }, [])

  const fetchChatData = async () => {
    setIsLoading(true)
    try {
      const userId = getUserId()

      if (userId) {
        const chatData = await getActiveChatsForUser(userId)

        setFriends(chatData)
      }
    } catch (error) {
      console.error('Error fetching chat data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFriendSelect = (friend: ChatData) => {
    setSelectedFriend(friend)
  }

  const getOtherParticipant = (data: ChatData): Participant | undefined => {
    const otherParticipant = data.participants.find(
      (obj) => obj.userId !== getUserId(),
    )

    return otherParticipant
  }

  const formatDate = (timestamp: any) => {
    const date = timestamp instanceof Date ? timestamp : timestamp.toDate()
    const formattedDate = (() => {
      const now = new Date()
      const diff = now.getTime() - date.getTime()
      const dayInMs = 86400000 // 24 * 60 * 60 * 1000

      if (diff < dayInMs) {
        return date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      }
      if (diff < 7 * dayInMs) {
        return date.toLocaleDateString([], { weekday: 'short' })
      }
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    })()

    return formattedDate
  }

  return (
    <>
      <div
        className={`${
          selectedFriend ? 'hidden lg:flex' : 'flex'
        } w-full min-h-[100vh] h-full lg:col-span-1 flex-col other-link border-r border-[#1A1A1A] overflow-auto`}
      >
        <div className="flex flex-col gap-5 px-[30px] py-8">
          <p className="text-[22px] text-[#F8F8FF] font-semibold">Messages</p>
          {/* <SearchInput width="full" /> */}
        </div>

        <div className="flex flex-col gap-1 w-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-[#F8F8FF]">Loading chats...</p>
            </div>
          ) : friends.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-[#F8F8FF]">No active chats</p>
            </div>
          ) : (
            friends.map((friend, index) => {
              const otherParticipant = getOtherParticipant(friend)

              return (
                <Button
                  className={`flex rounded-none justify-between px-5 py-4 cursor-pointer w-full hover:bg-[#18181C] ${
                    selectedFriend === friend ? 'bg-[#18181C]' : ''
                  }`}
                  key={index}
                  variant="ghost"
                  onClick={() => handleFriendSelect(friend)}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        otherParticipant?.image ??
                        '/assets/images/default-user.svg'
                      }
                      alt="User Display Picture"
                      width={40}
                      height={40}
                      className="rounded-full mr-3"
                    />
                    <div className="flex flex-col gap-1 items-start">
                      <p className="flex text-[#F8F8FF] items-center text-sm font-medium gap-[3px]">
                        {otherParticipant?.displayName}
                        <span className="text-[#B3B3B3] text-xs font-normal">
                          @{otherParticipant?.username}
                        </span>
                      </p>
                      <p className="text-xs text-[#B3B3B3] truncate max-w-[200px]">
                        {friend.lastMessage}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#808080] mt-2">
                    {formatDate(friend.lastMessageSentAt)}
                  </p>
                </Button>
              )
            })
          )}
        </div>
      </div>

      <div
        className={`w-full  lg:col-span-2 ${selectedFriend ? 'block' : 'hidden lg:block'}`}
      >
        <MessageContainer
          //@ts-ignore
          friend={
            selectedFriend ? getOtherParticipant(selectedFriend) ?? null : null
          }
          goBack={() => {
            setSelectedFriend(null)
          }}
        />
      </div>
    </>
  )
}
