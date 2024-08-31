'use client'
import React from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import LoginForm from './client'
import AuthLayout from '../auth-layout'
import { GoogleOAuthProvider } from "@react-oauth/google"

function ErrorFallback({ error }: FallbackProps) {
  return (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  )
}
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

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
