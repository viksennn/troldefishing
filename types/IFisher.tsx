export interface IFisher {
    _id: String,
    navn: string,
    profilImgUrl: string,
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