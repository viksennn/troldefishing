import { IWeather } from "@/types/IWeather";
import { cache } from "react"
import { FaDroplet, FaTemperatureHalf, FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";

export const VejrComp = async () => {

    const weatherData = async ():Promise<IWeather> => {
        const response = await fetch("http://api.weatherapi.com/v1/current.json?key=e863796fb3d84733962195215240705&q=Troldhede&aqi=yes", {cache: "no-store"});
        const data = await response.json();
        return data;
    }

    const data = await weatherData();

    const iconSize = 25;

    const tempData = [
        {name: "Temperatur", data: `${data.current.temp_c}°C`, icon: <FaTemperatureHalf size={iconSize} />},
    ]

    return (
        <div className="flex gap-5 border px-5 py-10 rounded">
            <div className="flex flex justify-center items-center gap-3">
                <img draggable={false} src={data.current.condition.icon} alt="weather icon" className="h-10"/>
                <p className="text-xl">{data.location.name}</p>
            </div>
            <div className="flex gap-10 p-3 roundedborder-2 items-center justify-center">
                {tempData.map(temp => {
                    return (
                        <div key={temp.name} className="flex items-center gap-1">
                            <p className="text-xl">{temp.data}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}