export interface IFisher {
    _id: Object,
    navn: string,
    fiskeData: [
        {
            art: string,
            lokation: string,
            dato: string
        }
    ]
}