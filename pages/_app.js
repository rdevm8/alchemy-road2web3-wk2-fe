import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import Layout from "../components/Layout"
import { ToastContainer } from "react-toastify"

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <Layout>
                <Component {...pageProps} />
                <ToastContainer></ToastContainer>
            </Layout>
        </MoralisProvider>
    )
}

export default MyApp
