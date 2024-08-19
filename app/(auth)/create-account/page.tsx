'use client'
import { useState } from 'react'
import AuthLayout from '../auth-layout'
import AccountForm from './client'

export default function CreateAccountPage() {
  const [showLeft, setShowLeft] = useState<boolean>(false)
  return (
    <AuthLayout showAuthLeftOptional={showLeft}>
      <AccountForm setOptionalLeft={setShowLeft} />
    </AuthLayout>
  )
}
