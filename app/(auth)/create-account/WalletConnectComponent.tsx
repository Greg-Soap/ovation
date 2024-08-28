import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { BrowserProvider } from 'ethers';
import walletData from './_data';
import Image from 'next/image';
import Link from 'next/link';
import arrow from '@/public/assets/images/arrow-right.png';
import { Button } from '@/components/ui/button';

interface WalletConnectComponentProps {
    setPage: React.Dispatch<React.SetStateAction<number>>;
    onWalletConnected?: (account: string) => void;
    onWalletDisconnected?: () => void;
}

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;

const WalletConnectComponent: React.FC<WalletConnectComponentProps> = ({
    setPage,
    onWalletConnected,
    onWalletDisconnected,
}) => {
    const [provider, setProvider] = useState<any>(null);
    const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
    const [account, setAccount] = useState<string | null>(null);

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
        });

        setWeb3Modal(web3ModalInstance);
    }, []);

    const connectMetaMask = async () => {
        if ((window as any).ethereum) {
            const provider = new BrowserProvider(window.ethereum);
            try {
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const account = signer.address;
                setProvider(provider);
                setAccount(account);
                if (onWalletConnected) onWalletConnected(account);
                console.log('Connected with MetaMask:', account);
            } catch (error) {
                console.error('MetaMask connection failed:', error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    const connectWalletConnect = async () => {
        if (!web3Modal) return;

        try {
            const instance = await web3Modal.connectTo('walletconnect'); // Direct connection to WalletConnect
            const provider = new BrowserProvider(instance);
            const signer = await provider.getSigner();
            const account = signer.address;
            setProvider(provider);
            setAccount(account);
            if (onWalletConnected) onWalletConnected(account);
            console.log('Connected with WalletConnect:', account);
        } catch (error) {
            console.error('WalletConnect connection failed:', error);
        }
    };

    const connectPhantom = async () => {
        if ((window as any).solana && (window as any).solana.isPhantom) {
            try {
                const response = await (window as any).solana.connect();
                setAccount(response.publicKey.toString());
                if (onWalletConnected) onWalletConnected(response.publicKey.toString());
                console.log('Connected with Phantom:', response.publicKey.toString());
            } catch (err) {
                console.error('Phantom connection failed:', err);
            }
        } else {
            alert('Please install Phantom Wallet!');
        }
    };

    const connectOKXWallet = async () => {
        if ((window as any).okexchain) {
            try {
                const provider = new BrowserProvider((window as any).okexchain);
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const account = signer.address;
                setProvider(provider);
                setAccount(account);
                if (onWalletConnected) onWalletConnected(account);
                console.log('Connected with OKX Wallet:', account);
            } catch (error) {
                console.error('OKX Wallet connection failed:', error);
            }
        } else {
            alert('Please install OKX Wallet!');
        }
    };

    const connectTrustWallet = async () => {
        if ((window as any).ethereum && (window as any).ethereum.isTrust) {
            try {
                const provider = new BrowserProvider((window as any).ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const account = signer.address;
                setProvider(provider);
                setAccount(account);
                if (onWalletConnected) onWalletConnected(account);
                console.log('Connected with Trust Wallet:', account);
            } catch (error) {
                console.error('Trust Wallet connection failed:', error);
            }
        } else {
            alert('Please install Trust Wallet!');
        }
    };

    const connectBinanceChainWallet = async () => {
        if ((window as any).BinanceChain) {
            try {
                const provider = new BrowserProvider((window as any).BinanceChain);
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const account = signer.address;
                setProvider(provider);
                setAccount(account);
                if (onWalletConnected) onWalletConnected(account);
                console.log('Connected with Binance Chain Wallet:', account);
            } catch (error) {
                console.error('Binance Chain Wallet connection failed:', error);
            }
        } else {
            alert('Please install Binance Chain Wallet!');
        }
    };

    const connectCoin98Wallet = async () => {
        if ((window as any).coin98) {
            try {
                const provider = new BrowserProvider((window as any).coin98);
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const account = signer.address;
                setProvider(provider);
                setAccount(account);
                if (onWalletConnected) onWalletConnected(account);
                console.log('Connected with Coin98 Wallet:', account);
            } catch (error) {
                console.error('Coin98 Wallet connection failed:', error);
            }
        } else {
            alert('Please install Coin98 Wallet!');
        }
    };

    const connectOperaWallet = async () => {
        if ((window as any).ethereum && (window as any).ethereum.isOpera) {
            try {
                const provider = new BrowserProvider((window as any).ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const account = signer.address;
                setProvider(provider);
                setAccount(account);
                if (onWalletConnected) onWalletConnected(account);
                console.log('Connected with Opera Wallet:', account);
            } catch (error) {
                console.error('Opera Wallet connection failed:', error);
            }
        } else {
            alert('Please install Opera Wallet!');
        }
    };

    const connectBraveWallet = async () => {
        if ((window as any).ethereum && (window as any).ethereum.isBraveWallet) {
            try {
                const provider = new BrowserProvider((window as any).ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const account = signer.address;
                setProvider(provider);
                setAccount(account);
                if (onWalletConnected) onWalletConnected(account);
                console.log('Connected with Brave Wallet:', account);
            } catch (error) {
                console.error('Brave Wallet connection failed:', error);
            }
        } else {
            alert('Please install Brave Wallet!');
        }
    };

    const connectMathWallet = async () => {
        if ((window as any).ethereum && (window as any).ethereum.isMathWallet) {
            try {
                const provider = new BrowserProvider((window as any).ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const account = signer.address;
                setProvider(provider);
                setAccount(account);
                if (onWalletConnected) onWalletConnected(account);
                console.log('Connected with Math Wallet:', account);
            } catch (error) {
                console.error('Math Wallet connection failed:', error);
            }
        } else {
            alert('Please install Math Wallet!');
        }
    };

    const connectSafePalWallet = async () => {
        if ((window as any).ethereum && (window as any).ethereum.isSafePal) {
            try {
                const provider = new BrowserProvider((window as any).ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const account = signer.address;
                setProvider(provider);
                setAccount(account);
                if (onWalletConnected) onWalletConnected(account);
                console.log('Connected with SafePal Wallet:', account);
            } catch (error) {
                console.error('SafePal Wallet connection failed:', error);
            }
        } else {
            alert('Please install SafePal Wallet!');
        }
    };

    const connectTokenPocket = async () => {
        if ((window as any).ethereum && (window as any).ethereum.isTokenPocket) {
            try {
                const provider = new BrowserProvider((window as any).ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const account = signer.address;
                setProvider(provider);
                setAccount(account);
                if (onWalletConnected) onWalletConnected(account);
                console.log('Connected with TokenPocket:', account);
            } catch (error) {
                console.error('TokenPocket connection failed:', error);
            }
        } else {
            alert('Please install TokenPocket!');
        }
    };

    const disconnectWallet = () => {
        if (provider?.disconnect) {
            provider.disconnect();
        }
        setProvider(null);
        setAccount(null);
        if (onWalletDisconnected) onWalletDisconnected();
        console.log('Disconnected wallet');
    };

    return (
        <div>
            {!account ? (
                <div className="flex flex-col gap-7">
                    <div className="grid grid-cols-2 gap-4">
                        {walletData.map((wallet) => (
                            <Button
                                key={wallet.id}
                                onClick={() => setPage(4)}
                                className="text-start flex justify-between p-2 md:p-[1rem] h-[58px] w-full md:w-[242px] text-xs md:text-sm font-semibold text-white border-[1px] border-solid bg-transparent border-[#353538]">
                                <p> {wallet.name}</p>
                                {/* <Image
                              className="w-6 h-6s"
                              src={wallet.img}
                              alt={`${wallet.name} icon`}
                            /> */}
                                <wallet.img />
                            </Button>
                        ))}
                    </div>

                    <div className="flex gap-2 items-center justify-center">
                        <p>Wallet not listed?</p> {''}
                        <Link href="" className="h-6 text-[#Cff073]">
                            Connect manually
                        </Link>
                        <Image src={arrow} alt="arrow" />
                    </div>
                </div>
            ) : (
                <div>
                    <p>Connected Account: {account}</p>
                    <button onClick={disconnectWallet}>Disconnect Wallet</button>
                </div>
            )}
        </div>
    );
};

export default WalletConnectComponent;
