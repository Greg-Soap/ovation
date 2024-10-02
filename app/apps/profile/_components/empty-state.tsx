import { Button } from '@/components/ui/button'

interface EmptyState {
  username: string
  type: string
  name: string
}

export default function ExternalEmptyState({
  username,
  type,
  name,
}: EmptyState) {
  return (
    <div className="flex flex-col items-center mt-5 w-[95%] h-fit border border-white15 rounded-[14px] px-5 pt-[15px] pb-10 gap-[30px]">
      <p className="text-sm text-white100 font-medium w-full">{name}</p>

      <div className="flex flex-col items-center max-w-[274px] gap-[23px]">
        <div className="flex flex-col gap-1 items-center">
          <p className="text-lg text-white90 font-medium text-center">
            Nothing here yet
          </p>
          <p className="text-xs text-white70 text-center">
            {username} has no {type} yet, send a reminder to them by clicking
            the button below
          </p>
        </div>

        <Button className="text-xs font-semibold text-primaryBg">
          Send a reminder
        </Button>
      </div>
    </div>
  )
}
