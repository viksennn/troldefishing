import Lottie from "react-lottie";

import animationData from "@/lottie/Animation - 1715163599617.json";

export default function Lottie404() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div>
        <Lottie 
          options={defaultOptions}
          isClickToPauseDisabled={true}
          height={400}
          width={400}
        />
      </div>
    );
  }
  