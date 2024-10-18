'use client'
import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import PopUp from './popup'

const search = () => {
  // const [popup, setPopUp] = useState(false)

  return (
    <>
      <div
        className="mb-[26px] relative"
        style={{ marginLeft: '26px', marginRight: '26px' }}
      >
        <SearchIcon
          size={20}
          color="#B3B3B3"
          className="absolute top-1/2 left-[40px] md:left-4 transform -translate-y-1/2 z-50"
        />
        <input
          type="text"
          className="w-full border-[410.49px] pr-[47px] border-0 bg-transparent placeholder:text-[13px] placeholder:text-[#4D4D4D]"
          placeholder="Search messages"
          style={{
            border: '0.82px solid var(--white-15, #29292F',
            height: '44px',
            borderRadius: '410px',
            paddingLeft: '47px',
            fontSize: '13px',
          }}
        />
      </div>
      {true && <PopUp />}
    </>
  )
}

export default search
