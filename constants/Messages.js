import { RiQuestionFill } from "react-icons/ri"

export const Messages = {
    toasts: {
        success: "Thank you!",
        error: "An error occurred while processing the request!",
        loading: "Please wait...",
    },
    pathSpecific: {
        faq: {
            heading: "No FAQs available",
            subHeading: "There are no frequently asked questions as of the moment",
            icon: <RiQuestionFill className="h-36 w-36"></RiQuestionFill>,
        },
    },
}
