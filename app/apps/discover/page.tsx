'use client'

import Grider from '@/components/layout/grider'
import OtherLinks from '../_sections/_timeline/other-link'
import SearchInput from '../_components/_timeline/search-input'
import { Button } from '@/components/ui/button'
import VerifyIcon from '@/components/icons/verifyIcon'
import Image from 'next/image'
import Link from 'next/link'
import {
  BadgedHolders,
  FeaturedUser,
  DiscoverFilter,
  DiscoverHoldersProps,
} from '@/app/types'
import { useEffect, useState } from 'react'

const TestData: BadgedHolders[] = [
  {
    id: '1',
    displayName: 'ETHplorer',
    userName: 'ethAlice',
    displayImg: 'pfp1.jpeg',
    collectorAmount: 5,
    creatorAmount: 2,
    topHoldersAmount: 10,
    founderNftAMount: 1,
    netWorth: 10000,
    contributorAmount: 990,
    blueAmount: 2390,
  },
  {
    id: '2',
    displayName: 'BtcBOB',
    userName: 'btcBob',
    displayImg: 'pfp2.jpeg',
    collectorAmount: 8,
    creatorAmount: 1,
    topHoldersAmount: 15,
    founderNftAMount: 2,
    netWorth: 15000,
    contributorAmount: 1090,
    blueAmount: 2005,
  },
  {
    id: '3',
    displayName: 'SolanaStriker',
    userName: 'solCharlie',
    displayImg: 'pfp3.jpeg',
    collectorAmount: 3,
    creatorAmount: 5,
    topHoldersAmount: 5,
    founderNftAMount: 0,
    netWorth: 8000,
    contributorAmount: 8014,
    blueAmount: 2400,
  },
  {
    id: '4',
    displayName: 'RippleRanger',
    userName: 'rippleRanger',
    displayImg: 'pfp4.jpeg',
    collectorAmount: 7,
    creatorAmount: 2,
    topHoldersAmount: 12,
    founderNftAMount: 3,
    netWorth: 12000,
    contributorAmount: 3334,
    blueAmount: 2550,
  },
  {
    id: '5',
    displayName: 'CardanoCrusader',
    userName: 'cardanoCrusader',
    displayImg: 'pfp5.jpeg',
    collectorAmount: 4,
    creatorAmount: 4,
    topHoldersAmount: 8,
    founderNftAMount: 1,
    netWorth: 9500,
    contributorAmount: 2348,
    blueAmount: 1090,
  },
  {
    id: '6',
    displayName: 'LitecoinLurker',
    userName: 'litecoinLurker',
    displayImg: 'pfp11.jpeg',
    collectorAmount: 6,
    creatorAmount: 3,
    topHoldersAmount: 11,
    founderNftAMount: 2,
    netWorth: 11000,
    contributorAmount: 4327,
    blueAmount: 37400,
  },
  {
    id: '7',
    displayName: 'PolkaPilot',
    userName: 'polkaPilot',
    displayImg: 'pfp6.jpeg',
    collectorAmount: 9,
    creatorAmount: 1,
    topHoldersAmount: 14,
    founderNftAMount: 4,
    netWorth: 14000,
    contributorAmount: 5129,
    blueAmount: 5783,
  },
  {
    id: '8',
    displayName: 'ChainlinkChampion',
    userName: 'chainlinkChampion',
    displayImg: 'pfp7.jpeg',
    collectorAmount: 2,
    creatorAmount: 6,
    topHoldersAmount: 7,
    founderNftAMount: 0,
    netWorth: 7000,
    contributorAmount: 8300,
    blueAmount: 900,
  },
  {
    id: '9',
    displayName: 'TezosTracker',
    userName: 'tezosTracker',
    displayImg: 'pfp8.jpeg',
    collectorAmount: 5,
    creatorAmount: 2,
    topHoldersAmount: 9,
    founderNftAMount: 2,
    netWorth: 10500,
    contributorAmount: 12900,
    blueAmount: 11000,
  },
  {
    id: '10',
    displayName: 'MoneroMaverick',
    userName: 'moneroMaverick',
    displayImg: 'pfp9.jpeg',
    collectorAmount: 8,
    creatorAmount: 0,
    topHoldersAmount: 16,
    founderNftAMount: 5,
    netWorth: 16000,
    contributorAmount: 33590,
    blueAmount: 13009,
  },
  {
    id: '11',
    displayName: 'DashDaredevil',
    userName: 'dashDaredevil',
    displayImg: 'pfp10.jpeg',
    collectorAmount: 7,
    creatorAmount: 3,
    topHoldersAmount: 13,
    founderNftAMount: 3,
    netWorth: 13000,
    contributorAmount: 14300,
    blueAmount: 12400,
  },
]

