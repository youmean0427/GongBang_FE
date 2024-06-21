import React, { useEffect, useState } from "react";
import fullStar from "../../../images/full_star.png";
import emStar from "../../../images/em_star.png";
import { isBrowser, isMobile } from "react-device-detect";
// import "./Star.css";

interface Stars {
  score: number;
  size: string;
}
type SizeType = {
  [key: string]: string;
  small: string;
  large: string;
};

const starsSize: SizeType = {
  small: "w-7",
  large: "w-10",
};
const textsSize: SizeType = {
  small: "h-full text-lg mr-2 font-bold text-amber-700",
  large: "h-full text-xl mr-2 font-bold text-amber-700",
};

const mobiletextsSize: SizeType = {
  small: "h-full text-base mr-2 font-semibold text-amber-700",
  large: "h-full text-lg mr-2 font-semibold text-amber-700",
};

const mobilestarsSize: SizeType = {
  small: "w-5",
  large: "w-8",
};

export default function Stars({ score, size }: Stars) {
  const [stars, setStars] = useState([false, false, false, false, false]);
  let starSize = starsSize[size];
  let textSize = textsSize[size];
  if (isMobile) {
    textSize = mobiletextsSize[size];
    starSize = mobilestarsSize[size];
  }

  useEffect(() => {
    let arr = [false, false, false, false, false];
    for (let i = 0; i < Math.floor(score); i++) {
      arr[i] = true;
    }
    setStars(arr);
  }, [score]);

  if (isBrowser)
    return (
      <>
        {score !== undefined && (
          <div className="flex flex-row items-center ">
            <div className={`${textSize}`}>{score.toFixed(2)}</div>
            <div className={`${starSize}`}>
              {stars[0] ? (
                <img className="w-full" src={fullStar} alt="star" />
              ) : (
                <img className="w-full" src={emStar} alt="star" />
              )}
            </div>
            <div className={`${starSize}`}>
              {stars[1] ? (
                <img className="w-full" src={fullStar} alt="star" />
              ) : (
                <img className="w-full" src={emStar} alt="star" />
              )}
            </div>
            <div className={`${starSize}`}>
              {stars[2] ? (
                <img className="w-full" src={fullStar} alt="star" />
              ) : (
                <img className="w-full" src={emStar} alt="star" />
              )}
            </div>
            <div className={`${starSize}`}>
              {" "}
              {stars[3] ? (
                <img className="w-full" src={fullStar} alt="star" />
              ) : (
                <img className="w-full" src={emStar} alt="star" />
              )}
            </div>
            <div className={`${starSize}`}>
              {stars[4] ? (
                <img className="w-full" src={fullStar} alt="star" />
              ) : (
                <img className="w-full" src={emStar} alt="star" />
              )}
            </div>
          </div>
        )}
      </>
    );
  return (
    <>
      {score !== undefined && (
        <div className="flex flex-row items-center ">
          <div className={`${textSize}`}>{score.toFixed(2)}</div>
          <div className={`${starSize}`}>
            {stars[0] ? (
              <img className="w-full" src={fullStar} alt="star" />
            ) : (
              <img className="w-full" src={emStar} alt="star" />
            )}
          </div>
          <div className={`${starSize}`}>
            {stars[1] ? (
              <img className="w-full" src={fullStar} alt="star" />
            ) : (
              <img className="w-full" src={emStar} alt="star" />
            )}
          </div>
          <div className={`${starSize}`}>
            {stars[2] ? (
              <img className="w-full" src={fullStar} alt="star" />
            ) : (
              <img className="w-full" src={emStar} alt="star" />
            )}
          </div>
          <div className={`${starSize}`}>
            {" "}
            {stars[3] ? (
              <img className="w-full" src={fullStar} alt="star" />
            ) : (
              <img className="w-full" src={emStar} alt="star" />
            )}
          </div>
          <div className={`${starSize}`}>
            {stars[4] ? (
              <img className="w-full" src={fullStar} alt="star" />
            ) : (
              <img className="w-full" src={emStar} alt="star" />
            )}
          </div>
        </div>
      )}
    </>
  );
}
