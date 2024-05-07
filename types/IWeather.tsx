export interface IWeather {
    "location": {
    "name": string;
    },
    "current": {
        "temp_c": number;
        "condition": {
            "text": string;
            "icon": string;
        }
        "wind_kph": number;
        "wind_dir": string;
        "humidity": number;
        "uv": number;
    }
}