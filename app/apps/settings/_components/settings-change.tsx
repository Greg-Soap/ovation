import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import DiscardChanges from './discard-changes'

export default function SettingsChange({
  position,
  isLoading,
  saveDraft,
}: {
  position?: string
  isLoading: boolean
  saveDraft?: () => void
}) {
  return (
    <div
      className={`flex gap-4 items-center bg-[#18181C] ${position ? position : 'sticky'} bottom-0 justify-end pr-4 sm:pr-10 w-full h-[103px] mt-auto`}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={'outline'}
            type="button"
            disabled={isLoading}
            className="h-[46px] font-semibold  rounded-full w-[150px] bg-[#18181C] border-[1px] border-[#353538] text-[13px]"
          >
            Discard changes
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#111115B2] w-fit h-fit overflow-auto border-none max-w-[371px]">
          <DiscardChanges saveDraft={saveDraft} />
        </DialogContent>
      </Dialog>

      <Button
        type="submit"
        disabled={isLoading}
        isLoading={isLoading}
        loadingText="Saving changes..."
        className="h-[46px] text-[13px] text-[#0B0A10] font-semibold rounded-full w-[125px]"
      >
        Save changes
      </Button>
    </div>
  )
}
