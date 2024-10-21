import MiniLoader from '@/components/mini-loader'
import { Suspense } from 'react'
import LayoutContent from './app-layout'

export default function AsideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<MiniLoader size="huge" />}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  )
}
