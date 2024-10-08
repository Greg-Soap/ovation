import { Button } from '@/components/ui/button'
import CompleteIcon from '@/public/assets/images/ovationAuthCompleteIcon'

export default function SuccessMessage() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 rounded-full bg-[#333726] flex items-center justify-center">
        <CompleteIcon />
      </div>
      <div className="w-full  flex flex-col items-center justify-center">
        <h1 className="font-semibold text-3xl">Success</h1>
        <p className="text-light text-sm">
          Your password has been updated you can now login again
        </p>
      </div>
      <Button className="w-full h-[53px] font-semibold text-sm">
        <a className="w-full" href="/login">
          Back to Login
        </a>
      </Button>
    </div>
  )
}
