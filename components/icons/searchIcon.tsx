import { CustomIconProps } from "@/app/types";

export default function SearchIcon({fill,className }: CustomIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill? fill : 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6 ${className? className : ''}`}
    >
      <path
        d="M11.3544 21.7884C5.83848 21.7884 1.34766 17.2661 1.34766 11.7116C1.34766 6.15703 5.83848 1.63477 11.3544 1.63477C16.8703 1.63477 21.3611 6.15703 21.3611 11.7116C21.3611 17.2661 16.8703 21.7884 11.3544 21.7884ZM11.3544 3.10942C6.63902 3.10942 2.81205 6.97301 2.81205 11.7116C2.81205 16.4501 6.63902 20.3137 11.3544 20.3137C16.0697 20.3137 19.8967 16.4501 19.8967 11.7116C19.8967 6.97301 16.0697 3.10942 11.3544 3.10942Z"
        fill={fill? fill : 'currentColor'}

        fillOpacity="0.7"
      />
      <path
        d="M21.6081 22.7714C21.4226 22.7714 21.2371 22.7026 21.0907 22.5551L19.1381 20.5889C18.855 20.3038 18.855 19.8319 19.1381 19.5468C19.4212 19.2617 19.8898 19.2617 20.173 19.5468L22.1255 21.513C22.4086 21.7981 22.4086 22.27 22.1255 22.5551C21.9791 22.7026 21.7936 22.7714 21.6081 22.7714Z"
        fill={fill? fill : 'currentColor'}

        fillOpacity="0.7"
      />
    </svg>
  )
}
