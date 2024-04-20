import React from "react";
import banner from "../../images/banner.png";
export default function Banner() {
  return (
    <>
      <div className="w-full h-72">
        <img className="object-cover w-full h-full " src={banner} />
      </div>
    </>
  );
}
