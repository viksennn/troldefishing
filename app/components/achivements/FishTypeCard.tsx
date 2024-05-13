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
        default:
            // Hvis fisketype ikke matcher nogen kendte typer, kan du vælge at vise et standardbillede eller ingen billede
            break;
    }

    return (
        <div>
            <img draggable={false} src={fishImg} alt="fish" width={75} />
        </div>
    );
}
