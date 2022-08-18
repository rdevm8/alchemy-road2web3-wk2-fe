import { GiCoffeeCup } from "react-icons/gi"
import Wallet from "./Wallet"

export default function Header() {
    return (
        <>
            <div className="flex">
                <div className="flex flex-row bg-stone-800 p-4 rounded-lg gap-x-2 text-white">
                    <div className="flex p-2 bg-stone-700  rounded-lg items-center">
                        <GiCoffeeCup className="text-4xl md:text-9xl "></GiCoffeeCup>
                    </div>
                    <div className="flex flex-1 flex-col gap-y-2">
                        <div className="flex flex-col md:flex-row justify-between border-b-2 pb-2 border-stone-600">
                            <p className=" text-lg font-bold md:text-5xl">BUY ME A COFFEE</p>
                            <div className="flex items-center">
                                <Wallet></Wallet>
                            </div>
                        </div>
                        <div className="flex flex-1">
                            <p className=" text-justify italic">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
