import React from "react"

export function DefaultButton({ children, className, ...rest }) {
    return (
        <button
            type="button"
            className=" p-2 bg-blue-800 rounded-lg text-white w-48  hover:opacity-80"
            {...rest}
        >
            {children}
        </button>
    )
}

export function ConnectWalletButton({ children, className, ...rest }) {
    return (
        <button
            type="button"
            className="  py-2 px-4 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-full border-none text-white"
            {...rest}
        >
            {children}
        </button>
    )
}

export function ConnectedWalletButton({ children, className, ...rest }) {
    return (
        <button
            type="button"
            className="  py-2 px-4 bg-orange-400 border-2 border-orange-600 rounded-lg text-white"
            {...rest}
        >
            {children}
        </button>
    )
}
