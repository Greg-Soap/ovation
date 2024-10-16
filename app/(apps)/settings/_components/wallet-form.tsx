import { useMemo, useState } from 'react'
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
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'
import Image from 'next/image'
import { useWalletConnect } from '@/app/(auth)/create-account/_components/use-wallet-connect'

const formSchema = z.object({
  walletAddress: z.string().min(1, 'Wallet address is required'),
  chain: z.string().min(1, 'Chain selection is required'),
  walletTypeId: z.string().nullable(),
  metadata: z.string().nullable(),
})

export default function WalletForm() {
  const [addingWallet, setAddingWallet] = useState(false)
  const { userId } = useAppStore()
  const [walletAutomatically, setWalletAutomatically] = useState(false)
  const [walletConnected, setWaletConnected] = useState(false)
  const [walletTypeUId, setWalletTypeUId] = useState('')

  const { account, chain, walletTypeId, connectWallet, disconnectWallet } =
    useWalletConnect((account, chain) => onWalletConnected())

  const { mutate: addWallet, isPending: isAddingWallet } = useMutation({
    mutationFn: ovationService.addWallet,
    onSuccess: async (data) => {
      toast.success('Wallet Added Successfully')
      setWalletAutomatically(false)
      setWaletConnected(false)
      refetchWallets()
    },
    onError: (error) => {
      // @ts-ignore
      toast.error(error?.response?.data?.message)
      setWalletAutomatically(false)
      setWaletConnected(false)
    },
  })

  const { data: allwallet, isLoading } = useQuery({
    queryKey: ['wallets'],
    queryFn: () => ovationService.getWallets(),
  })

  const sortedWallets = useMemo(() => {
    if (!allwallet?.data?.data) return []

    return allwallet.data.data.sort((a, b) => {
      if (a.name.toLowerCase() === 'leap wallet') return -1
      if (b.name.toLowerCase() === 'leap wallet') return 1
      return 0
    })
  }, [allwallet])

  const onWalletConnected = () => {
    setWaletConnected(true)
  }

  const onWalletDisconnected = () => {
    // form.setValue('userWallet', null)
    // handleFormSubmit(form.getValues())
  }

  const { data: walletsData, refetch: refetchWallets } = useQuery({
    queryKey: ['user-wallets', userId],
    queryFn: () => ovationService.getUserWallets(userId as string),
    enabled: !!userId,
  })

  const wallets = walletsData?.data?.data

  const addWalletForUser = () => {
    const data: any = {
      chain: chain,
      walletAddress: account,
      walletTypeId: walletTypeUId,
    }
    console.log(data)
    addWallet(data)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletAddress: '',
      chain: '',
      walletTypeId: null,
      metadata: null,
    },
  })

  const { mutate: deleteWallet, isPending: isDeletingWallet } = useMutation({
    mutationFn: (Type: string | number) => ovationService.deleteWallet(Type),
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
                  {wallet?.walletAddress?.replace(
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
              onConfirm={() => {
                deleteWallet(wallet?.id ?? '')
              }}
            />
          </div>
        ))}
        {addingWallet ? (
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
        ) : walletAutomatically === true ? (
          <div>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              {walletConnected ? (
                <div className="flex" style={{ alignItems: 'self-end' }}>
                  Connecting Account: {account?.slice(0, 10)}...
                  {account?.slice(38)}{' '}
                  <Button className="text-[10px] font-medium h-fit ml-4">
                    {chain}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="py-4 w-full">
                    <Button
                      className="text-start flex justify-center p-2 md:p-[1rem] h-[58px] w-full text-xs md:text-sm font-semibold  border-[1px] border-solid bg-transparent border-[#353538]"
                      onClick={() => {
                        setWalletTypeUId(sortedWallets[0].walletId)
                        connectWallet(sortedWallets[0].name)
                      }}
                    >
                      <p className="text-foreground mr-4">
                        {startCase(sortedWallets[0].name)}
                      </p>
                      <Image
                        src={sortedWallets[0].logoUrl}
                        alt={sortedWallets[0].name}
                        width={20}
                        height={20}
                      />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {sortedWallets?.slice(1, 9).map((wallet) => (
                      <ErrorBoundary
                        key={wallet.walletId}
                        FallbackComponent={ErrorFallback}
                      >
                        <Button
                          className="text-start flex justify-between p-2 md:p-[1rem] h-[58px] w-full text-xs md:text-sm font-semibold  border-[1px] border-solid bg-transparent border-[#353538]"
                          onClick={() => {
                            setWalletTypeUId(wallet.walletId)
                            connectWallet(wallet.name)
                          }}
                        >
                          <p className="text-foreground">
                            {startCase(wallet.name)}
                          </p>
                          <Image
                            src={wallet.logoUrl}
                            alt={wallet.name}
                            width={20}
                            height={20}
                          />
                        </Button>
                      </ErrorBoundary>
                    ))}
                  </div>
                </>
              )}
            </ErrorBoundary>
            <div className="flex mt-10">
              <div className="w-full mr-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setWaletConnected(false)
                    setWalletAutomatically(false)
                  }}
                  className="flex-1 w-full"
                >
                  Cancel
                </Button>
              </div>
              {walletConnected && (
                <div className="w-full ml-2">
                  <Button
                    className="w-full hover:scale-105 h-[40px] text-sm font-semibold"
                    variant={'default'}
                    disabled={isAddingWallet}
                    onClick={() => addWalletForUser()}
                  >
                    {isAddingWallet ? 'Adding Wallet' : 'Add Wallet'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex">
            <Button
              variant="outline"
              className="w-full mr-2 h-[46px] flex items-center gap-[7px] text-[13px] font-semibold  border-[#29292F] rounded-full"
              onClick={() => setWalletAutomatically(true)}
            >
              Connect Wallet Automatically <PlusIcon size={16} />
            </Button>
            <Button
              variant="outline"
              className="w-full ml-2 h-[46px] flex items-center gap-[7px] text-[13px] font-semibold  border-[#29292F] rounded-full"
              onClick={() => setAddingWallet(true)}
            >
              Add Wallet Manually <PlusIcon size={16} />
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
