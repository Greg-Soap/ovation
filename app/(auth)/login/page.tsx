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
const clientId = process.env.GOOGLE_CLIENT_ID as string;

export default function Page() {
  return (
    <GoogleOAuthProvider clientId='200915400648-d5tpcs81rgjoqgac6idku39bi1dd5ga6.apps.googleusercontent.com'>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AuthLayout showAuthLeftOptional={true}>
          <LoginForm />
        </AuthLayout>
      </ErrorBoundary>
    </GoogleOAuthProvider>
  )
}
