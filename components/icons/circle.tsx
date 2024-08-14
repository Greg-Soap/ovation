import { CustomIcon } from '@/app/types'

export default function Circle(props: CustomIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="50px"
      height="50px"
      fill="none"
      stroke="#CFF073"
      strokeWidth={3}
      {...props}
      strokeDasharray={200}
    >
      <circle cx="25" cy="25" r="19" strokeLinecap="round" fill="" />
    </svg>
  )
}
