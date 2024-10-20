'use client'
import { ErrorFallback } from '@/components/error-boundary'
import AuthLayout from '../auth-layout'
import VerifyAccountPage from './client'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import MiniLoader from '@/components/mini-loader'

export default function page() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<MiniLoader />}>
        <AuthLayout>
          <section className="flex flex-col gap-11">
            <VerifyAccountPage />
          </section>
        </AuthLayout>
      </Suspense>
    </ErrorBoundary>
  )
}
