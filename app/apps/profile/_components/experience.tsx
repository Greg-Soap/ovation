import PlusIcon from '@/components/icons/plus-icon'
import { Button } from '@/components/ui/button'
import type { UserExperience } from '@/models/all.model'
import { Briefcase } from 'iconsax-react'
import { useRouter } from 'next/navigation'

export default function Experience({ data }: { data: UserExperience[] }) {
  const router = useRouter()
  return (
    <div className='w-[95%] ml-[2.5%] flex items-center justify-center rounded-[14px] flex-col gap-[34px] mt-[34px]'>
      <div className='flex items-center justify-between w-full'>
        <p className='text-[#F8F8FF] text-sm font-medium uppercase'>Experience</p>

        <div className='flex items-center gap-3'>
          <Button variant='ghost' onClick={() => router.push('/apps/settings?tab=Experience')}>
            <PlusIcon className='w-[14px] h-[14px] stroke-[#CFF073]' />
          </Button>
        </div>
      </div>

      {data.map((experienceItem: UserExperience) => (
        <div className='flex gap-4 w-full' key={experienceItem?.id}>
          {' '}
          <Briefcase className='w-[43px] h-[43px] stroke-[#CFF073]' />
          <div className='flex flex-col gap-[13px]'>
            <div className='flex flex-col gap-[3px]'>
              <p className='text-[#F8F8FF] text-lg font-semibold'>{experienceItem?.role}</p>
              <p className='text-[#CCCCCC]'>{experienceItem?.company}</p>
              <p className='text-[#808080]'>{`${experienceItem?.startDate} - ${experienceItem?.endDate || 'Present'}`}</p>{' '}
            </div>

            <div className='flex flex-col gap-[13px]'>
              <p className='text-sm text-[#B3B3B3]'>{experienceItem?.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
