'use client'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import LoginForm from './client'
import AuthLayout from '../auth-layout'
import { ErrorFallback } from '@/components/error-boundary'

export default function Page() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthLayout showAuthLeftOptional={true}>
        <LoginForm />
      </AuthLayout>
    </ErrorBoundary>
  )
}
