import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import DiscardChanges from '../../_sections/_settings/discard-changes'

export default function SettingsChange() {
  return (
    <div className="flex gap-4 items-center bg-[#18181C] sticky justify-end lg:pr-10 bottom-0 w-full h-[103px]">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={'outline'}
            type="button"
            className="h-[46px] font-semibold text-white rounded-full w-[150px] bg-[#18181C] border-[1px] border-[#353538] text-[13px]"
          >
            Discard changes
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#111115B2] w-fit h-fit overflow-auto border-none max-w-[371px]">
          <DiscardChanges />
        </DialogContent>
      </Dialog>

      <Button
        type="submit"
        className="h-[46px] text-[13px] text-[#0B0A10] font-semibold rounded-full w-[125px]"
      >
        Save changes
      </Button>
    </div>
  )
}
