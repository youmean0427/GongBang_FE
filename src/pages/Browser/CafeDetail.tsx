import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCoffeeCafeDetailAPI } from "../../apis/api";
import { useParams } from "react-router-dom";
import {
  LuHome,
  LuArmchair,
  LuCoffee,
  LuPlug,
  LuWifi,
  LuParkingSquare,
  LuTrash,
} from "react-icons/lu";
import Stars from "../../components/common/Browser/Stars";
import Modal from "../../components/common/Browser/Modal";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import FilterContainer from "../../components/common/Browser/FilterContainer";
import cafeMarker from "../../../src/images/cafe_marker.png";
import { isBrowser, isMobile } from "react-device-detect";
import ReviewCard from "../../components/common/Browser/Card/ReviewCard";

interface CafeImageType {
  cafe: number;
  id: number;
  image: string;
}
export default function CafeDetail() {
  const { id } = useParams();
  const reviewTitle = ["통합 리뷰", "분위기", "좌석", "음료", "콘센트"];

  const [nowImage, setNowImage] = useState<string>("");
  const [toggleReviewModal, setToggleReviewModal] = useState(false);
  const [toggleReviewCreateModal, setToggleReviewCreateModal] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === coffecafeDetail.coffeecafeimage_set.length - 1
        ? 0
        : currentSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 0 : currentSlide - 1);
  };
  const {
    isLoading,
    isFetching,
    data: coffecafeDetail,
  } = useQuery({
    queryKey: ["getCoffeeCafeDetail"],
    queryFn: () => getCoffeeCafeDetailAPI(id),
  });

  const handleNowImage = (image: string) => {
    setNowImage(image);
  };

  const handleReviewModal = () => {
    setToggleReviewModal(!toggleReviewModal);
    document.body.style.overflow = "auto";
  };

  const handleReviewCreateMdoal = () => {
    setToggleReviewCreateModal(!toggleReviewCreateModal);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isFetching && !toggleReviewCreateModal) return <></>;
  if (isLoading) return <></>;

  if (isBrowser)
    return (
      <>
        <div className="flex flex-row w-full    pl-[10%] pr-[10%]">
          <div className="w-full">
            <div className="grid w-full grid-cols-1 xl:grid-cols-2 mt-14">
              {/* Images */}
              <div className="relative w-full xl:max-w-[700px]">
                <div className="  xl:h-[500px] h-[400px]   w-full carousel carousel-center">
                  {coffecafeDetail.coffeecafeimage_set.map(
                    (x: CafeImageType, i: number) => (
                      <div
                        className="w-full  xl:h-[500px] h-[400px] carousel-item"
                        key={i}
                        style={{
                          transform: `translateX(-${currentSlide * 100}%)`,
                          transition: "transform 0.5s ease",
                        }}
                        onClick={() => {
                          handleNowImage(
                            process.env.REACT_APP_API_URL + x.image
                          );
                        }}
                      >
                        <img
                          className="object-cover w-full h-full rounded-xl"
                          src={process.env.REACT_APP_API_URL + x.image}
                        />
                      </div>
                    )
                  )}
                  <>
                    <button
                      className="absolute opacity-40 shadow-black btn btn-circle hover:opacity-100 -left-5 top-1/2 "
                      onClick={prevSlide}
                    >
                      ❮
                    </button>
                    <button
                      className="absolute btn btn-circle -right-5 top-1/2 opacity-40 shadow-black hover:opacity-100"
                      onClick={nextSlide}
                    >
                      ❯
                    </button>
                  </>
                </div>
              </div>

              {/*  Info */}
              <div className="mt-8 xl:m-8 ">
                <div className="mb-4 text-3xl font-bold">
                  {coffecafeDetail.name}
                </div>
                <Stars score={coffecafeDetail.total_score} size="large" />
                <div className="mt-4 mb-1 text-lg">
                  {coffecafeDetail.address}
                </div>
                <div className="mb-4 text-lg"> {coffecafeDetail.time} </div>

                <hr />

                <div className="mt-5 mb-4 text-xl font-semibold cafedetail-info-con">
                  편의시설
                </div>
                <div className="grid grid-cols-2 text-lg gap-x-2">
                  <div className="flex items-center mt-1 mb-1">
                    <LuHome className="mr-2" />
                    <div className="w-20 ">분위기</div>
                    <div className="flex-1 min-w-[150px] max-xl:flex max-xl:justify-center  ">
                      <Stars score={coffecafeDetail.vibe} size="small" />
                    </div>
                  </div>

                  <div className="flex items-center mt-1 mb-1">
                    <LuCoffee className="mr-2" />
                    <div className="w-20 ">음료</div>
                    <div className="flex-1 min-w-[150px]  max-xl:flex max-xl:justify-center">
                      <Stars score={coffecafeDetail.coffee} size="small" />
                    </div>
                  </div>
                  <div className="flex items-center justify-start w-full mt-1 mb-1 ">
                    <LuArmchair className="mr-2" />
                    <div className="w-20 ">좌석</div>
                    <div className="flex-1 min-w-[150px]  max-xl:flex max-xl:justify-center">
                      <Stars score={coffecafeDetail.seat} size="small" />
                    </div>
                  </div>
                  <div className="flex items-center justify-start w-full mt-1 mb-1">
                    <LuPlug className="mr-2" />
                    <div className="w-20 ">콘센트</div>
                    <div className="flex-1 min-w-[150px]  max-xl:flex max-xl:justify-center">
                      <Stars score={coffecafeDetail.plug} size="small" />
                    </div>
                  </div>
                  {/* */}
                  <div className="mt-2 mb-2"></div>
                  <div className="mt-2 mb-2"></div>
                  <div className="flex items-center justify-start w-full mt-3 mb-1">
                    <LuWifi className="mr-2 " />
                    <div className="w-20">와이파이</div>
                    <div className="flex-1 w-full text-center">
                      {coffecafeDetail.wifi ? "O" : "X"}
                    </div>
                  </div>
                  <div className="flex items-center justify-start w-full mt-3 mb-1">
                    <LuParkingSquare className="mr-2" />
                    <div className="w-20">주차</div>
                    <div className="flex-1 w-full text-center">
                      {coffecafeDetail.parking ? "O" : "X"}
                    </div>
                  </div>
                  <div className="flex items-center justify-start w-full mt-1 mb-1">
                    <LuTrash className="mr-2" />
                    <div className="w-20">화장실</div>
                    <div className="flex-1 w-full text-center">
                      {coffecafeDetail.toilet ? "O" : "X"}
                    </div>
                  </div>
                  {/* 추가 옵션 */}
                  <div className="flex items-center"></div>
                </div>
              </div>
            </div>

            {/* 통합 리뷰 */}
            <div className="mt-20 mb-20">
              <ReviewCard
                type={1}
                title={reviewTitle[0]}
                data={coffecafeDetail.review_set}
                isReviewModal={handleReviewModal}
                isCreateModal={handleReviewCreateMdoal}
              />
            </div>

            <div className="w-full mt-16 mb-16 h-96">
              <div className="mb-10 text-2xl font-semibold">📌 카페 위치</div>
              <Map
                center={{
                  lat: coffecafeDetail.lat,
                  lng: coffecafeDetail.lng,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                level={3}
                draggable={false}
              >
                <MapMarker
                  position={{
                    lat: coffecafeDetail.lat,
                    lng: coffecafeDetail.lng,
                  }}
                  image={{
                    src: cafeMarker,
                    size: {
                      width: 90,
                      height: 100,
                    },
                  }}
                ></MapMarker>
              </Map>
            </div>
            {/* 리뷰 필터 */}
            <div className="mt-20 mb-20">
              <FilterContainer data={coffecafeDetail.review_set} />
            </div>
          </div>
        </div>

        {/* Modal */}
        {toggleReviewModal && (
          <Modal close={handleReviewModal} data={coffecafeDetail} type={1} />
        )}
        {toggleReviewCreateModal && (
          <Modal close={handleReviewCreateMdoal} type={2} />
        )}
      </>
    );

  // Mobile
  if (isMobile)
    return (
      <>
        <div className="flex flex-row w-full pl-[5%] pr-[5%]">
          <div className="w-full">
            <div className="grid w-full grid-cols-1 mt-10">
              {/*  Info */}
              <div className="mb-5">
                <div className="mb-2 text-2xl font-bold">
                  {coffecafeDetail.name}
                </div>
                <Stars score={coffecafeDetail.total_score} size="large" />
                <div className="mt-2 mb-1 text-base font-medium ">
                  {coffecafeDetail.address}
                </div>
                <div className="mb-5 text-base font-medium ">
                  {" "}
                  {coffecafeDetail.time}{" "}
                </div>

                <div className=" h-[300px]   w-full carousel carousel-center">
                  {coffecafeDetail.coffeecafeimage_set.map(
                    (x: CafeImageType, i: number) => (
                      <div
                        className="w-full  h-[300px] carousel-item"
                        key={i}
                        style={{
                          transform: `translateX(-${currentSlide * 100}%)`,
                          transition: "transform 0.5s ease",
                        }}
                        onClick={() => {
                          handleNowImage(
                            process.env.REACT_APP_API_URL + x.image
                          );
                        }}
                      >
                        <img
                          className="object-cover w-full h-full rounded-xl"
                          src={process.env.REACT_APP_API_URL + x.image}
                        />
                      </div>
                    )
                  )}
                </div>
                <div className="mt-5 mb-4 text-xl font-semibold cafedetail-info-con">
                  편의시설
                </div>
                <div className="grid grid-cols-1 text-base font-medium gap-x-1 ">
                  <div className="flex items-center mt-1 mb-1">
                    <LuHome className="mr-2" />
                    <div className="w-20 ">분위기</div>
                    <div className="flex-1 min-w-[150px] max-xl:flex max-xl:justify-center  ">
                      <Stars score={coffecafeDetail.vibe} size="small" />
                    </div>
                  </div>

                  <div className="flex items-center mt-1 mb-1">
                    <LuCoffee className="mr-2" />
                    <div className="w-20 ">음료</div>
                    <div className="flex-1 min-w-[150px]  max-xl:flex max-xl:justify-center">
                      <Stars score={coffecafeDetail.coffee} size="small" />
                    </div>
                  </div>
                  <div className="flex items-center justify-start w-full mt-1 mb-1 ">
                    <LuArmchair className="mr-2" />
                    <div className="w-20 ">좌석</div>
                    <div className="flex-1 min-w-[150px]  max-xl:flex max-xl:justify-center">
                      <Stars score={coffecafeDetail.seat} size="small" />
                    </div>
                  </div>
                  <div className="flex items-center justify-start w-full mt-1 mb-1">
                    <LuPlug className="mr-2" />
                    <div className="w-20 ">콘센트</div>
                    <div className="flex-1 min-w-[150px]  max-xl:flex max-xl:justify-center">
                      <Stars score={coffecafeDetail.plug} size="small" />
                    </div>
                  </div>
                  {/* */}
                  <div className="mt-1 mb-1"></div>
                  <div className="flex items-center justify-start w-full mt-3 mb-1">
                    <LuWifi className="mr-2 " />
                    <div className="w-20">와이파이</div>
                    <div className="flex-1 w-full text-center">
                      {coffecafeDetail.wifi ? "O" : "X"}
                    </div>
                  </div>
                  <div className="flex items-center justify-start w-full mt-1 mb-1">
                    <LuParkingSquare className="mr-2" />
                    <div className="w-20">주차</div>
                    <div className="flex-1 w-full text-center">
                      {coffecafeDetail.parking ? "O" : "X"}
                    </div>
                  </div>
                  <div className="flex items-center justify-start w-full mt-1 mb-1">
                    <LuTrash className="mr-2" />
                    <div className="w-20">화장실</div>
                    <div className="flex-1 w-full text-center">
                      {coffecafeDetail.toilet ? "O" : "X"}
                    </div>
                  </div>
                  {/* 추가 옵션 */}
                  <div className="flex items-center"></div>
                </div>
              </div>
            </div>

            {/* 통합 리뷰 */}
            <div className="mt-16 mb-16">
              <ReviewCard
                type={1}
                title={reviewTitle[0]}
                data={coffecafeDetail.review_set}
                isReviewModal={handleReviewModal}
                isCreateModal={handleReviewCreateMdoal}
              />
            </div>

            <div className="w-full mt-16 mb-16 h-96">
              <div className="mb-10 text-xl font-bold">📌 카페 위치</div>
              <Map
                center={{
                  lat: coffecafeDetail.lat,
                  lng: coffecafeDetail.lng,
                }}
                style={{
                  width: "100%",
                  height: "80%",
                }}
                level={4}
                draggable={false}
              >
                <MapMarker
                  position={{
                    lat: coffecafeDetail.lat,
                    lng: coffecafeDetail.lng,
                  }}
                  image={{
                    src: cafeMarker,
                    size: {
                      width: 60,
                      height: 70,
                    },
                  }}
                ></MapMarker>
              </Map>
            </div>
            {/* 리뷰 필터 */}
            <div className="mt-16 mb-16">
              <FilterContainer data={coffecafeDetail.review_set} />
            </div>
          </div>
        </div>

        {/* Modal */}
        {toggleReviewModal && (
          <Modal close={handleReviewModal} data={coffecafeDetail} type={1} />
        )}
        {toggleReviewCreateModal && (
          <Modal close={handleReviewCreateMdoal} type={2} />
        )}
      </>
    );
  return <></>;
}
