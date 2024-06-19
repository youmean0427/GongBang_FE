import banner_item1 from "../../../../images/banner_item1.png";
import banner_item2 from "../../../../images/banner_item2.png";
import { isBrowser, isMobile } from "react-device-detect";
import "./Banner.css";
export default function Banner() {
  // Browser
  if (isBrowser)
    return (
      <>
        <div className="w-full h-72 bg-[#EFDCCB]">
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-full h-full">
              <div className="flex flex-col items-end justify-start w-full h-full mt-5 ">
                <img className="w-[200px] img_fadeIn " src={banner_item1} />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full ">
              <div className="p-3 text-base font-normal text-white badge border-gongbang bg-gongbang font_slideIn">
                공부다방
              </div>
              <div className="mt-3 mb-2 text-3xl font-semibold font_slideIn">
                공방
              </div>
              <div className="text-base font-medium font_slideIn">
                공부하기 좋은 카페
              </div>
              <div className="text-base font-medium font_slideIn ">
                상세한 카페 리뷰
              </div>
            </div>
            <div className="w-full h-full">
              <div className="flex flex-col items-start justify-end w-full h-full pb-5">
                <img className="w-[150px] img_fadeIn" src={banner_item2} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  // Mobile
  if (isMobile)
    return (
      <>
        <div className="w-full h-60 bg-[#EFDCCB]">
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-start justify-end w-full h-full pb-8 pl-8 ">
              <div className="pt-1 pb-1 pl-2 pr-2 text-xs font-semibold text-white rounded-lg border-gongbang bg-gongbang font_slideIn">
                공부다방
              </div>
              <div className="mt-1 text-2xl font-bold text-black font_slideIn">
                공방
              </div>
              <div className="mb-[1px] mt-1 text-sm font-medium text-black font_slideIn">
                공부하기 좋은 카페
              </div>
              <div className="text-sm font-medium text-black font_slideIn">
                상세한 카페 리뷰
              </div>
            </div>
            <div className="relative flex items-center justify-center w-full h-full ">
              <div className="absolute -left-3 top-8 w-[100px] flex items-start h-[100px] rotate-12">
                <img className="w-[100px] img_fadeIn" src={banner_item1} />
              </div>
              <div className="absolute right-10 bottom-10 flex items-end w-[80px] h-[80px] -rotate-12">
                <img className="w-[80px] img_fadeIn" src={banner_item2} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  return <></>;
}
