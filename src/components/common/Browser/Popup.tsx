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

  // LocalStorage에 시간을 저장
  const handlePopupClose = (expireDays: number) => {
    setIsChecked(true);
    setTogglePopup(false);
    let expire = new Date();
    expire.setTime(expire.getTime() + expireDays * 24 * 60 * 60 * 1000);
    localStorage.setItem("popupTime", expire.getTime().toString());
  };

  if (isBrowser)
    return (
      <div className="flex flex-col justify-between ml-10 mr-5 h-[450px] items-center w-[400px] pt-0 relative ">
        <div className="flex flex-col items-center justify-between w-full">
          <div className="mb-10 w-60 h-60">
            <img src={stats_item} alt="banner1" />
          </div>
          <div className="flex flex-col items-center justify-start w-full h-full ">
            <div className="mb-2 text-2xl font-bold ">
              공부하기 좋은 카페 추천 하기
            </div>
            <div className="text-lg font-medium ">
              공방에서 공부하기 좋은 카페를 추천해주세요.
            </div>
            <div className="text-lg font-medium ">
              여러분의 카페 데이터가 필요합니다.
            </div>
            <div className="w-[350px] mt-5 p-[10px] text-lg font-semibold text-center text-white rounded-lg  bg-[#E7B98E]">
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
              <div
                className="ml-2 font-medium text-gray-500 cursor-pointer "
                onClick={() => handlePopupClose(1)}
              >
                오늘 하루 그만 보기
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col justify-between ml-7 mr-5 h-[340px] items-center pt-0 relative ">
      <div className="flex flex-col items-center w-full">
        <div className="mt-2 mb-7 w-44 h-44">
          <img src={stats_item} alt="banner1" />
        </div>
        <div className="flex flex-col items-center justify-start w-full h-full ">
          <div className="mb-2 text-xl font-bold ">
            공부하기 좋은 카페 추천 하기
          </div>
          <div className="text-sm font-semibold ">
            공방에서 공부하기 좋은 카페를 추천해주세요.
          </div>
          <div className="text-sm font-semibold ">
            여러분의 카페 데이터가 필요합니다.
          </div>
          <div className=" mt-4 pl-4 pr-4 pt-[8px] w-full pb-[8px] text-sm font-semibold text-center text-white rounded-lg  bg-[#E7B98E]">
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
            <div
              className=" cursor-pointer w-[100px] ml-2 text-xs font-medium text-gray-500"
              onClick={() => handlePopupClose(1)}
            >
              오늘 하루 그만 보기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
