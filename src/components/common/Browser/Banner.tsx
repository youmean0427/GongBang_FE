import React from "react";
import banner from "../../images/banner.png";
import banner_item1 from "../../../images/banner_item1.png";
import banner_item2 from "../../../images/banner_item2.png";
import { isBrowser, isMobile } from "react-device-detect";
export default function Banner() {
  if (isBrowser)
    return (
      <>
        <div className="w-full h-72 bg-[#EFDCCB]">
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-full h-full">
              <div className="flex flex-col items-end justify-start w-full h-full mt-5">
                <img className="w-[200px]" src={banner_item1} />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full ">
              <div className="p-3 text-base font-medium text-white badge border-gongbang bg-gongbang">
                공부다방
              </div>
              <div className="mt-3 mb-3 text-3xl font-semibold">공방</div>
              <div className="mb-2 font-medium">공부하기 좋은 카페</div>
              <div className="font-medium">상세한 카페 리뷰</div>
            </div>
            <div className="w-full h-full">
              <div className="flex flex-col items-start justify-end w-full h-full pb-5">
                <img className="w-[150px]" src={banner_item2} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  return (
    <>
      <div className="w-full h-60 bg-[#EFDCCB]">
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-full h-full">
            <div className="flex flex-col items-end justify-start w-full h-full mt-5">
              <img className="w-[100px]" src={banner_item1} />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full ">
            <div className="p-3 text-sm font-semibold text-white badge border-gongbang bg-gongbang">
              공부다방
            </div>
            <div className="mt-3 mb-3 text-2xl font-bold">공방</div>
            <div className="mb-2 text-sm font-semibold">공부하기 좋은 카페</div>
            <div className="text-sm font-semibold">상세한 카페 리뷰</div>
          </div>
          <div className="w-full h-full">
            <div className="flex flex-col items-center justify-end w-full h-full pb-5">
              <img className="w-[80px]" src={banner_item2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
