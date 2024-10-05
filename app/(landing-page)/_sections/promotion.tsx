import colors from '@/lib/colors'
import { ArrowRightIcon } from '@/public/assets/images/arrow-right'
import { XIcon } from 'lucide-react'
import React, { useState } from 'react'

export default function Promotion() {
  const [isHidden, setIsHidden] = useState(false)
  return (
    <section
      className={`w-full py-[36px] bg-primary items-center justify-center gap-4 promotion relative ${isHidden ? 'hidden' : 'flex'}`}
    >
      <a href="/news/1">
        <p className="text-2xl text-primary-foreground font-semibold">
          Ovation Secures Archway Foundation grant
        </p>
      </a>
      <ArrowRightIcon />
      <XIcon
        onClick={() => setIsHidden(true)}
        className="cursor-pointer"
        color={colors.primary.foreground}
      />
    </section>
  )
}
