'use client'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import LoginForm from './client'
import AuthLayout from '../auth-layout'
import { ErrorFallback } from '@/components/error-boundary'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = process.env.GOOGLE_CLIENT_ID as string

export default function Page() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AuthLayout showAuthLeftOptional={true}>
          <LoginForm />
        </AuthLayout>
      </ErrorBoundary>
    </GoogleOAuthProvider>
  )
}
