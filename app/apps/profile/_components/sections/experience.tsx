import PlusIcon from '@/components/icons/plus-icon'
import { Button } from '@/components/ui/button'
import { useAnchorNavigation } from '@/lib/use-navigation'
import type { UserExperience } from '@/models/all.model'
import { Briefcase } from 'iconsax-react'

export default function Experience({ data }: { data: UserExperience[] }) {
  const navigateTo = useAnchorNavigation()

  return (
    <div className="w-[95%] ml-[2.5%] flex items-center justify-center rounded-[14px] flex-col gap-[34px] mt-[34px]">
      <div className="flex items-center justify-between w-full">
        <p className=" text-sm font-medium uppercase">Experience</p>

        {data.length === 0 && (
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="hover:bg-transparent"
              onClick={() => navigateTo('/apps/settings?tab=Experience')}
            >
              <PlusIcon className="w-[14px] h-[14px] stroke-[#CFF073]" />
            </Button>
          </div>
        )}
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-8">
          <Briefcase className="w-[60px] h-[60px] stroke-[#808080] mb-4" />
          <p className="text-light text-lg font-medium">
            No experience added yet
          </p>
          <p className="text-lighter text-sm mt-2">
            Click the plus icon to add your work experience
          </p>
        </div>
      ) : (
        data.map((experienceItem: UserExperience) => (
          <div className="flex gap-4 w-full" key={experienceItem?.id}>
            <Briefcase className="w-[43px] h-[43px] stroke-[#CFF073]" />
            <div className="flex flex-col gap-[13px]">
              <div className="flex flex-col gap-[3px]">
                <p className=" text-lg font-semibold">{experienceItem?.role}</p>
                <p className="text-gray">{experienceItem?.company}</p>
                <p className="text-lighter">{`${experienceItem?.startDate} - ${experienceItem?.endDate || 'Present'}`}</p>{' '}
              </div>

              <div className="flex flex-col gap-[13px]">
                <p className="text-sm text-light">
                  {experienceItem?.description}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
