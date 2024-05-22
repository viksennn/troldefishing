export interface IFisher {
    _id: String,
    navn: string,
    fiskeData: [
        {
            art: string,
            agn: string,
            lokation: string,
            dato: string,
            imgUrl: string,
            _id: string
        }
    ]
}