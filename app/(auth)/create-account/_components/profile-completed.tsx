import { CheckCircle } from 'lucide-react'

function ProfileCompleted({ email }: { email: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto py-12 gap-6">
      <CheckCircle className="w-16 h-16 text-primary" />
      <h1 className="text-2xl font-semibold text-center">
        Profile Created Successfully!
      </h1>
      <p className="text-center text-light">
        Congratulations! Your profile has been created. Please check your email
        ({email}) for a verification link to complete the process.
      </p>
    </div>
  )
}

export default ProfileCompleted
