import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { WalletAcct } from '@/models/all.model'
import { useMutation, useQuery } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import { PlusIcon } from 'lucide-react'
import { startCase } from '@/lib/helper-func'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Badge } from '@/components/ui/badge'
import CustomDialog from '@/components/customs/custom-dialog'
import LoadingOverlay from '@/components/saving-overlay'
import { toast } from 'sonner'
import { FormBase, FormFooter } from '@/components/customs/custom-form'
import { ManualWalletForm } from '@/components/manual-wallet-form'
import { useAppStore } from '@/store/use-app-store'

const formSchema = z.object({
  walletAddress: z.string().min(1, 'Wallet address is required'),
  chain: z.string().min(1, 'Chain selection is required'),
  walletTypeId: z.string().nullable(),
  metadata: z.string().nullable(),
})

export default function WalletForm() {
  const [addingWallet, setAddingWallet] = useState(false)
  const { userId } = useAppStore()

  const { data: walletsData, refetch: refetchWallets } = useQuery({
    queryKey: ['user-wallets', userId],
    queryFn: () => ovationService.getUserWallets(userId as string),
    enabled: !!userId,
  })

  const wallets = walletsData?.data?.data

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletAddress: '',
      chain: '',
      walletTypeId: null,
      metadata: null,
    },
  })

  const { mutate: addWallet, isPending: isAddingWallet } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      ovationService.addWallet(values),
    onSuccess: () => {
      toast.success('Wallet connected successfully')
      setAddingWallet(false)
      refetchWallets()
    },
  })

  const { mutate: deleteWallet, isPending: isDeletingWallet } = useMutation({
    mutationFn: (walletId: string | number) =>
      ovationService.deleteWallet(walletId),
    onSuccess: () => {
      toast.success('Wallet disconnected successfully')
      refetchWallets()
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    addWallet(values)
    form.reset()
  }

  return (
    <>
      <LoadingOverlay
        isLoading={isAddingWallet}
        loadingText="Connecting wallet..."
      />
      <LoadingOverlay
        isLoading={isDeletingWallet}
        loadingText="Disconnecting wallet..."
      />
      <div className="flex flex-col gap-[23px] w-full xl:max-w-[637px] px-4 sm:px-10 2xl:px-20">
        {wallets?.map((wallet, index) => (
          <div
            className="w-full flex items-center justify-between bg-[#18181C] p-4 px-6 py-2.5 rounded-full"
            key={index}
          >
            <div className="flex items-center gap-[7px]">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold ">
                  {wallet.walletAddress.replace(
                    /^(.{6})(.*)(.{4})$/,
                    '$1***$3',
                  )}
                </p>
                <div className="flex items-center gap-[3px] text-xs text-light">
                  <Badge>{startCase(wallet.chain)}</Badge>
                </div>
              </div>
            </div>
            <CustomDialog
              trigger={
                <Button className="text-[10px] font-medium h-fit">
                  Disconnect
                </Button>
              }
              title="Are you sure?"
              description="This action cannot be undone. This will permanently disconnect the wallet from your account."
              confirmText="Yes, disconnect"
              cancelText="No, keep it"
              onConfirm={() => deleteWallet(wallet.id as string | number)}
            />
          </div>
        ))}
        {!addingWallet ? (
          <Button
            variant="outline"
            className="w-full h-[46px] flex items-center gap-[7px] text-[13px] font-semibold  border-[#29292F] rounded-full"
            onClick={() => setAddingWallet(true)}
          >
            Add new wallet <PlusIcon size={16} />
          </Button>
        ) : (
          <FormBase form={form} onSubmit={onSubmit}>
            <ManualWalletForm form={form} />
            <FormFooter>
              <Button type="submit" className="flex-1">
                Add Wallet
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddingWallet(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </FormFooter>
          </FormBase>
        )}
      </div>
    </>
  )
}
