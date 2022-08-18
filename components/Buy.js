import React, { useEffect, useState } from "react"
import { SiBuymeacoffee, SiCoffeescript } from "react-icons/si"
import { DefaultButton } from "../utils/Buttons"
import { DefaultFieldSet, DefaultInputField } from "../utils/Form"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { ethers } from "ethers"
import { ShowLoadingToast, UpdateLoadingToast } from "../utils/Toasts"
import { GiStarsStack } from "react-icons/gi"

export default function Buy({ refresh, setRefresh }) {
    const initialMemo = {
        name: "",
        message: "",
    }

    const [memo, setMemo] = useState(initialMemo)
    const [tip, setTip] = useState(0)
    const [isTipping, setIsTipping] = useState(false)
    const [minTip, setMinTip] = useState(0)
    const [maxTip, setMaxTip] = useState(0)
    const toastId = React.useRef(null)

    const { chainId: chainIdhex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdhex)
    const contractAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    // BUY COFFEE
    const {
        runContractFunction: buyCoffee,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "buyCoffee",
        params: {
            name: memo.name || "Anonymous Tipper",
            message: memo.message || "You are welcome!",
        },
        msgValue: tip,
    })

    // GET MIN TIP
    const { runContractFunction: getMinTip } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getMinTip",
        params: {},
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setMemo({ ...memo, [name]: value })
    }

    const clearForm = () => {
        setMemo(initialMemo)
    }

    const updateUI = async () => {
        //SET DEFAULT TIPS
        const c_minTip = await getMinTip()
        const c_maxTip = ethers.utils.parseUnits((c_minTip * 3).toString(), "wei")

        setMinTip(c_minTip)
        setMaxTip(c_maxTip)
        setTip(c_minTip)
    }

    const executeTip = async () => {
        const c_buyCoffee = await buyCoffee({
            onSuccess: handleSuccess,
            onError: handleError,
        })
    }

    const handleSuccess = async (tx) => {
        await tx.wait()

        if (tx.hash) {
            UpdateLoadingToast(toastId, "", false)

            setMemo(initialMemo)
            setRefresh(true)
        }
    }

    const handleError = (error) => {
        console.log("Handler Error: ", error)

        UpdateLoadingToast(toastId, error.message, true)
    }

    const initiateTip = (mode) => {
        mode = mode || 0

        if (mode == 0) {
            setTip(minTip)
        } else {
            setTip(maxTip)
        }

        setIsTipping(true)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        if (isTipping && isWeb3Enabled) {
            executeTip()
            setIsTipping(false)
        }
    }, [isTipping, tip])

    useEffect(() => {
        if (isLoading) {
            ShowLoadingToast(toastId)
        }
    }, [isLoading])

    return (
        <>
            <div className="flex flex-1">
                <div className="flex flex-1 flex-col bg-stone-800 rounded-lg gap-x-2 text-white gap-y-2">
                    <div className="flex flex-row gap-x-2 border-b-2 pb-2 border-stone-600">
                        <div className="flex p-2 bg-stone-700  rounded-lg ">
                            <GiStarsStack className="text-4xl"></GiStarsStack>
                        </div>
                        <div className="flex flex-1 items-center">
                            <p className="flex-1 font-bold text-lg">BUY ME A COFFEE</p>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col  bg-stone-700 px-4 py-2 rounded-lg">
                        <div className="flex flex-1 flex-col justify-center">
                            <div className="flex flex-col justify-center">
                                <span className="text-lg font-bold border-b-2 pb-2 border-b-white">
                                    Tip Message
                                </span>
                                <DefaultFieldSet legend={"Name"}>
                                    <DefaultInputField
                                        type={"text"}
                                        placeholder={"Name"}
                                        name="name"
                                        value={memo.name}
                                        onChange={handleChange}
                                    ></DefaultInputField>
                                </DefaultFieldSet>
                                <DefaultFieldSet legend={"Message"}>
                                    <DefaultInputField
                                        type={"text"}
                                        placeholder={"Message"}
                                        name="message"
                                        value={memo.message}
                                        onChange={handleChange}
                                    ></DefaultInputField>
                                </DefaultFieldSet>
                            </div>
                        </div>
                        <div className="flex flex-row gap-x-2 justify-center">
                            <DefaultButton
                                onClick={() => {
                                    initiateTip(0)
                                }}
                                disabled={isLoading}
                            >
                                <span className="flex items-center justify-center gap-x-2">
                                    <SiCoffeescript className=" text-2xl"></SiCoffeescript>
                                    <div className="flex flex-col">
                                        <span>Buy Coffee</span>
                                        <span className=" text-xs">
                                            {ethers.utils.formatEther(minTip)} ETH
                                        </span>
                                    </div>
                                </span>
                            </DefaultButton>
                            <DefaultButton
                                onClick={() => {
                                    initiateTip(1)
                                }}
                                disabled={isLoading}
                            >
                                <span className="flex items-center justify-center  gap-x-2">
                                    <SiBuymeacoffee className="text-2xl"></SiBuymeacoffee>
                                    <div className="flex flex-col">
                                        <span>Buy Large Coffee</span>
                                        <span className=" text-xs">
                                            {ethers.utils.formatEther(maxTip)} ETH
                                        </span>
                                    </div>
                                </span>
                            </DefaultButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
