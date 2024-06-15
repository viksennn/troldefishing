export const FishTypeCard = ({ data }: any) => {

    let fishImg = "";
    const fishType = data.art;

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
        default:
            fishImg = "/ach/defaultfisk.png"
            break;
    }

    return (
        <div>
            <img draggable={false} src={fishImg} alt="fish" className="w-[65px] object-cover lg:w-[80px]" />
        </div>
    );
}
