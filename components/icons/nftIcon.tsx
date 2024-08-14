import { CustomIcon } from '@/app/types'
import * as React from 'react'
const SvgComponent = (props: CustomIcon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 15 16"
    {...props}
  >
    <path d="M14.165 9.335H8.832v5.333h5.333V9.335Zm-10.333-8 3 5.333h-6l3-5.333Zm7.667 5.333a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333ZM.832 9.334l5.333 5.333m0-5.333L.832 14.667" />
  </svg>
)
export default SvgComponent
