import banner_item1 from "../../../images/banner_item1.png";
import banner_item2 from "../../../images/banner_item2.png";

export default function Popup() {
  return (
    <div className="flex flex-col justify-between ml-5 mr-5 h-[420px] ">
      <div className="w-full">
        <div className="w-full p-1 text-3xl font-semibold text-center rounded-lg">
          공부하기 좋은 카페
        </div>
        {/* <div className="text-lg font-semibold">공부 다방 | GongBang</div> */}
        <div className="mt-3">
          <div className="text-base font-medium">
            공방에서 "공부하기 좋은 카페"를 추천해주세요.
          </div>
          <div className="text-base font-medium">
            공방은 여러분의 데이터가 필요합니다.
          </div>
        </div>
        <div className="mt-3">
          <div className="text-base font-medium">
            브라우저 : 로그인 → 카페 추천
          </div>
          <div className="text-base font-medium">
            모바일 : 로그인 → 마이페이지 → 카페 추천
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full">
        <div className="w-40 h-40 ">
          <img src={banner_item1} alt="banner1" />
        </div>
      </div>
    </div>
  );
}
