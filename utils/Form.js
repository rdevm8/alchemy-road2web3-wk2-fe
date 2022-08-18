import { useState } from "react"

export function DefaultFieldSet({ legend, children, className, ...rest }) {
    return (
        <fieldset className="border-2 border-white flex flex-col px-2 py-4 rounded-lg w-full">
            <legend className=" text-lg font-semibold">{legend}</legend>
            {children}
        </fieldset>
    )
}

export function DefaultInputField({ type, placeholder, className, ...rest }) {
    return (
        <input
            className=" bg-transparent outline-0"
            type={type}
            placeholder={placeholder}
            {...rest}
        />
    )
}
