'use client'
import { ErrorFallback } from '@/components/error-boundary'
import AuthLayout from '../auth-layout'
import VerifyAccountPage from './client'
import { ErrorBoundary } from 'react-error-boundary'

export default function page() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthLayout>
        <section className="flex flex-col gap-11">
          <VerifyAccountPage />
        </section>
      </AuthLayout>
    </ErrorBoundary>
  )
}
