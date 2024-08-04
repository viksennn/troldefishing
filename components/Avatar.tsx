import { FaUser } from "react-icons/fa"

export const Avatar = ({profilImgUrl, size}:any) => {
    if(profilImgUrl){
        return (
            <div className={`h-${size} w-${size} rounded-full bg-gray-300 flex items-center justify-center`}>
                <img src={profilImgUrl} alt="profilbillede" className="object-cover h-full w-full rounded-full" />
            </div>
        )
    } else {
        return (
            <div className={`h-${size} w-${size} rounded-full bg-gray-300 flex items-center justify-center`}
            >
                <FaUser />
            </div>
        )
    }
}