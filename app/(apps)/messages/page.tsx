'use client'
import FriendList from './_components/friend-lists'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'

export default function Page() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <section className="w-full flex lg:grid grid-cols-3 bg-[#111115] other-link">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <FriendList />
        </ErrorBoundary>
      </section>
    </ErrorBoundary>
  )
}
