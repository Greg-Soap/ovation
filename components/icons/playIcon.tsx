import { CustomIcon } from '@/app/types'

export default function PlayIcon(props: CustomIcon) {
  return (
    <svg
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[21px] h-[21px]"
      {...props}
    >
      <path
        d="M10.4688 0C4.94875 0 0.46875 4.48 0.46875 10C0.46875 15.52 4.94875 20 10.4688 20C15.9888 20 20.4688 15.52 20.4688 10C20.4688 4.48 15.9988 0 10.4688 0ZM13.4688 12.23L10.5687 13.9C10.2087 14.11 9.80875 14.21 9.41875 14.21C9.01875 14.21 8.62875 14.11 8.26875 13.9C7.54875 13.48 7.11875 12.74 7.11875 11.9V8.55C7.11875 7.72 7.54875 6.97 8.26875 6.55C8.98875 6.13 9.84875 6.13 10.5787 6.55L13.4787 8.22C14.1987 8.64 14.6287 9.38 14.6287 10.22C14.6287 11.06 14.1987 11.81 13.4688 12.23Z"
        fill="white"
      />
    </svg>
  )
}
