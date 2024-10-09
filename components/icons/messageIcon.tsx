import { CustomIcon } from '@/app/types'

export default function MessageIcon(props: CustomIcon) {
  return (
    <svg
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className="w-[17px] h-4"
    >
      <path
        d="M6.16536 12.6663H5.83203C3.16536 12.6663 1.83203 11.9997 1.83203 8.66634V5.33301C1.83203 2.66634 3.16536 1.33301 5.83203 1.33301H11.1654C13.832 1.33301 15.1654 2.66634 15.1654 5.33301V8.66634C15.1654 11.333 13.832 12.6663 11.1654 12.6663H10.832C10.6254 12.6663 10.4254 12.7663 10.2987 12.933L9.2987 14.2663C8.8587 14.853 8.1387 14.853 7.6987 14.2663L6.6987 12.933C6.59203 12.7863 6.34536 12.6663 6.16536 12.6663Z"
        stroke=""
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.16797 5.33301H11.8346"
        stroke=""
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.16797 8.66699H9.16797"
        stroke=""
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
