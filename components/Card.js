export default function Card({ item }) {
    const options = {
        hour: "numeric",
        minute: "numeric",
    }

    return (
        <>
            <div className=" bg-stone-500 p-2 flex flex-col rounded-lg">
                <div className="flex flex-row justify-between">
                    <span className=" italic font-semibold">{item.name}</span>
                    <span>
                        {new Date(parseInt(item.timeStamp.toString()) * 1000).toLocaleDateString(
                            "en-us",
                            options
                        )}
                    </span>
                </div>

                <span>"{item.message}"</span>
            </div>
        </>
    )
}
