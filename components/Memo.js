import { useEffect, useState } from "react"
import { FaGrinStars } from "react-icons/fa"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import Card from "./Card"

export default function Memo({ refresh, setRefresh }) {
    const [memos, setMemos] = useState([])

    const { chainId: chainIdhex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdhex)
    const contractAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    // GET MEMOS
    const { runContractFunction: getMemos } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getMemos",
        params: {},
    })

    const updateUI = async () => {
        const c_memos = await getMemos({ onComplete: () => setRefresh(false) })
        setMemos(c_memos)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }

        if (isWeb3Enabled && refresh) {
            console.log("memo refresh")
            updateUI()
        }
    }, [isWeb3Enabled, refresh])

    return (
        <>
            <div className="flex flex-1">
                <div className="flex flex-1 flex-col bg-stone-800 rounded-lg gap-x-2 text-white gap-y-2">
                    <div className="flex flex-row gap-x-2 border-b-2 pb-2 border-stone-600">
                        <div className="flex p-2 bg-stone-700  rounded-lg ">
                            <FaGrinStars className="text-4xl"></FaGrinStars>
                        </div>
                        <div className="flex flex-1 items-center">
                            <p className="flex-1 font-bold text-lg">TIPS</p>
                        </div>
                    </div>
                    <div className="flex flex-1 overflow-hidden">
                        <div className="flex flex-col flex-1 gap-y-2 h-[16rem] overflow-y-auto">
                            {memos
                                .slice()
                                .sort((a, b) => b.timeStamp - a.timeStamp)
                                .map((memo, index) => {
                                    return <Card key={index} item={memo}></Card>
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
