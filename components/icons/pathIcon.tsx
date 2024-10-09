import { CustomIconProps } from '@/app/types'

export default function PathICon(props: CustomIconProps) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6 ${props.className}`}
    >
      <g clip-path="url(#clip0_4117_6856)">
        <path
          d="M4.31112 16.3593L7.77112 19.8193C10.2011 22.2493 11.0311 22.2093 13.4311 19.8193L19.0011 14.2493C20.9411 12.3093 21.4311 11.0193 19.0011 8.58928L15.5411 5.12928C12.9511 2.53928 11.8211 3.18928 9.88112 5.12928L4.31112 10.6993C1.92112 13.0993 1.72112 13.7693 4.31112 16.3593Z"
          stroke={props.strokeLine ? props.strokeLine : '#CFF073'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.741 17.5893L19.081 18.6793C18.151 20.2293 18.871 21.4993 20.681 21.4993C22.491 21.4993 23.211 20.2293 22.281 18.6793L21.621 17.5893C21.101 16.7293 20.251 16.7293 19.741 17.5893Z"
          stroke={props.strokeLine ? props.strokeLine : '#CFF073'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.54102 13.0391C8.10102 11.5291 13.961 11.4791 19.541 12.9091L20.041 13.0391"
          stroke={props.strokeLine ? props.strokeLine : '#CFF073'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4117_6856">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.541016 0.799316)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
