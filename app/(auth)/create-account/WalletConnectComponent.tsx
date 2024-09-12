import type React from 'react'
import { useState, useEffect } from 'react'
// import Web3 from 'web3';
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { BrowserProvider } from 'ethers'
import walletData from './_data'
import Image from 'next/image'
import Link from 'next/link'
import arrow from '@/public/assets/images/arrow-right.png'
import { Button } from '@/components/ui/button'
import { chainIdToChainName } from '@/lib/helper-func'
import { toast } from 'sonner'
import ovationService from '@/services/ovation.service'
import { useQuery } from '@tanstack/react-query'
import { OfflineSigner, DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { StargateClient } from '@cosmjs/stargate';

interface WalletConnectComponentProps {
  onWalletConnected?: (account: string) => void
  onWalletDisconnected?: () => void
  setIsManualWallet?: (isManualWallet: boolean) => void
}

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string

const WalletConnectComponent: React.FC<WalletConnectComponentProps> = ({
  onWalletConnected,
  onWalletDisconnected,
  setIsManualWallet,
}) => {
  const [provider, setProvider] = useState<any>(null)
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [chain, setChain] = useState<string | null>(null)

  useEffect(() => {
    const web3ModalInstance = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: { infuraId },
          },
        },
      },
    })

    setWeb3Modal(web3ModalInstance)
  }, [])

  const connectMetaMask = async () => {
    if ((window as any).ethereum) {
      const provider = new BrowserProvider(window.ethereum)
      try {
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()

        const network = await provider.getNetwork()
        setChain(chainIdToChainName[Number(network.chainId)])

        const account = signer.address
        setProvider(provider)
        setAccount(account)
        if (onWalletConnected) onWalletConnected(account)
        console.log('Connected with MetaMask:', account)
      } catch (error) {
        console.error('MetaMask connection failed:', error)
      }
    } else {
      toast.error('Please install MetaMask!')
    }
  }

  const connectWalletConnect = async () => {
    if (!web3Modal) return

    try {
      const instance = await web3Modal.connectTo('walletconnect') // Direct connection to WalletConnect
      const provider = new BrowserProvider(instance)
      const signer = await provider.getSigner()

      const network = await provider.getNetwork()
      setChain(chainIdToChainName[Number(network.chainId)])

      const account = signer.address
      setProvider(provider)
      setAccount(account)
      if (onWalletConnected) onWalletConnected(account)
      console.log('Connected with WalletConnect:', account)
    } catch (error) {
      console.error('WalletConnect connection failed:', error)
    }
  }

  const connectPhantom = async () => {
    if ((window as any).solana?.isPhantom) {
      try {
        const response = await (window as any).solana.connect()
        setAccount(response.publicKey.toString())
        if (onWalletConnected) onWalletConnected(response.publicKey.toString())
        console.log('Connected with Phantom:', response.publicKey.toString())
      } catch (err) {
        console.error('Phantom connection failed:', err)
      }
    } else {
      toast.error('Please install Phantom Wallet!')
    }
  }

  const connectOKXWallet = async () => {
    if ((window as any).okexchain) {
      try {
        const provider = new BrowserProvider((window as any).okexchain)
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()

        const network = await provider.getNetwork()
        setChain(chainIdToChainName[Number(network.chainId)])

        const account = signer.address
        setProvider(provider)
        setAccount(account)
        if (onWalletConnected) onWalletConnected(account)
        console.log('Connected with OKX Wallet:', account)
      } catch (error) {
        console.error('OKX Wallet connection failed:', error)
      }
    } else {
      toast.error('Please install OKX Wallet!')
    }
  }

  const connectTrustWallet = async () => {
    if ((window as any).ethereum?.isTrust) {
      try {
        const provider = new BrowserProvider((window as any).ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()

        const network = await provider.getNetwork()
        setChain(chainIdToChainName[Number(network.chainId)])

        const account = signer.address
        setProvider(provider)
        setAccount(account)
        if (onWalletConnected) onWalletConnected(account)
        console.log('Connected with Trust Wallet:', account)
      } catch (error) {
        console.error('Trust Wallet connection failed:', error)
      }
    } else {
      toast.error('Please install Trust Wallet!')
    }
  }

  const connectBinanceChainWallet = async () => {
    if ((window as any).BinanceChain) {
      try {
        const provider = new BrowserProvider((window as any).BinanceChain)
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()

        const network = await provider.getNetwork()
        setChain(chainIdToChainName[Number(network.chainId)])

        const account = signer.address
        setProvider(provider)
        setAccount(account)
        if (onWalletConnected) onWalletConnected(account)
        console.log('Connected with Binance Chain Wallet:', account)
      } catch (error) {
        console.error('Binance Chain Wallet connection failed:', error)
      }
    } else {
      toast.error('Please install Binance Chain Wallet!')
    }
  }

  const connectCoin98Wallet = async () => {
    if ((window as any).coin98) {
      try {
        const provider = new BrowserProvider((window as any).coin98)
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()

        const network = await provider.getNetwork()
        setChain(chainIdToChainName[Number(network.chainId)])

        const account = signer.address
        setProvider(provider)
        setAccount(account)
        if (onWalletConnected) onWalletConnected(account)
        console.log('Connected with Coin98 Wallet:', account)
      } catch (error) {
        console.error('Coin98 Wallet connection failed:', error)
      }
    } else {
      toast.error('Please install Coin98 Wallet!')
    }
  }

  const connectOperaWallet = async () => {
    if ((window as any).ethereum?.isOpera) {
      try {
        const provider = new BrowserProvider((window as any).ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()

        const network = await provider.getNetwork()
        setChain(chainIdToChainName[Number(network.chainId)])

        const account = signer.address
        setProvider(provider)
        setAccount(account)
        if (onWalletConnected) onWalletConnected(account)
        console.log('Connected with Opera Wallet:', account)
      } catch (error) {
        console.error('Opera Wallet connection failed:', error)
      }
    } else {
      toast.error('Please install Opera Wallet!')
    }
  }

  const connectBraveWallet = async () => {
    if ((window as any).ethereum?.isBraveWallet) {
      try {
        const provider = new BrowserProvider((window as any).ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()

        const network = await provider.getNetwork()
        setChain(chainIdToChainName[Number(network.chainId)])

        const account = signer.address
        setProvider(provider)
        setAccount(account)
        if (onWalletConnected) onWalletConnected(account)
        console.log('Connected with Brave Wallet:', account)
      } catch (error) {
        console.error('Brave Wallet connection failed:', error)
      }
    } else {
      toast.error('Please install Brave Wallet!')
    }
  }

  const connectMathWallet = async () => {
    if ((window as any).ethereum?.isMathWallet) {
      try {
        const provider = new BrowserProvider((window as any).ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()

        const network = await provider.getNetwork()
        setChain(chainIdToChainName[Number(network.chainId)])

        const account = signer.address
        setProvider(provider)
        setAccount(account)
        if (onWalletConnected) onWalletConnected(account)
        console.log('Connected with Math Wallet:', account)
      } catch (error) {
        console.error('Math Wallet connection failed:', error)
      }
    } else {
      toast.error('Please install Math Wallet!')
    }
  }

  const connectSafePalWallet = async () => {
    if ((window as any).ethereum?.isSafePal) {
      try {
        const provider = new BrowserProvider((window as any).ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()

        const network = await provider.getNetwork()
        setChain(chainIdToChainName[Number(network.chainId)])

        const account = signer.address
        setProvider(provider)
        setAccount(account)
        if (onWalletConnected) onWalletConnected(account)
        console.log('Connected with SafePal Wallet:', account)
      } catch (error) {
        console.error('SafePal Wallet connection failed:', error)
      }
    } else {
      toast.error('Please install SafePal Wallet!')
    }
  }

  const connectTokenPocket = async () => {
    if ((window as any).ethereum?.isTokenPocket) {
      try {
        const provider = new BrowserProvider((window as any).ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()

        const network = await provider.getNetwork()
        setChain(chainIdToChainName[Number(network.chainId)])

        const account = signer.address
        setProvider(provider)
        setAccount(account)
        if (onWalletConnected) onWalletConnected(account)
        console.log('Connected with TokenPocket:', account)
      } catch (error) {
        console.error('TokenPocket connection failed:', error)
      }
    } else {
      toast.error('Please install TokenPocket!')
    }
  }

  const chainId = "cosmoshub-4";
  const connectKeplr = async (): Promise<void> => {
    if (!window.keplr) {
      alert("Please install Keplr extension");
      return;
    }

    try {
      await window.keplr.enable(chainId);

      const offlineSigner: OfflineSigner = window.getOfflineSigner(chainId);

      const accounts = await offlineSigner.getAccounts();
      const accountAddress = accounts[0].address;
      console.log("Connected account address:", accountAddress);

      // const client = await StargateClient.connect("https://rpc.cosmos.network");
      // const balance = await client.getAllBalances(accountAddress);
      // console.log("Account balances:", balance);
    } catch (error) {
      console.error("Failed to connect to Keplr:", error);
    }
  }

  const connectLeap = async (): Promise<void> => {
    if (!window.leap) {
      alert("Please install Leap Wallet extension");
      return;
    }

    try {
      const chainId = "cosmoshub-4"; // chain ID for Cosmos Hub
      await window.leap.enable(chainId);

      const offlineSigner = window.leap.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();

      const accountAddress = accounts[0].address;
      console.log("Connected account address:", accountAddress);
    } catch (error) {
      console.error("Error connecting to Leap Wallet:", error);
    }

  }

  const disconnectWallet = () => {
    if (provider?.disconnect) {
      provider.disconnect()
    }
    setProvider(null)
    setAccount(null)
    setChain(null)
    if (onWalletDisconnected) onWalletDisconnected()
    console.log('Disconnected wallet')
  }

  const connectWallet = async (walletName: string) => {
    switch (walletName.toLowerCase()) {
      case 'metamask':
        await connectMetaMask()
        break
      case 'walletconnect':
        await connectWalletConnect()
        break
      case 'phantom':
        await connectPhantom()
        break
      case 'okx wallet':
        await connectOKXWallet()
        break
      case 'trust wallet':
        await connectTrustWallet()
        break
      case 'binance chain wallet':
        await connectBinanceChainWallet()
        break
      case 'coin98 wallet':
        await connectCoin98Wallet()
        break
      case 'opera wallet':
        await connectOperaWallet()
        break
      case 'brave wallet':
        await connectBraveWallet()
        break
      case 'math wallet':
        await connectMathWallet()
        break
      case 'safepal wallet':
        await connectSafePalWallet()
        break
      case 'tokenpocket':
        await connectTokenPocket()
        break
      default:
        console.error('Unsupported wallet:', walletName)
        toast.error(`${walletName} is not supported yet.`)
    }
  }

  const { data: wallets } = useQuery({
    queryKey: ['wallets'],
    queryFn: () => ovationService.getWallets(),
  })

  return (
    <div>
      {!account ? (
        <div className='flex flex-col gap-7'>
          <div className='grid grid-cols-2 gap-4'>
            {wallets?.data?.map((wallet) => (
              <Button
                key={wallet.id}
                className='text-start flex justify-between p-2 md:p-[1rem] h-[58px] w-full md:w-[242px] text-xs md:text-sm font-semibold text-white border-[1px] border-solid bg-transparent border-[#353538]'
                onClick={() => connectWallet(wallet.name)}>
                <p>{wallet.name}</p>
                <Image src={wallet.logoUrl} alt={wallet.name} width={20} height={20} />
              </Button>
            ))}
          </div>

          <div className='flex gap-2 items-center justify-center'>
            <p>Wallet not listed?</p> {''}
            <Link href='' className='h-6 text-[#Cff073]' onClick={() => setIsManualWallet?.(true)}>
              Connect manually
            </Link>
            <Image src={arrow} alt='arrow' />
          </div>
        </div>
      ) : (
        <div>
          <p>Connected Account: {account}</p>
          <button type='button' onClick={disconnectWallet}>
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  )
}

export default WalletConnectComponent
