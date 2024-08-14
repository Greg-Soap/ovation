'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import SearchInput from '../../_components/_timeline/search-input'
import MessageContainer from '../../messages/message-container'

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

  const [friends, setFriends] = useState<Friend[]>([
    {
      friendDisplayPicture: '/assets/images/timeline/Oval.png',
      displayName: 'Pancakeguy',
      userName: '@Pancakeguy',
      lastMessage: 'How are you doing?',
      lastActive: '3mins',
      biography:
        'Passionate NFT holder exploring the future of digital ownership. Join me in discovering the limitless possibilities of the NFT ecosystem. ',
      followingCount: 700,
      followerCount: 1.65,
      isOpened: false,
    },
    {
      friendDisplayPicture: '/assets/images/timeline/Shape.png',
      displayName: 'Stay there',
      userName: '@RotelOtis',
      lastMessage: 'Stop heading for the car you gave me',
      lastActive: '15hrs',
      biography:
        'Passionate music listener exploring different music genre"s. Join me as I vibe to Heading for the door by Royel Otis',
      followingCount: 500,
      followerCount: 1.55,
      isOpened: false,
    },
    {
      friendDisplayPicture: '/assets/images/timeline/Oval.png',
      displayName: 'Nate',
      userName: '@NF',
      lastMessage: 'if ever there was time that aint fair',
      lastActive: '10hrs',
      biography: 'The end of the world could just be a day',
      followingCount: 350,
      followerCount: 1.5,
      isOpened: false,
    },
    {
      friendDisplayPicture: '/assets/images/timeline/Shape.png',
      displayName: 'James Arthur',
      userName: '@Sinner',
      lastMessage: 'I cant afford to lie',
      lastActive: '4hrs',
      biography:
        'Stop looking for a knife, stop looking through the drawer it aint there, I cant afford to lie, I cant afford to lay the night down. It is just a night..',
      followingCount: 800,
      followerCount: 1.95,
      isOpened: false,
    },
    {
      friendDisplayPicture: '/assets/images/timeline/Oval.png',
      displayName: 'Sofa King',
      userName: '@Wait',
      lastMessage: 'I cant afford to lay the the night down',
      lastActive: '3s',
      biography:
        'Stop heading for the door, , stop heading for the car you gave me, I cant apologise, Im in it for the night, im in it for the night we had here..',
      followingCount: 764,
      followerCount: 1.63,
      isOpened: false,
    },
  ])

  const [clickFriend, setClickedFriend] = useState<Friend | null>(null)

  const handleClick = (index: number) => {
    const updatedList = friends.map((friend, i) => ({
      ...friend,
      isOpened: i === index,
    }))

    setFriends(updatedList)
    setClickedFriend(updatedList[index])
  }

  return (
    <>
      <div
        className={`${clickFriend ? 'hidden lg:flex' : 'flex'} w-full h-[100vh] lg:h-full lg:col-span-1 flex-col other-link border-r border-[#1A1A1A] overflow-auto`}
      >
        <div className="flex flex-col gap-5 px-[30px] py-8">
          <p className="text-[28px] text-white font-semibold">Mesaages</p>
          <SearchInput width="full" />
        </div>

        <div className="flex flex-col gap-1 w-full">
          {friends.map((friend, index) => (
            <div
              className={`flex justify-between px-5 py-4 cursor-default ${friend.isOpened && 'bg-[#18181C]'}`}
              key={index}
              onClick={() => handleClick(index)}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={friend.friendDisplayPicture}
                  alt="User Display Picture"
                  width={44}
                  height={44}
                />

                <div className="flex flex-col">
                  <p className="flex text-white items-center text-lg font-medium gap-1">
                    {friend.displayName}
                    <span className="text-[#B3B3B3] text-sm font-normal">
                      {friend.userName}
                    </span>
                  </p>
                  <p className="text-sm text-[#B3B3B3]">{friend.lastMessage}</p>
                </div>
              </div>

              <p className="text-xs text-[#808080] mt-2">{friend.lastActive}</p>
            </div>
          ))}
        </div>
      </div>

      <MessageContainer friend={clickFriend} />
    </>
  )
}
