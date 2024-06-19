import { useState } from "react";
import { useRecoilState } from "recoil";
import stats_item from "../../../images/stars_item.png";
import banner_item2 from "../../../images/banner_item2.png";
import { PopupHandle } from "../../../recoil/atom";
import logoImage from "../../../images/gongbang_logo.png";
import { isBrowser } from "react-device-detect";
export default function Popup() {
  const [isChecked, setIsChecked] = useState(false);
  const [togglePopup, setTogglePopup] = useRecoilState(PopupHandle);
  const handlePopupClose = (expireDays: number) => {
    setIsChecked(true);
    setTogglePopup(false);
    let expire = new Date();
    expire.setTime(expire.getTime() + expireDays * 24 * 60 * 60 * 1000);
    localStorage.setItem("popupTime", expire.getTime().toString());
  };
  if (isBrowser)
    return (
      <div className="flex flex-col justify-between ml-10 mr-5 h-[450px] items-center pt-0 relative ">
        <div className="w-full">
          <div className="flex flex-col items-start justify-start w-full h-full ">
            <div className="p-3 text-base font-medium text-white badge border-[#E7B98E] bg-[#E7B98E] ">
              공부다방
            </div>
            <div className="mt-3 mb-3 text-4xl font-semibold ">공방</div>
            <div className="text-lg font-medium ">
              <span>공방에서 </span>{" "}
              <span className=" text-amber-700">"공부하기 좋은 카페"</span>
              <span>를 추천해주세요!</span>
            </div>
            <div className="text-lg font-medium ">
              공방은 여러분의{" "}
              <span className="text-amber-700">카페 정보가 필요합니다!</span>
            </div>
            <div className="w-[350px] mt-5 p-1 text-lg font-semibold text-center text-white rounded-lg  bg-[#E7B98E]">
              로그인 → 상단 메뉴 → 카페 추천
            </div>
          </div>
        </div>

        <div className="absolute flex items-end justify-between w-full -bottom-5 ">
          <div className="">
            <div className="flex mb-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handlePopupClose(1)}
                className="checkbox checked:border-gongbang [--chkfg:white]  [--chkbg:theme(colors.gongbang)] "
              />
              <div className="ml-2 font-medium text-gray-500">
                오늘 하루 그만 보기
              </div>
            </div>
          </div>
          <div className="mr-5 w-52 h-52">
            <img src={stats_item} alt="banner1" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col justify-between ml-7 mr-5 h-[340px] items-center pt-0 relative ">
      <div className="w-full">
        <div className="flex flex-col items-start justify-start w-full h-full ">
          <div className="pt-1 pb-1 pl-2 pr-2 text-xs font-medium text-white  rounded-lg  border-[#E7B98E] bg-[#E7B98E] ">
            공부다방
          </div>

          <div className="mt-2 mb-2 text-2xl font-bold ">공방</div>
          <div className="text-sm font-medium ">
            <span></span>
            <span className=" text-amber-700">"공부하기 좋은 카페"</span>
            <span>를 추천해주세요!</span>
          </div>
          <div className="text-sm font-medium ">
            여러분의
            <span className="text-amber-700"> 카페 정보가 필요합니다!</span>
          </div>
          <div className=" mt-4 pl-4 pr-4 pt-[5px] pb-[5px] text-sm font-semibold text-center text-white rounded-lg  bg-[#E7B98E]">
            로그인 → 마이페이지 → 카페추천
          </div>
        </div>
      </div>

      <div className="absolute flex items-end justify-between w-full -bottom-5 ">
        <div className="">
          <div className="flex mb-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handlePopupClose(1)}
              className="checkbox checkbox-xs checked:border-gongbang [--chkfg:white]  [--chkbg:theme(colors.gongbang)] "
            />
            <div className="w-[100px] ml-2 text-xs font-medium text-gray-500">
              오늘 하루 그만 보기
            </div>
          </div>
        </div>
        <div className="mr-5 w-36 h-36">
          <img src={stats_item} alt="banner1" />
        </div>
      </div>
    </div>
  );
}