const FeaturedTest: FeaturedUser = {
  displayName: 'Josh.eth',
  userName: 'josh2rich',
  nftCount: 10, // Assuming these should be numbers, not strings
  ovaToken: 20,
  archToken: 12,
  badges: 7,
  img: '/assets/images/timeline/_other-section/featured.png',
  desc: 'Passionate NFT holder exploring the future of digital ownership. Join me in discovering the limitless possibilities of the NFT ecosystem. #NFTCommunity',
}

export default function page() {
  return (
    <div className="flex flex-col w-full  bg-[#111115] h-fit items-center justify-center">
      <div
        className="h-[250px] w-full g-orange-400 flex items-center justify-center bg-cover shadow"
        style={{ backgroundImage: `url('/assets/images/discoverBack.svg')` }}
      >
        <SearchInput
          inpClass="bg-white rounded-md w-[880px] border-none"
          iconClass={{ fill: 'black' }}
        />
      </div>
      <GetStarted />
      <div className=" flex flex-col lg:grid lg:grid-cols-3 w-[95%] gap-5">
        <DiscoverLeft />
        {/* <OtherLinks /> */}
        <DiscoverRight filteredData={TestData} />
      </div>
    </div>
  )
}

function GetStarted() {
  return (
    <div className="w-[95%] h-fit rounded-[14px] flex flex-col p-6 border border-[#353538] gap-[30px] mt-10">
      <div className="flex flex-col ga-1">
        <p className="text-white font-medium">GET STARTED</p>
        <p className="text-[#B3B3B3]">Complete your profile to win rewards!</p>
      </div>

      <div className="w-full h-fit flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4 bg-[#18181C] border border-[#FFFFFF14] rounded-[10px] items-center justify-between  px-5 py-10">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full min-w-11 min-h-11 bg-[#333726]">
              <img
                src="/assets/images/profile/task1.png"
                alt="wallet icon"
                className="w-[22px] h-[22px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold text-sm">
                SEE HOW YOU RANK AGAINST OTHER WEB3 CREATORS
              </p>
              <p className="text-xs text-[#999999]">
                <span className="text-white">50 $OVA</span> 50 $OVA for every
                additional wallet after the first (This wallet must have at
                least 1 NFT)
              </p>
            </div>
          </div>

          <Button
            asChild
            className="transition-all duration-300 hover:opacity-80"
          >
            <Link
              href="/login"
              className="text-[10px] text-[#111115] font-medium"
            >
              Go to profile
            </Link>
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4  bg-[#18181C] border border-[#FFFFFF14] rounded-[10px] items-center justify-between px-5 py-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-full min-w-11 min-h-11 bg-[#333726]">
              <img
                src="/assets/images/profile/task2.png"
                alt="wallet icon"
                className="w-[22px] h-[22px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold text-sm">
                SEE HOW YOU RANK AGAINST OTHER WEB3 CREATORS
              </p>
              <p className="text-xs text-[#999999]">
                Finish your profile to earn{' '}
                <span className="text-white">250 $OVA!</span>
              </p>
            </div>
          </div>

          <Button
            asChild
            className="transition-all duration-300 hover:opacity-80"
          >
            <Link
              href="/login"
              className="text-[10px] text-[#111115] font-medium"
            >
              Go to profile
            </Link>
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4  bg-[#18181C] border border-[#FFFFFF14] rounded-[10px] items-center justify-between px-5 py-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-full min-w-11 min-h-11 bg-[#333726]">
              <img
                src="/assets/images/profile/task3.png"
                alt="wallet icon"
                className="w-[22px] h-[22px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold text-sm">
                SEE HOW YOU RANK AGAINST OTHER WEB3 CREATORS
              </p>
              <p className="text-xs text-[#999999]">
                For every user you invite, you get{' '}
                <span className="text-white">50 $OVA.</span> Send proof to
                hello@ovation.network or on Twitter ovation_network
              </p>
            </div>
          </div>

          <Button
            asChild
            className="transition-all duration-300 hover:opacity-80"
          >
            <Link
              href="/login"
              className="text-[10px] text-[#111115] font-medium"
            >
              Copy referral link
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function DiscoverLeft() {
  const [Filter, setFilter] = useState<DiscoverFilter>(DiscoverFilter.Creators)
  return (
    <div className="col-span-2 mt-10 mb-[20px] flex flex-col gap-10">
      <DiscoverFeature {...FeaturedTest} />
      <DiscoverHolders setFilter={setFilter} Filter={Filter} data={TestData} />
    </div>
  )
}

function DiscoverFeature(user: FeaturedUser) {
  return (
    <div className="border border-[#FFFFFF14] rounded-[14px] p-6 gap-9 flex flex-col">
      <div className="flex items-center w-full justify-between">
        <p className="text-base font-medium text-white">FEATURED</p>

        <Button className="bg-white text-[#0B0A10] font-semibold border-none outline-none px-4 py-[10px] rounded-[400px] w-fit h-fit text-xs transition-all duration-300 hover:opacity-80">
          View all
        </Button>
      </div>
      <div
        id="featured-user"
        className={`flex-col lg:flex-row flex gap-10 items-center w-full`}
      >
        <img
          src="/assets/images/timeline/_other-section/featured.png"
          alt={`${user.userName}'s display picture`}
          className="w-[50%] h-auto rounded-2xl"
        />

        <div className="flex flex-col max-w-[372px] gap-4">
          <div className="flex items-center w-full justify-between pb-6 border-b border-[#FFFFFF0D]">
            <div className="flex items-center gap-2">
              <img
                src={user.img}
                alt={`${user.userName}'s display picture`}
                className="rounded-full w-12 h-12"
              />

              <div className="flex flex-col">
                <p className="flex gap-1 items-center text-base font-semibold leading-5 text-white">
                  {user.displayName}
                  <VerifyIcon />
                </p>
                <p className="text-xs leading-5 font-medium text-[#B3B3B3]">
                  {`@${user.userName}`}
                </p>
              </div>
            </div>

            <Button className="bg-[#CFF073] px-2 py-[6px] border-none outline-none font-medium w-fit h-fit text-[#0B0A10] text-[9.6px] transition-all duration-300 hover:opacity-80">
              Follow
            </Button>
          </div>

          <p className="text-sm text-[#B3B3B3] pb-6 border-b border-[#FFFFFF0D]">
            {user.desc}
          </p>
          <div className="flex w-full gap-2">
            <p className="rounded-full border-[1px] text-[10px] py-1 px-2 text-white bg-[#18181C] border-[#353538]">
              {`NFT count: ${user.nftCount}`}
            </p>
            <p className="rounded-full border-[1px] text-[10px] py-1 px-2 text-white bg-[#18181C] border-[#353538]">
              {`Arch Tokens: ${user.archToken}`}
            </p>
            <p className="rounded-full border-[1px] text-[10px] py-1 px-2 text-white bg-[#18181C] border-[#353538]">
              {`Badges: ${user.badges}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function DiscoverHolders({ setFilter, Filter, data }: DiscoverHoldersProps) {
  const [filteredData, setFilteredData] = useState<BadgedHolders[]>(
    data.sort((a, b) => a.contributorAmount - b.contributorAmount),
  )

  useEffect(() => {
    const filterData = () => {
      let newData = [...data] // Create a shallow copy of data to avoid direct mutation

      if (Filter === DiscoverFilter.Contributors) {
        // Assuming you want to sort the data based on some criteria
        // Replace `criteria` with the actual property you want to sort by
        newData.sort((a, b) => a.contributorAmount - b.contributorAmount)
      } else if (Filter === DiscoverFilter.BlueChipHolders) {
        // Assuming you want to sort the data based on some criteria
        // Replace `criteria` with the actual property you want to sort by
        newData.sort((a, b) => a.blueAmount - b.blueAmount)
      } else if (Filter === DiscoverFilter.Creators) {
        // Assuming you want to sort the data based on some criteria
        // Replace `criteria` with the actual property you want to sort by
        newData.sort((a, b) => a.creatorAmount - b.creatorAmount)
      } else if (Filter === DiscoverFilter.FounderHolders) {
        // Assuming you want to sort the data based on some criteria
        // Replace `criteria` with the actual property you want to sort by
        newData.sort((a, b) => a.founderNftAMount - b.founderNftAMount)
      } else if (Filter === DiscoverFilter.HighestNetWorth) {
        // Assuming you want to sort the data based on some criteria
        // Replace `criteria` with the actual property you want to sort by
        newData.sort((a, b) => a.netWorth - b.netWorth)
      } else if (Filter === DiscoverFilter.NftHolders) {
        // Assuming you want to sort the data based on some criteria
        // Replace `criteria` with the actual property you want to sort by
        newData.sort((a, b) => a.topHoldersAmount - b.topHoldersAmount)
      }

      setFilteredData(newData)
    }

    console.log(filteredData)

    filterData()
  }, [Filter, data]) // This effect depends on `Filter` and `data`, it runs whenever either changes

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex justify-between items-center text-base font-medium text-white">
        <p>TOP BADGED HOLDERS</p>
        <Button className="bg-white">View all</Button>
      </div>

      <div className="p-4 items-center w-full rounded-lg flex flex-col gap-10 border-[#353538] border-[1px]">
        <div className="w-full flex gap-2 overflow-auto pb-1">
          <Button
            className={`${Filter === DiscoverFilter.Contributors ? 'bg-white text-[#232227]' : 'bg-[#232227] text-[#999999]'} rounded-full px-5 py-[10px] h-fit text-xs`}
            onClick={() => {
              setFilter(DiscoverFilter.Contributors)
            }}
          >
            Top Contributors
          </Button>
          <Button
            className={`${Filter === DiscoverFilter.Creators ? 'bg-white text-[#232227]' : 'bg-[#232227] text-[#999999]'} rounded-full px-5 py-[10px] h-fit text-xs`}
            onClick={() => {
              setFilter(DiscoverFilter.Creators)
            }}
          >
            Top Creators
          </Button>
          <Button
            className={`${Filter === DiscoverFilter.NftHolders ? 'bg-white text-[#232227]' : 'bg-[#232227] text-[#999999]'} rounded-full px-5 py-[10px] h-fit text-xs`}
            onClick={() => {
              setFilter(DiscoverFilter.NftHolders)
            }}
          >
            Top NFT Holders
          </Button>
          <Button
            className={`${Filter === DiscoverFilter.BlueChipHolders ? 'bg-white text-[#232227]' : 'bg-[#232227] text-[#999999]'} rounded-full px-5 py-[10px] h-fit text-xs`}
            onClick={() => {
              setFilter(DiscoverFilter.BlueChipHolders)
            }}
          >
            Blue Chip Holders
          </Button>
          <Button
            className={`${Filter === DiscoverFilter.FounderHolders ? 'bg-white text-[#232227]' : 'bg-[#232227] text-[#999999]'} rounded-full px-5 py-[10px] h-fit text-xs`}
            onClick={() => {
              setFilter(DiscoverFilter.FounderHolders)
            }}
          >
            Founders NFT Holders
          </Button>
          <Button
            className={`${Filter === DiscoverFilter.HighestNetWorth ? 'bg-white text-[#232227]' : 'bg-[#232227] text-[#999999]'} rounded-full px-5 py-[10px] h-fit text-xs`}
            onClick={() => {
              setFilter(DiscoverFilter.HighestNetWorth)
            }}
          >
            Highest Net Worth
          </Button>
        </div>
        <div id="top-3 section" className="w-full flex flex-col gap-10">
          <div
            id="no-1-user"
            className="rounded-lg h-[360px] bg-cover flex flex-col justify-end center items-center"
            style={{
              backgroundImage: `url(/assets/images/${filteredData[0].displayImg})`,
            }}
          >
            <div className="flex w-[90%] text-white py-5 px-4 bg-[#1A1A1A] rounded-[18px] mb-10 items-center justify-between border border-[#FFFFFF4D]">
              <div className="flex items-center gap-2">
                <span className="font-semibold">1</span>
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-white">
                  <img
                    src={`/assets/images/${filteredData[0].displayImg}`}
                    width={50}
                    height={50}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <p className="2xl:text-xl text-sm font-semibold">
                    {filteredData[0].displayName}
                  </p>
                  <p className="flex gap-1 text-xs items-center text-[#E6E6E6]">
                    <span>@{filteredData[0].userName} </span>
                    <VerifyIcon />
                  </p>
                </div>
              </div>
              <div className="bg-white text-[#0B0A10] px-[10px] text-[9px] py-[6px] rounded-3xl">
                {filteredData[0].collectorAmount > 1000
                  ? (filteredData[0].collectorAmount / 1000).toFixed(1) + 'k'
                  : filteredData[0].collectorAmount}{' '}
                Collectors
              </div>
            </div>
          </div>{' '}
          <div
            id="runner-up"
            className="lg:flex-row flex flex-col gap-2 justify-between"
          >
            <div
              id="2"
              className="rounded-lg lg:w-[49%] min-h-[360px] bg-cover flex flex-col justify-end center items-center"
              style={{
                backgroundImage: `url(/assets/images/${filteredData[1].displayImg})`,
              }}
            >
              <div className="flex w-[90%] h-[90px] text-white py-5 px-4 bg-[#1A1A1A] rounded-[18px] mb-10 items-center justify-between border border-[#FFFFFF4D]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">2</span>
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-white">
                    <img
                      src={`/assets/images/${filteredData[1].displayImg}`}
                      width={50}
                      height={50}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <p className="2xl:text-xl text-sm font-semibold">
                      {filteredData[1].displayName}
                    </p>
                    <p className="flex gap-1 text-xs items-center">
                      <span>@{filteredData[1].userName} </span>
                      <VerifyIcon />
                    </p>
                  </div>
                </div>
                <div className="bg-white text-[#0B0A10] text-[9px] px-[10px] py-[6px] rounded-3xl">
                  {filteredData[1].collectorAmount > 1000
                    ? (filteredData[1].collectorAmount / 1000).toFixed(1) + 'k'
                    : filteredData[1].collectorAmount}{' '}
                  Collectors
                </div>
              </div>
            </div>
            <div
              id="3"
              className="rounded-lg lg:w-[49%] min-h-[360px] bg-cover flex flex-col justify-end center items-center"
              style={{
                backgroundImage: `url(/assets/images/${filteredData[2].displayImg})`,
              }}
            >
              <div className="flex w-[90%] h-[90px] text-white py-5 px-4 bg-[#1A1A1A] rounded-[18px] mb-10 items-center justify-between border border-[#FFFFFF4D]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">3</span>
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-white">
                    <img
                      src={`/assets/images/${filteredData[2].displayImg}`}
                      width={50}
                      height={50}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <p className="2xl:text-xl text-sm font-semibold">
                      {filteredData[2].displayName}
                    </p>
                    <p className="flex gap-1 text-xs items-center">
                      <span>@{filteredData[2].userName} </span>
                      <VerifyIcon />
                    </p>
                  </div>
                </div>
                <div className="bg-white text-[#0B0A10] text-[9px] px-[10px] py-[6px] rounded-3xl">
                  {filteredData[2].collectorAmount > 1000
                    ? (filteredData[2].collectorAmount / 1000).toFixed(1) + 'k'
                    : filteredData[2].collectorAmount}{' '}
                  Collectors
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="top-4-10 section" className="flex flex-col gap-5 w-full">
          {filteredData.slice(3).map((user, index) => (
            <div key={index} className="w-full">
              <div className="flex  h-[90px] text-white pl-4 pr-4 bg-[#18181C] rounded-[20px] items-center justify-between border border-[#35353880]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{index + 4}</span>
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-white">
                    <img
                      src={`/assets/images/${user.displayImg}`}
                      width={50}
                      height={50}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <p className="2xl:text-xl text-sm font-semibold">
                      {user.displayName}
                    </p>
                    <p className="flex gap-2 text-xs items-center">
                      <span>@{user.userName} </span>
                      <VerifyIcon />
                    </p>
                  </div>
                </div>
                <div className="bg-[#3C3B40] text-[#B3B3B3] px-[10px] py-[6px] text-[9px] rounded-3xl">
                  {user.collectorAmount > 1000
                    ? (user.collectorAmount / 1000).toFixed(1) + 'k'
                    : user.collectorAmount}{' '}
                  Collectors
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div></div>
    </div>
  )
}
interface DiscoverRightProps {
  filteredData: BadgedHolders[]
}

function DiscoverRight({ filteredData }: DiscoverRightProps) {
  return (
    <div className="h-[800px] overflow-scroll mt-10 p-6 mb-5 border border-[#FFFFFF14] rounded-[10px] flex flex-col gap-10 sticky top-1">
      <div className="flex items-center w-full justify-between">
        <p className="text-base font-medium text-white">MOST VIEWED</p>

        <Button className="bg-white text-[#0B0A10] font-semibold border-none outline-none px-4 py-[10px] rounded-[400px] w-fit h-fit text-xs transition-all duration-300 hover:opacity-80">
          View all
        </Button>
      </div>

      <div
        className={`flex flex-col w-full border border-[#35353880] rounded-[14px] p-6 gap-9 bg-[#18181C]`}
      >
        <div className="flex flex-col items-center justify-center relative">
          <div className="grid grid-cols-4 gap-[9px]">
            <img
              src="/assets/images/profile/bnnr1.png"
              alt="User alt picture"
              className="col-span-1 h-full rounded-[10px]"
            />

            <img
              src="/assets/images/profile/bnnr2.png"
              alt="User alt picture"
              className="col-span-2 h-full rounded-[10px]"
            />

            <img
              src="/assets/images/profile/bnnr3.png"
              alt="User alt picture"
              className="col-span-1 h-full rounded-[10px]"
            />
          </div>

          <Image
            src="/assets/images/timeline/Oval.png"
            alt="User Display Picture"
            width={50}
            height={50}
            className="absolute bottom-[-25px] border-[3px] border-[#0B0A10] rounded-full"
          />
        </div>

        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center w-full justify-between pb-6 border-b border-[#FFFFFF0D]">
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <p className="flex gap-1 items-center text-base font-semibold leading-5 text-white">
                  {filteredData[0].displayName}
                  <VerifyIcon />
                </p>
                <p className="text-xs leading-5 font-medium text-[#B3B3B3]">
                  @{filteredData[0].userName}
                </p>
              </div>
            </div>

            <Button className="bg-[#CFF073] border-none outline-none font-medium w-fit h-fit text-[#0B0A10] text-[9.6px] transition-all duration-300 hover:opacity-80">
              Follow
            </Button>
          </div>

          <p className="text-sm text-[#B3B3B3]">
            Passionate NFT holder exploring the future of digital ownership.
            Join me in discovering the limitless possibilities of the NFT
            ecosystem. #NFTCommunity
          </p>
        </div>
      </div>
      <div id="top-4-10 section" className="flex flex-col gap-4 w-full pt-4">
        {filteredData.slice(3).map((user, index) => (
          <div key={index} className="w-full">
            <div className="flex  h-[80px] text-white pl-4 pr-4 bg-[#18181C] rounded-[20px] items-center justify-between border border-[#35353880]">
              <div className="flex items-center gap-2">
                <div className="w-[30px] h-[30px] rounded-full overflow-hidden border-2 border-white">
                  <img
                    src={`/assets/images/${user.displayImg}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <p className="text-sm font-semibold">{user.displayName}</p>
                  <p className="flex gap-1 text-xs text-[#858487] items-center">
                    <span>@{user.userName} </span>
                    <VerifyIcon />
                  </p>
                </div>
              </div>
              <div className="bg-[#CFF073] text-[10px] font-medium text-black px-[10px] py-2 rounded-3xl">
                {user.collectorAmount * 1234 > 1000
                  ? ((user.collectorAmount * 1234) / 1000).toFixed(1) + 'k'
                  : user.collectorAmount}{' '}
                Views
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
