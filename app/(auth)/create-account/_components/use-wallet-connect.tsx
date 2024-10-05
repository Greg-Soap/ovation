import { useState, useEffect } from 'react'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { BrowserProvider } from 'ethers'
import { toast } from 'sonner'
import { chainIdToChainName, startCase } from '@/lib/helper-func'
import type { OfflineSigner } from '@cosmjs/proto-signing'

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string

export function useWalletConnect(
  onWalletConnected?: (account: string) => void,
  onWalletDisconnected?: () => void,
) {
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
        setChain('solana')
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

  const chainId = 'archway-1'
  const connectKeplr = async (): Promise<void> => {
    if (!window.keplr) {
      toast.error('Please install Keplr extension')
      return
    }

    try {
      await window.keplr.enable(chainId)

      const offlineSigner: OfflineSigner = window.getOfflineSigner(chainId)

      const accounts = await offlineSigner.getAccounts()
      setAccount(accounts[0].address)
      setChain('archway')

      // const client = await StargateClient.connect("https://rpc.cosmos.network");
      // const balance = await client.getAllBalances(accountAddress);
      // console.log("Account balances:", balance);
    } catch (error) {
      console.error('Failed to connect to Keplr:', error)
    }
  }

  const connectLeap = async (): Promise<void> => {
    if (!window.leap) {
      toast.error('Please install Leap Wallet extension')
      return
    }

    try {
      const chainId = 'archway-1' // chain ID for Cosmos Hub
      await window.leap.enable(chainId)

      const offlineSigner = window.leap.getOfflineSigner(chainId)
      const accounts = await offlineSigner.getAccounts()

      setAccount(accounts[0].address)
      setChain('archway')

      console.log('Connected account address: ', accounts[0].address)
    } catch (error) {
      console.error('Error connecting to Leap Wallet:', error)
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
    const formattedWalletName = startCase(walletName)
    switch (formattedWalletName) {
      case 'Leap Wallet':
        await connectLeap()
        break
      case 'Metamask':
        await connectMetaMask()
        break
      case 'Trust Wallet':
        await connectTrustWallet()
        break
      case 'Phantom':
        await connectPhantom()
        break
      case 'Biance Chain':
        await connectBinanceChainWallet()
        break
      case 'Wallet Connect':
        await connectWalletConnect()
        break

      case 'Okx':
        await connectOKXWallet()
        break
      case 'Opera Wallet':
        await connectOperaWallet()
        break
      case 'Brave Wallet':
        await connectBraveWallet()
        break
      case 'Math Wallet':
        await connectMathWallet()
        break
      case 'Safe Pal':
        await connectSafePalWallet()
        break
      case 'Token Pocket':
        await connectTokenPocket()
        break
      case 'Keplr':
        await connectKeplr()
        break
      case 'Leap':
        await connectLeap()
        break
      default:
        console.error('Unsupported wallet:', formattedWalletName)
        toast.error(`${formattedWalletName} is not supported yet.`)
    }
  }

  return {
    account,
    chain,
    connectWallet,
    disconnectWallet,
  }
}