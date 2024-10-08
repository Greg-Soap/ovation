import { Button } from '@/components/ui/button'
import { ManualWalletForm } from '@/components/manual-wallet-form'

export default function RenderWalletAndConfirmation({
  form,
  handleFormSubmit,
  isPending,
}: any) {
  return (
    <form
      onSubmit={form.handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-7"
    >
      <ManualWalletForm form={form} name="userWallet" />

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
