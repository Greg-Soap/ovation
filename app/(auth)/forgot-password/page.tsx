import AuthLayout from '../auth-layout'
import ResetForm from './client'

export default function page() {
  return (
    <AuthLayout>
      <section className="flex flex-col gap-11">
        <ResetForm />
      </section>
    </AuthLayout>
  )
}
