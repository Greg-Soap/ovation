import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function DiscardChanges() {
  return (
    <div className="flex flex-col items-center bg-[#232227] gap-9 p-9 rounded-[24px]">
      <div className="flex flex-col items-center gap-[33px]">
        <div className="flex items-center bg-[#333726] rounded-[31px] p-2 w-fit">
          <Image
            src={`/assets/images/settings/save-01.png`}
            alt="Save"
            width={27}
            height={27}
          />
        </div>

        <div className="flex flex-col items-center gap-2.5">
          <p className="text-[#F8F8FF] font-semibold">Unsaved changes</p>
          <p className="text-[#B3B3B3] text-xs text-center">
            If you choose to cancel without saving, your changes will not be
            retained. Make sure to save any changes before exiting the window
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-[7px] w-full">
        <Button
          variant={`outline`}
          className="text-xs text-[#F8F8FF] font-semibold py-2 w-full h-fit border-[#29292F] rounded-[41px] bg-transparent"
        >
          Yes, don't save my changes
        </Button>
        <Button
          variant={`default`}
          className="text-xs text-[#0B0A10] font-semibold py-2 w-full h-fit"
        >
          No, I want to save my changes
        </Button>
      </div>
    </div>
  )
}
