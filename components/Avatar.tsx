import { FaUser } from "react-icons/fa"

export const Avatar = ({profilImgUrl}:any) => {
    if(profilImgUrl){
        return (
            <div className="h-10 w-10 rounded-full overflow-hidden">
                <img src={profilImgUrl} alt="profilbillede" className="object-cover h-full w-full" />
            </div>
        )
    } else {
        return (
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <FaUser />
            </div>
        )
    }
}