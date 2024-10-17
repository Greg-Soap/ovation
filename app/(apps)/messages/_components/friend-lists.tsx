'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import SearchInput from '../../_components/_timeline/search-input'
import MessageContainer, { type FriendProps } from '../message-container'
import { Button } from '@/components/ui/button'
import {
  type ChatData,
  getActiveChatsForUser,
  type Participant,
} from '@/lib/firebaseChatService'
import { useAppStore } from '@/store/use-app-store'
import Searchinput from './search'

export default function Search() {
  const [friends, setFriends] = useState<ChatData[]>([])
  const [selectedFriend, setSelectedFriend] = useState<ChatData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [storedReceiver, setStoredReceiver] = useState<FriendProps | null>(null)
  const { userId } = useAppStore()

  useEffect(() => {
    fetchChatData()
    const receiver = localStorage.getItem('receiver')
    if (receiver) {
      const parsedReceiver = JSON.parse(receiver) as FriendProps
      setStoredReceiver(parsedReceiver)
      localStorage.removeItem('receiver')
    }
  }, [])

  // Function to get the friend object, either from selectedFriend or storedReceiver
  const getFriendObject = (): FriendProps | null => {
    if (selectedFriend) {
      //@ts-ignore
      return getOtherParticipant(selectedFriend)
    }
    if (storedReceiver) {
      return storedReceiver
    }
    return null
  }

  const fetchChatData = async () => {
    setIsLoading(true)
    try {
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
      (obj) => obj.userId !== userId,
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
          <p className="text-[22px]  font-semibold">Messages</p>
          {/* <SearchInput width="full" /> */}
        </div>
        <Searchinput />
        <div className="flex flex-col gap-4 w-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="">Loading chats...</p>
            </div>
          ) : friends.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="">No active chats</p>
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
                      <p className="flex  items-center text-sm font-medium gap-[3px]">
                        {otherParticipant?.displayName}
                        <span className="text-light text-xs font-normal">
                          @{otherParticipant?.username}
                        </span>
                      </p>
                      <p className="text-xs text-light truncate max-w-[200px]">
                        {friend.lastMessage}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-lighter mt-2">
                    {formatDate(friend.lastMessageSentAt)}
                  </p>
                </Button>
              )
            })
          )}
        </div>
      </div>

      <div
        className={`w-full h-[100vh]  lg:col-span-2 ${getFriendObject() ? 'block' : 'hidden lg:block'}`}
      >
        <MessageContainer
          //@ts-ignore
          friend={getFriendObject()}
          goBack={() => {
            setSelectedFriend(null)
            setStoredReceiver(null)
          }}
        />
      </div>
    </>
  )
}
