'use client'
import React from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import LoginForm from './client'
import AuthLayout from '../auth-layout'

function ErrorFallback({ error }: FallbackProps) {
  return (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  )
}

export default function Page() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthLayout showAuthLeftOptional={true}>
        <LoginForm />
      </AuthLayout>
    </ErrorBoundary>
  )
}
