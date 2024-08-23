import React from 'react'
import LoginForm from './client'
import AuthLayout from '../auth-layout'
// const LoginPage = () => {
// //   return <LoginForm />
// // }

// LoginPage.getLayout = function getLayout(page: React.ReactElement) {
//   return <AuthLayout showAuthLeftOptional={true}>{page}</AuthLayout>
// }
export default function page() {
  return (
    <AuthLayout showAuthLeftOptional={true}>
      <LoginForm />
    </AuthLayout>
  )
}

// export default LoginPage
