import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function DiscardChanges({
  saveDraft,
}: {
  saveDraft?: () => void
}) {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center bg-[#232227] gap-9 p-9 rounded-[24px]">
      <div className="flex flex-col items-center gap-[33px]">
        <div className="flex items-center bg-[#333726] rounded-full p-2">
          <Image
            src="/assets/images/settings/save-01.png"
            alt="Save"
            width={27}
            height={27}
          />
        </div>

        <div className="flex flex-col items-center gap-2.5 text-center">
          <h2 className=" font-semibold">Unsaved changes</h2>
          <p className="text-light text-xs max-w-[300px]">
            If you choose to cancel without saving, your changes will not be
            retained. Make sure to save any changes before exiting the window.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="text-xs  font-semibold py-2 w-full border-[#29292F] rounded-full bg-transparent hover:bg-[#29292F] hover:text-foreground transition-colors"
        >
          Yes, don&apos;t save my changes
        </Button>
        <Button
          onClick={saveDraft}
          variant="default"
          className="text-xs text-[#0B0A10] font-semibold py-2 w-full rounded-full hover:opacity-90 transition-opacity"
        >
          No, I want to save my changes
        </Button>
      </div>
    </div>
  )
}
