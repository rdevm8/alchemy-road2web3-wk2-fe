import { useState } from "react"
import { GiCoffeeCup } from "react-icons/gi"
import { toast } from "react-toastify"
import Buy from "../components/Buy"
import Header from "../components/Header"
import Memo from "../components/Memo"
import TipJar from "../components/TipJar"
import Wallet from "../components/Wallet"

export default function Home() {
    const [refresh, setRefresh] = useState(false)

    return (
        <>
            <div className="flex flex-col m-0 p-0 h-full text-white gap-y-2">
                <Header></Header>
                <div className="grid grid-cols-2 gap-x-2 flex-1 justify-between">
                    <div className="flex bg-stone-800 p-4 rounded-lg">
                        <Buy refresh={refresh} setRefresh={setRefresh}></Buy>
                    </div>
                    <div className=" flex flex-col gap-y-2">
                        <div className="bg-stone-800 p-4 rounded-lg">
                            <TipJar refresh={refresh} setRefresh={setRefresh}></TipJar>
                        </div>
                        <div className="flex flex-1 bg-stone-800 p-4 rounded-lg">
                            <Memo refresh={refresh} setRefresh={setRefresh}></Memo>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
