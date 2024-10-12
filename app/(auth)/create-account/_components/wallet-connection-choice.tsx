import { Button } from '@/components/ui/button'
import CustomDialog from '@/components/customs/custom-dialog'

interface WalletConnectionChoiceProps {
  onConnectWallet: () => void
  onSkipWallet: () => void
}

export default function WalletConnectionChoice({
  onConnectWallet,
  onSkipWallet,
}: WalletConnectionChoiceProps) {
  const dialogDescription = `
    You can always connect your wallet later in the settings page. Are you sure you want to skip this step?

    By clicking "make my profile" you agree to our privacy terms, code of conduct and Conditions.
  `

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Connect Your Wallet</h2>
      <p className="text-light">
        Connecting your wallet now enhances your experience, but you can always
        do it later if you prefer.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onConnectWallet} className="flex-1">
          Connect Wallet
        </Button>
        <CustomDialog
          trigger={
            <Button variant="outline" className="flex-1">
              I&apos;ll do it later
            </Button>
          }
          title="Skip Wallet Connection?"
          description={dialogDescription}
          confirmText="Yes, make my profile"
          cancelText="No, go back"
          onConfirm={onSkipWallet}
          actionVariant="default"
        />
      </div>
    </div>
  )
}
