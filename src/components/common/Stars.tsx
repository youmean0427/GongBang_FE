import React, { useEffect, useState } from "react";
import fullStar from "../../images/full_star.png";
import emStar from "../../images/em_star.png";

// import "./Star.css";

interface Stars {
  score: number;
  size: string;
}

const starsSize: any = {
  small: "w-7",
  large: "w-10",
};
const textsSize: any = {
  small: "text-lg mr-2 font-bold text-amber-700",
  large: "text-xl mr-2 font-bold text-amber-700",
};

export default function Stars({ score, size }: Stars) {
  const [stars, setStars] = useState([false, false, false, false, false]);
  let starSize = starsSize[size];
  let textSize = textsSize[size];
  useEffect(() => {
    let arr = [false, false, false, false, false];
    for (let i = 0; i < Math.floor(score); i++) {
      arr[i] = true;
    }
    setStars(arr);
  }, [score]);

  return (
    <>
      {score !== undefined && (
        <div className="flex flex-row items-center ">
          <div className={`${textSize}`}>{score.toFixed(2)}</div>
          <div className={`${starSize}`}>
            {stars[0] ? (
              <img className="w-full" src={fullStar} />
            ) : (
              <img className="w-full" src={emStar} />
            )}
          </div>
          <div className={`${starSize}`}>
            {stars[1] ? (
              <img className="w-full" src={fullStar} />
            ) : (
              <img className="w-full" src={emStar} />
            )}
          </div>
          <div className={`${starSize}`}>
            {stars[2] ? (
              <img className="w-full" src={fullStar} />
            ) : (
              <img className="w-full" src={emStar} />
            )}
          </div>
          <div className={`${starSize}`}>
            {" "}
            {stars[3] ? (
              <img className="w-full" src={fullStar} />
            ) : (
              <img className="w-full" src={emStar} />
            )}
          </div>
          <div className={`${starSize}`}>
            {stars[4] ? (
              <img className="w-full" src={fullStar} />
            ) : (
              <img className="w-full" src={emStar} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
