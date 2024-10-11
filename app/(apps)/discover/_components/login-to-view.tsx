import { Button } from '@/components/ui/button'

export function LoginToView() {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] text-center">
      <p className="text-lg font-semibold  mb-2">Login to view rankings</p>
      <p className="text-sm text-light">Please login to view the rankings</p>
      <Button asChild className="mt-4">
        <a href="/login">Login</a>
      </Button>
    </div>
  )
}
