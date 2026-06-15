import { useFormStatus } from "react-dom"

export const SubmitButton = ({ label }: { label: string})=> {
    //submitting state false => not submitting the form button clickable
    const { pending } = useFormStatus()
    return (        
        <button disabled={pending} className={`${pending ? "cursor-not-allowed" : "cursor-pointer"} bg-blue-500 p-2 flex w-full text-white items-center justify-center duration-200 transition-all transform rounded-lg hover:rounded-2xl hover:bg-blue-700`} type="submit">{pending ? <div className="h-7 w-7 rounded-full border-b-2 border-b-white animate-spin"></div> : label}</button>
    )
}