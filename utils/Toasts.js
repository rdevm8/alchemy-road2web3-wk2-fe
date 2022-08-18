import { ImSpinner2 } from "react-icons/im"
import { RiCheckDoubleFill, RiErrorWarningFill } from "react-icons/ri"
import { Slide, toast } from "react-toastify"
import { Messages } from "../constants/Messages"

const defaultProps = {
    theme: "colored",
    transition: Slide,
    autoClose: 3000,
}

export const ShowLoadingToast = (_toast) => {
    _toast.current = toast(`${Messages.toasts.loading}`, {
        icon: <ImSpinner2 className="animate-spin" />,
        type: toast.TYPE.INFO,
        autoClose: false,
        closeButton: false,
        hideProgressBar: true,
        theme: defaultProps.theme,
        transition: defaultProps.transition,
    })
}

export const UpdateLoadingToast = (_toast, message, isError) => {
    toast.update(_toast.current, {
        render: `${
            !isError
                ? Messages.toasts.success
                : message.length > 0
                ? message
                : Messages.toasts.error
        }`,
        icon: !isError ? (
            <RiCheckDoubleFill className=" h-5 w-5" />
        ) : (
            <RiErrorWarningFill className=" h-5 w-5" />
        ),
        type: !isError ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
        autoClose: defaultProps.autoClose,
        closeButton: true,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        hideProgressBar: false,
        theme: defaultProps.theme,
        transition: defaultProps.transition,
    })
}
