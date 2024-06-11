import { useState } from "react";
import { useRecoilState } from "recoil";
import banner_item1 from "../../../images/banner_item1.png";
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
      <div className="flex flex-col justify-center ml-5 mr-5 h-[450px] items-center pt-0 relative ">
        <div className="w-full">
          <div className="flex justify-center w-full mb-4 h-11">
            <img src={logoImage} />
          </div>
          <div className="h-[2px] bg-gray-200 rounded-lg mb-2"></div>
          <div className="w-full p-1 text-5xl font-bold text-center rounded-lg text-gongbang ">
            공부하기 좋은 카페
          </div>
          <div className="h-[2px] bg-gray-200 rounded-lg mt-2"></div>
          {/* <div className="text-lg font-semibold">공부 다방 | GongBang</div> */}
          <div className="mt-7">
            <div className="text-xl font-medium text-center">
              공방에서 "공부하기 좋은 카페"를 추천해주세요.
            </div>
            <div className="mt-1 text-xl font-medium text-center">
              💛 공방은 여러분의 카페 데이터가 필요합니다. 💛
            </div>
          </div>
          <div className="text-center mt-7">
            <div className="p-2 mb-3 text-xl font-semibold text-white bg-gongbang rounded-xl">
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
          {/* <div className="h-40 w">
          <img src={banner_item1} alt="banner1" />
        </div> */}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col justify-center ml-5 mr-5 h-[320px] items-center pt-0 relative ">
      <div className="w-full">
        <div className="flex justify-center w-full h-8 mb-4">
          <img src={logoImage} />
        </div>
        <div className="h-[2px] bg-gray-200 rounded-lg mb-2"></div>
        <div className="w-full p-1 text-3xl font-bold text-center rounded-lg text-gongbang ">
          공부하기 좋은 카페
        </div>
        <div className="h-[2px] bg-gray-200 rounded-lg mt-2"></div>
        {/* <div className="text-lg font-semibold">공부 다방 | GongBang</div> */}
        <div className="mt-3">
          <div className="text-base font-medium text-center">
            공방에서 "공부하기 좋은 카페"를 추천해주세요.
          </div>
          <div className="mt-1 text-base font-medium text-center">
            💛 공방은 카페 데이터가 필요합니다.💛
          </div>
        </div>
        <div className="mt-3 text-center">
          <div className="p-1 mb-2 text-lg font-semibold text-white bg-gongbang rounded-xl">
            로그인 → 마이페이지 → 카페 추천
          </div>
        </div>
      </div>
      <div className="absolute flex items-end justify-between w-full -bottom-10 h-[25px]">
        <div className="">
          <div className="flex mb-3">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handlePopupClose(1)}
              className="checkbox checkbox-sm checked:border-gongbang [--chkfg:white]  [--chkbg:theme(colors.gongbang)] "
            />
            <div className="ml-2 text-sm text-gray-500">
              오늘 하루 그만 보기
            </div>
          </div>
        </div>
        {/* <div className="h-40 w">
        <img src={banner_item1} alt="banner1" />
      </div> */}
      </div>
    </div>
  );
}
