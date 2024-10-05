import type React from 'react'
import { Suspense, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import arrow from '@/public/assets/images/arrow-right.png'
import { Button } from '@/components/ui/button'
import { startCase } from '@/lib/helper-func'
import ovationService from '@/services/ovation.service'
import { useQuery } from '@tanstack/react-query'
import Spinner from '@/components/ui/spinner'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'
import colors from '@/lib/colors'
import { useWalletConnect } from './use-wallet-connect'

interface WalletConnectComponentProps {
  onWalletConnected?: (account: string) => void
  onWalletDisconnected?: () => void
  setIsManualWallet?: (isManualWallet: boolean) => void
}

const WalletConnectComponent: React.FC<WalletConnectComponentProps> = ({
  onWalletConnected,
  onWalletDisconnected,
  setIsManualWallet,
}) => {
  const { account, connectWallet, disconnectWallet } = useWalletConnect(
    onWalletConnected,
    onWalletDisconnected,
  )

  const { data: wallets, isLoading } = useQuery({
    queryKey: ['wallets'],
    queryFn: () => ovationService.getWallets(),
  })

  const sortedWallets = useMemo(() => {
    if (!wallets?.data?.data) return []

    return wallets.data.data.sort((a, b) => {
      if (a.name.toLowerCase() === 'leap wallet') return -1
      if (b.name.toLowerCase() === 'leap wallet') return 1
      return 0
    })
  }, [wallets])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Spinner />}>
        <div>
          {!account ? (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <div className="flex flex-col gap-7">
                {isLoading ? (
                  <div className="flex justify-center items-center w-full">
                    <Spinner size="huge" color={colors.primary.DEFAULT} />
                  </div>
                ) : (
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <div className="grid grid-cols-2 gap-4">
                      {sortedWallets?.map((wallet) => (
                        <ErrorBoundary
                          key={wallet.walletId}
                          FallbackComponent={ErrorFallback}
                        >
                          <Button
                            className="text-start flex justify-between p-2 md:p-[1rem] h-[58px] w-full md:w-[242px] text-xs md:text-sm font-semibold  border-[1px] border-solid bg-transparent border-[#353538]"
                            onClick={() => connectWallet(wallet.name)}
                          >
                            <p>{startCase(wallet.name)}</p>
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
                  </ErrorBoundary>
                )}

                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <div className="flex gap-2 items-center justify-center">
                    <p>Wallet not listed?</p> {''}
                    <Link
                      href=""
                      className="h-6 text-primary"
                      onClick={() => setIsManualWallet?.(true)}
                    >
                      Connect manually
                    </Link>
                    <Image src={arrow} alt="arrow" />
                  </div>
                </ErrorBoundary>
              </div>
            </ErrorBoundary>
          ) : (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <div>
                <p>Connected Account: {account}</p>
                <button type="button" onClick={disconnectWallet}>
                  Disconnect Wallet
                </button>
              </div>
            </ErrorBoundary>
          )}
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default WalletConnectComponent
