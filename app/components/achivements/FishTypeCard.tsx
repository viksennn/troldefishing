export const FishTypeCard = ({art, className}: any) => {

    let fishImg = "";
    const fishType = art;

    switch (fishType) {
        case "Regnbue Ørred":
            fishImg = "/ach/rainbow-trout.png";
            break;
        case "Gedde":
            fishImg = "/ach/pike.png";
            break;
        case "Laks":
            fishImg = "/ach/salmon.png";
            break;
        case "Aborre":
            fishImg = "/ach/aborre.png";
            break;
        case "Hornfisk":
            fishImg = "/ach/hornfisk.png";
            break;
        case "Makrel":
            fishImg = "/ach/makrel.png";
            break;
        case "Skalle":
            fishImg = "/ach/skalle.png";
            break;
        case "Guld Ørred":
            fishImg = "/ach/golden-trout.png";
            break;
        case "Rødspætte":
            fishImg = "/ach/fladfisk.png";
            break;
        case "Skrubbe":
            fishImg = "/ach/fladfisk.png";
            break;
        case "Bækørred":
            fishImg = "/ach/browntrout.png";
            break;
        case "Comber":
            fishImg = "/ach/comber.png";
            break;
        case "Stør":
            fishImg = "/ach/stør.png";
            break;
        default:
            fishImg = "/ach/defaultfisk.png"
            break;
    }

    return (
        <div>
            <img draggable={false} src={fishImg} alt="fish" className={className} />
        </div>
    );
}
