import { useEffect } from "react"
import { RiLoader4Fill, RiUser3Fill } from "react-icons/ri"
import { useChain, useMoralis } from "react-moralis"
import { ConnectedWalletButton, ConnectWalletButton } from "../utils/Buttons"

export default function Wallet({ refresh, setRefresh }) {
    const config_chainId = process.env.chainId

    const { account, enableWeb3, deactivateWeb3, isWeb3Enabled, isWeb3EnableLoading, Moralis } =
        useMoralis()

    const { switchNetwork, chainId } = useChain()

    useEffect(() => {
        //Handle reenabling web3 in frontend
        if (!isWeb3Enabled && typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }

        //Handle chainId change if not equal to config chainId
        if (isWeb3Enabled && chainId && config_chainId != chainId) {
            switchNetwork(config_chainId)
        }
    }, [isWeb3Enabled, chainId])

    useEffect(() => {
        // Handle chain change
        Moralis.onChainChanged((chain) => {
            if (config_chainId != chain) {
                console.log("deactivate on chain change")
                disableWeb3()
            } else {
                if (!isWeb3Enabled && typeof window !== "undefined") {
                    if (window.localStorage.getItem("connected")) {
                        enableWeb3()
                    }
                }
            }
        })

        // Handle account change
        Moralis.onAccountChanged((account) => {
            disableWeb3()
        })
    }, [])

    const disableWeb3 = async () => {
        window.localStorage.removeItem("connected")
        await deactivateWeb3()
    }

    const enWeb3 = async () => {
        await enableWeb3()
        window.localStorage.setItem("connected", "injected")
    }

    return (
        <>
            {account ? (
                <ConnectedWalletButton onClick={disableWeb3}>
                    <span className="flex items-center justify-center gap-x-2">
                        <RiUser3Fill className="w-5 h-5 "></RiUser3Fill>
                        {account.slice(0, 6)}...
                        {account.slice(length - 4)}
                    </span>
                </ConnectedWalletButton>
            ) : (
                <ConnectWalletButton onClick={enWeb3} disabled={isWeb3EnableLoading}>
                    {isWeb3EnableLoading ? (
                        <span className="flex items-center justify-center gap-x-2">
                            <RiLoader4Fill className="w-5 h-5 animate-spin"></RiLoader4Fill>
                            Loading...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-x-2">
                            <img src="metamask.svg" className="w-5 h-5"></img>
                            Connect Wallet
                        </span>
                    )}
                </ConnectWalletButton>
            )}
        </>
    )
}
