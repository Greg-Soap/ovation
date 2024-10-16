import { CustomIconProps } from '@/app/types'

export default function SendIcon(props: CustomIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6 ${props.className}`}
    >
      <path
        d="M9.51124 4.22867L18.0712 8.50867C21.9112 10.4287 21.9112 13.5687 18.0712 15.4887L9.51124 19.7687C3.75124 22.6487 1.40124 20.2887 4.28124 14.5387L5.15124 12.8087C5.37124 12.3687 5.37124 11.6387 5.15124 11.1987L4.28124 9.45867C1.40124 3.70867 3.76124 1.34867 9.51124 4.22867Z"
        stroke="#E7F8B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.44141 12H10.8414"
        stroke="#E7F8B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
