'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ArrowLeft } from 'iconsax-react'
import EmojiPicker, {
  type EmojiClickData,
  EmojiStyle,
  Theme,
} from 'emoji-picker-react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'
import { getMessagesForChat, sendMessage } from '@/lib/firebaseChatService'
import GalleryIcon from '@/components/icons/galleryIcon'
import EmojiIcon from '@/components/icons/emojiIcon'
import SendIcon from '@/components/icons/sendIcon'
import { getReceiver, getUserId } from '@/lib/helper-func'
import type { Timestamp } from 'firebase/firestore'
import Spinner from '@/components/ui/spinner'
import { notificationServices } from '../layout'

export interface FriendProps {
  friendDisplayPicture: string
  displayName: string
  userName: string
  lastMessage: string
  lastActive: string
  biography: string
  followingCount: number
  followerCount: number
  isOpened: boolean
  userId: string
}

interface MessageProps {
  userId: string
  message: string
  timestamp: Date
}

function formatMessageTime(timestamp: Timestamp | Date): string {
  const date = timestamp instanceof Date ? timestamp : timestamp.toDate()
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function MessageContainer({
  friend = getReceiver(),
  goBack,
}: {
  friend: FriendProps | null
  goBack: () => void
}) {
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const [isSending, setIsSending] = useState(false)

  const currentUserId = getUserId()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji)
  }

  const fetchMessages = async () => {
    if (!friend) return

    setLoading(true)

    try {
      const messageDocuments = await getMessagesForChat(friend.userId)
      setMessages(
        messageDocuments.messages.reverse().map(
          (doc): MessageProps => ({
            userId: doc.userId,
            message: doc.message,
            timestamp: doc.timestamp,
          }),
        ),
      )
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (friend) {
      fetchMessages()
    }
  }, [friend])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = useCallback(async () => {
    if (!friend || !message.trim()) return

    setIsSending(true)
    try {
      await sendMessage(friend.userId, message)
      setMessage('')
      await fetchMessages()
    } catch (error) {
      console.error('Error sending message:', error)
      // Optionally, show an error toast here
    } finally {
      setIsSending(false)
    }
  }, [friend, message])

  if (!friend) {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <section className="w-full h-[100vh] lg:h-full lg:col-span-2 flex flex-col items-center justify-center bg-[#111115] other-link overflow-auto">
          <div className="flex flex-col items-center gap-[13px]">
            <div className="flex flex-col items-center gap-[6px]">
              <p className=" text-xl font-semibold">No Conversation Selected</p>
              <p className="text-foreground text-center text-sm max-w-[280px]">
                To start a new conversation, visit a user&apos;s profile and
                click the message button.
              </p>
            </div>
          </div>
        </section>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <section className="w-full h-[100vh] lg:h-full lg:col-span-2 flex flex-col bg-[#111115] other-link overflow-scroll">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="flex lg:hidden bg-[rgba(17,17,21,0.8)] items-center gap-4 w-full p-5 sticky top-0 z-10">
            <ArrowLeft
              color="white"
              variant="Outline"
              size={24}
              onClick={goBack}
            />
            <p className="text-sm font-medium ">{friend.displayName}</p>
          </div>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="w-full border-b border-[#1A1A1A] py-9 flex flex-col items-center gap-4 h-fit">
            <Image
              src={
                friend.friendDisplayPicture ?? '/assets/images/default-user.svg'
              }
              alt="User Display Picture"
              width={81}
              height={81}
              className="rounded-full w-[81px] h-[81px] object-cover"
            />
            <div className="flex flex-col gap-1 w-fit items-center">
              <p className=" text-xl font-semibold w-fit leading-[30px] text-center">
                {friend.displayName}
              </p>
              <p className="text-sm text-lighter w-fit">{friend.userName}</p>
            </div>
          </div>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="flex-grow overflow-y-auto px-3 pt-[30px] pb-[100px] md:px-[30px] md:pt-[30px] md:pb-[90px] xir:p-[30px]">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p className="">Loading messages...</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`w-full flex flex-col gap-1 ${
                    msg.userId === currentUserId ? 'items-end' : 'items-start'
                  } mb-5`}
                >
                  <p
                    className={`px-5 py-[10px] rounded-[20px]  text-sm font-medium max-w-[85%] lg:max-w-[50%] ${
                      msg.userId === currentUserId
                        ? 'bg-[#1D3E00] rounded-tr-[20px]'
                        : 'bg-[#232227] rounded-tl-[20px]'
                    }`}
                  >
                    {msg.message}
                  </p>
                  <span className="text-xs text-gray-500">
                    {formatMessageTime(msg.timestamp)}
                  </span>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="w-full p-5 border-t border-[#1A1A1A] sticky bottom-0 bg-[#111115]">
            <div className="w-full flex items-center bg-[#232227] rounded-[500px] p-2 h-[50px]">
              <div className="flex">
                {/* <Button variant={'msgBox'}>
                  <GalleryIcon className="w-6 h-6 mr-[-18px] fill-[#E7F8B9] stroke-[#E7F8B9]" />
                </Button> */}
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
                className="h-[24px]  bg-transparent border-none  outline-none ring-0 focus:outline-none focus-visible:border-none ml-0 py-"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                disabled={isSending}
              />
              <Button
                onClick={handleSendMessage}
                variant={'msgBox'}
                disabled={!message.trim() || isSending}
              >
                {isSending ? (
                  <Spinner size="small" />
                ) : (
                  <SendIcon className="" />
                )}
              </Button>
            </div>
          </div>
        </ErrorBoundary>
      </section>
    </ErrorBoundary>
  )
}
