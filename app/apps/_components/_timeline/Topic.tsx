interface Topic {
  text: string
  imgSrc: string
  ovaBalance: number
  comments: number
}

const topics: Topic[] = [
  {
    text: 'Nigeria in Turmoil: Tinubu Faces Backlash Over Economic Woes',
    imgSrc: '/assets/images/timeline/_other-section/topic-oval.png',
    ovaBalance: 35,
    comments: 64,
  },
  {
    text: 'Nigeria in Turmoil: Tinubu Faces Backlash Over Economic Woes',
    imgSrc: '/assets/images/timeline/_other-section/topic-oval.png',
    ovaBalance: 35,
    comments: 64,
  },
  {
    text: 'Nigeria in Turmoil: Tinubu Faces Backlash Over Economic Woes',
    imgSrc: '/assets/images/timeline/_other-section/topic-oval.png',
    ovaBalance: 35,
    comments: 64,
  },
  {
    text: 'Nigeria in Turmoil: Tinubu Faces Backlash Over Economic Woes',
    imgSrc: '/assets/images/timeline/_other-section/topic-oval.png',
    ovaBalance: 35,
    comments: 64,
  },
  {
    text: 'Nigeria in Turmoil: Tinubu Faces Backlash Over Economic Woes',
    imgSrc: '/assets/images/timeline/_other-section/topic-oval.png',
    ovaBalance: 35,
    comments: 64,
  },
]

export default function Topics() {
  return (
    <div className="flex flex-col w-full border border-[#FFFFFF14] rounded-[14px] p-6 gap-6">
      <p className="text-base font-medium ">Topics</p>

      <div className="flex flex-col gap-4 w-full">
        {topics.map((topic, index) => (
          <div
            className="flex hover:scale-105 transition-all flex-col w-full gap-[10px] p-4 bg-[#18181C] border border-[#35353880] rounded-[17px]"
            key={index}
          >
            <p className="font-semibold text-[#E6E6E6] leading-5">
              {topic.text}
            </p>

            <div className="flex items-center gap-1">
              <img
                src={topic.imgSrc}
                alt="user Display Picture"
                className="w-[17px] h-[17px] rounded-full"
              />
              <p className="text-sm text-[#858487]">
                {topic.ovaBalance +
                  ' ' +
                  'OVA' +
                  ' ' +
                  topic.comments +
                  ' ' +
                  'comments'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
