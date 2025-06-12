import { FcGoogle } from "react-icons/fc"

export const GoogleContinueButton = ({ onClickHandler }: { onClickHandler: () => void })=> {
    return (
        <div className=" w-full flex">
            <button onClick={onClickHandler} className="w-full text-black items-center justify-center border-[#e4e4ea] border-solid border cursor-pointer hover:border-black hover:bg-neutral-200 duration-200 transition-all hover:rounded-2xl hover:text-black/70 rounded-lg bg-[#f8f8f8] backdrop-blur-lg flex gap-x-2 p-2"><FcGoogle size={25}/> <span className="sm:flex hidden">Continue With Google</span></button>
        </div>
    )
}