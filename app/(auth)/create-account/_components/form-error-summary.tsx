import { AlertCircle } from 'lucide-react'

function startCase(str: string): string {
  return str
    .split('.')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function FormErrorSummary({ form }: { form: any }) {
  const errorCount = Object.keys(form.formState.errors).length
  if (errorCount === 0) return null

  function getNestedErrors(errors: any, prefix = ''): Array<[string, string]> {
    return Object.entries(errors).flatMap(([key, value]) => {
      if (value && typeof value === 'object' && 'message' in value) {
        return [[`${prefix}${key}`, value.message as string]]
      }
      if (value && typeof value === 'object') {
        return getNestedErrors(value, `${prefix}${key}.`)
      }
      return []
    })
  }

  const allErrors = getNestedErrors(form.formState.errors)

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      <div className="flex items-center">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span className="font-bold">
          {errorCount} error{errorCount > 1 ? 's' : ''} in the form
        </span>
      </div>
      <ul className="list-disc list-inside mt-2">
        {allErrors.map(([field, message]) => (
          <li key={field}>
            {startCase(field)}: {message}
          </li>
        ))}
      </ul>
    </div>
  )
}
