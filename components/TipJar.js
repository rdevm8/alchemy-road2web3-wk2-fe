import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import { contractAddresses } from "../constants"
import { FaEthereum } from "react-icons/fa"

export default function TipJar({ refresh, setRefresh }) {
    const TARGET_AMOUNT = process.env.targetAmt

    const { chainId: chainIdhex, isWeb3Enabled, web3 } = useMoralis()
    const chainId = parseInt(chainIdhex)
    const [balance, setBalance] = useState("")
    const [percentage, setPercentage] = useState(0)

    const contractAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    async function updateUI() {
        if (web3) {
            const contractBalance = (await web3.getBalance(contractAddress)).toString()
            const etherBalance = ethers.utils.formatEther(contractBalance)
            let perc = (parseFloat(etherBalance) / parseFloat(TARGET_AMOUNT)).toFixed(2) * 100

            if (perc > 100) {
                perc = 100
            }

            setBalance(etherBalance)
            setPercentage(perc)
            setRefresh(false)
        } else {
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }

        if (isWeb3Enabled && refresh) {
            updateUI()
        }
    }, [isWeb3Enabled, web3, refresh])

    return (
        <>
            <div className="flex flex-1">
                <div className="flex flex-1 flex-col bg-stone-800 rounded-lg gap-x-2 text-white gap-y-2">
                    <div className="flex flex-row gap-x-2 border-b-2 pb-2 border-stone-600">
                        <div className="flex p-2 bg-stone-700  rounded-lg ">
                            <FaEthereum className="text-4xl"></FaEthereum>
                        </div>
                        <div className="flex flex-1 items-center">
                            <p className="flex-1 font-bold text-lg">TIP JAR STATS</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 flex-1 gap-x-2 items-center justify-center">
                        <div className="flex flex-col font-semibold">
                            <span>TIPS RECEIVED: {balance.toString()} ETH</span>
                            <span>TARGET: {TARGET_AMOUNT} ETH</span>
                        </div>
                        <div className="flex flex-col col-span-2 gap-y-2 items-center justify-center">
                            <div className="w-full bg-gray-200 h-5 rounded-full">
                                <div
                                    className="bg-green-500 h-5 rounded-full font-bold p-0 text-md text-center leading-none"
                                    style={{ width: `${percentage}%` }}
                                >
                                    {percentage}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
