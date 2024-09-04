import Editicon from '@/components/icons/edit-icon'
import PlusIcon from '@/components/icons/plus-icon'

export default function Experience({ data }: { data: ExperienceData }) {
  return (
    <div className="w-[95%] ml-[2.5%] flex items-center justify-center rounded-[14px] flex-col gap-[34px] mt-[34px]">
      <div className="flex items-center justify-between w-full">
        <p className="text-[#F8F8FF] text-sm font-medium">Experience</p>

        <div className="flex items-center gap-3">
          <PlusIcon className="w-[14px] h-[14px] stroke-[#CFF073]" />
          <Editicon className="w-3 h-[13px] fill-[#CFF073]" />
        </div>
      </div>

      {data.map((item: Experience, index: number) => (
        <div className="flex gap-4 w-full" key={index}>
          <img
            src={item.companyLogo}
            alt={item.company + ' ' + 'logo'}
            className="w-[43px] h-[43px]"
          />

          <div className="flex flex-col gap-[13px]">
            <div className="flex flex-col gap-[3px]">
              <p className="text-[#F8F8FF] text-lg font-semibold">
                {item.position}
              </p>
              <p className="text-[#CCCCCC]">{item.company}</p>
              <p className="text-[#808080]">
                {item.startDate + ' - ' + item.endDate}
              </p>
            </div>

            <div className="flex flex-col gap-[13px]">
              <p className="text-sm text-[#B3B3B3]">{item.details}</p>
              <p className="text-sm text-[#B3B3B3]">{item.extendedDetails}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

interface Experience {
  position: string
  companyLogo: string
  company: string
  startDate: string
  endDate: string
  details: string
  extendedDetails: string
}

type ExperienceData = Experience[]
