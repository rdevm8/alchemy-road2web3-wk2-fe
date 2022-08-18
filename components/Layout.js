import Head from "next/head"
import { useState } from "react"
import { GiCoffeeCup } from "react-icons/gi"

import Buy from "./Buy"
import Memo from "./Memo"
import TipJar from "./TipJar"
import Wallet from "./Wallet"

export default function Layout({ children }) {
    const [refresh, setRefresh] = useState(false)

    return (
        <>
            <Head>
                <title>Buy Me A Coffee Application</title>
                <meta name="description" content="Buy Me A Coffee Application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="h-screen max-h-screen min-h-screen w-screen bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-800 p-8">
                {children}
            </main>
        </>
    )
}
