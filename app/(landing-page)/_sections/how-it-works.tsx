'use client'
import { useState } from 'react'
import ReactPlayer from 'react-player/lazy'
export default function HowItWorks() {
  const [playing, setPlaying] = useState(false)
  return (
    <section className="container w-[80%] h-fit p-24 rounded-[20px] bg-[#1C1D19] flex flex-col items-center justify-center my-20 video-ctn">
      <p className=" text-2xl md:text-4xl font-semibold font-heading section-header">
        How it works
      </p>

      <p className="text-base md:text-2xl w-[80%] text-center mt-2 text-lighter font-light">
        Artists, projects, and enthusiasts can effortlessly and impactfully
        showcase their NFTs, contributions, and notoriety
      </p>

      <div className="mt-8 md:mt-24 w-[90%] h-[195px] lg:w-[998px] md:h-[564px]  bg-transparent   flex items-center justify-center rounded-[20px]">
        <ReactPlayer
          url="https://res.cloudinary.com/dkv32rrmi/video/upload/v1724130500/videos/ldmoljcpmc3qkorm9hyc.mov"
          controls={true}
          height={'100%'}
          width={'100%'}
          light={true}
          playing={playing}
          onClickPreview={() => {
            setPlaying(true)
          }}
          playIcon={
            <div className=" w-[90%] h-[195px] lg:w-[998px] md:h-[564px]  bg-black   flex items-center justify-center rounded-[20px]">
              <img src="/assets/images/play.png" alt="play button" />
            </div>
          }
        />
      </div>
    </section>
  )
}
