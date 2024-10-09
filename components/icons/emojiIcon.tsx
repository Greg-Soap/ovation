import { CustomIcon } from '@/app/types'
import * as React from 'react'

const EmojiIcon = (props: CustomIcon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#E7F8B9"
      d="M12 0c6.628 0 12 5.372 12 12s-5.372 12-12 12S0 18.628 0 12 5.372 0 12 0Zm0 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 0 0 0-19.2Zm3.36 11.828a1.201 1.201 0 1 1 1.68 1.714A7.181 7.181 0 0 1 12 18a7.18 7.18 0 0 1-5.04-2.058 1.2 1.2 0 0 1 1.68-1.714A4.78 4.78 0 0 0 12 15.6a4.784 4.784 0 0 0 3.36-1.372ZM7.8 7.2a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Zm8.4 0a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Z"
    />
  </svg>
)
export default EmojiIcon
