import { FC } from "react"

interface Props {
    text: string;
    loading: boolean;
    disabled: boolean;
}

export const Button: FC<Props> = ({text}) => {
    return (
        <button 
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full transition cursor-pointer"
        >
            {text}
        </button>
    )
}