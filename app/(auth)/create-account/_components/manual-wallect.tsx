import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ManualWalletForm } from '@/components/manual-wallet-form'
import { FormField } from '@/components/customs/custom-form'

export default function RenderWalletAndConfirmation({
  form,
  handleFormSubmit,
  isPending,
}: any) {
  useEffect(() => {
    const subscription = form.watch(
      (value: { addWalletLater?: boolean }, { name }: { name: string }) => {
        if (name === 'addWalletLater' && value.addWalletLater) {
          form.setValue('userWallet', null)
        }
      },
    )
    return () => subscription.unsubscribe()
  }, [form])

  return (
    <form
      onSubmit={form.handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-7"
    >
      <FormField form={form} name="addWalletLater" label="Add wallet later">
        {(field) => (
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        )}
      </FormField>

      {!form.watch('addWalletLater') && (
        <ManualWalletForm form={form} name="userWallet" />
      )}

      <Button
        type="submit"
        className="w-full text-sm font-semibold h-[53px]"
        disabled={isPending}
        isLoading={isPending}
        loadingText="Creating profile..."
      >
        Make my profile
      </Button>

      <p className="text-center mb-4 text-light">
        By clicking &quot;make my profile&quot; you agree to our privacy terms,
        code of conduct and Conditions.
      </p>
    </form>
  )
}
