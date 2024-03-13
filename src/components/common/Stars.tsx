import React, { useEffect, useState } from "react";
import fullStar from "../../images/full_star.png";
import emStar from "../../images/em_star.png";

// import "./Star.css";

interface Stars {
  score: number;
  size: number;
}

export default function Stars({ score, size }: Stars) {
  const [stars, setStars] = useState([false, false, false, false, false]);

  useEffect(() => {
    let arr = [false, false, false, false, false];
    for (let i = 0; i < Math.floor(score); i++) {
      arr[i] = true;
    }
    setStars(arr);
  }, [score]);

  return (
    <>
      <div className="flex flex-row items-center">
        <div className="">{score.toFixed(2)}</div>
        <div>{stars[0] ? <img src={fullStar} /> : <img src={emStar} />}</div>
        <div>{stars[1] ? <img src={fullStar} /> : <img src={emStar} />}</div>
        <div>{stars[2] ? <img src={fullStar} /> : <img src={emStar} />}</div>
        <div>{stars[3] ? <img src={fullStar} /> : <img src={emStar} />}</div>
        <div>{stars[4] ? <img src={fullStar} /> : <img src={emStar} />}</div>
      </div>
    </>
  );
}
