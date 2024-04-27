export interface IFisher {
    _id: String,
    navn: string,
    fiskeData: [
        {
            art: string,
            lokation: string,
            dato: string,
            fishId: string
        }
    ]
}