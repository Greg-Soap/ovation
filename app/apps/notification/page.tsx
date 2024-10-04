'use client'
import OtherLinks from '@/app/apps/_sections/_timeline/other-link'
import MainNotification from './_components/main-notification'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'

export default function Page() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <section className="w-full bg-primaryBg other-link overflow-hidden">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <MainNotification />
        </ErrorBoundary>
        {/* <ErrorBoundary FallbackComponent={ErrorFallback}>
          <OtherLinks />
        </ErrorBoundary> */}
      </section>
    </ErrorBoundary>
  )
}
