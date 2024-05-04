import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCoffeeCafeDetailAPI } from "../../apis/api";
import { useParams } from "react-router-dom";
import CardContainer from "../../components/common/Browser/CardContainer";

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
import { isBrowser } from "react-device-detect";
import ReviewCard from "../../components/common/Browser/ReviewCard";

interface CafeImageType {
  cafe: number;
  id: number;
  image: string;
}
export default function CafeDetail() {
  const { id } = useParams();
  const reviewTitle = ["통합 리뷰", "분위기", "좌석", "음료", "콘센트"];

  const [nowImage, setNowImage] = useState<string>();
  const [toggleReviewModal, setToggleReviewModal] = useState(false);
  const [toggleReviewCreateModal, setToggleReviewCreateModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const {
    isLoading,
    isFetching,
    data: coffecafeDetail,
  } = useQuery({
    queryKey: ["getCoffeeCafeDetail"],
    queryFn: () => getCoffeeCafeDetailAPI(id),
  });

  // const { data: userInfo } = useQuery({
  //   queryKey: ["userInfo"],
  //   queryFn: () => userAPI(),
  //   enabled: !!localStorage.getItem("access_token"),
  // });

  const handleNowImage = (image: string) => {
    setNowImage(image);
  };

  const handleReviewModal = () => {
    setToggleReviewModal(!toggleReviewModal);
  };

  const handleReviewCreateMdoal = () => {
    setToggleReviewCreateModal(!toggleReviewCreateModal);
  };

  useEffect(() => {
    if (coffecafeDetail) {
      setNowImage(coffecafeDetail.coffeecafeimage_set[0].image);
    }
    // Review 최신순 정렬
    // coffecafeDetail.review_set.sort(
    //   (a: any, b: any) =>
    //     new Date(b.date).getTime() - new Date(a.date).getTime()
    // );
  }, [coffecafeDetail]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [window.innerWidth]);

  if (isFetching && !toggleReviewCreateModal) return <>isFetching</>;
  if (isLoading) return <div>isLoading</div>;

  if (isBrowser)
    return (
      <>
        <div className="flex flex-row w-full pl-[10%] pr-[10%]">
          <div className="w-full">
            <div className="grid w-full grid-cols-1 xl:grid-cols-2 mt-14">
              {/* Images */}

              <div className="flex justify-start w-full h-full gap-2">
                <div className="flex flex-col justify-start gap-2 max-w-[130px] min-w-[50px] flex-1  ">
                  {coffecafeDetail.coffeecafeimage_set.map(
                    (x: CafeImageType, i: number) => (
                      <div
                        className=""
                        key={i}
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

                <div className=" flex-1 max-w-[550px] min-w-[400px] mr-5">
                  <img
                    className="object-cover w-full h-full rounded-2xl"
                    src={coffecafeDetail.coffeecafeimage_set[0].image}
                  />
                </div>
              </div>

              {/*  Info */}
              <div className="m-3">
                <div className="mb-3 text-3xl font-bold">
                  {coffecafeDetail.name}
                </div>
                <Stars score={coffecafeDetail.total_score} size="large" />
                <div className="mt-2 mb-1 text-lg">
                  {coffecafeDetail.address}
                </div>
                <div className="mb-4 text-lg"> {coffecafeDetail.time} </div>

                <div className="mt-5 mb-4 text-xl font-semibold cafedetail-info-con">
                  편의시설
                </div>
                <div className="grid grid-cols-2 text-lg gap-x-2">
                  <div className="flex items-center mt-1 mb-1">
                    <LuHome className="mr-2" />
                    <div className="w-20 ">분위기</div>
                    <div className="flex-1 min-w-[150px]">
                      <Stars score={coffecafeDetail.vibe} size="small" />
                    </div>
                  </div>

                  <div className="flex items-center mt-1 mb-1">
                    <LuCoffee className="mr-2" />
                    <div className="w-20 ">음료</div>
                    <div className="flex-1 min-w-[150px]">
                      <Stars score={coffecafeDetail.coffee} size="small" />
                    </div>
                  </div>
                  <div className="flex items-center justify-start w-full mt-1 mb-1 ">
                    <LuArmchair className="mr-2" />
                    <div className="w-20 ">좌석</div>
                    <div className="flex-1 min-w-[150px]">
                      <Stars score={coffecafeDetail.seat} size="small" />
                    </div>
                  </div>
                  <div className="flex items-center justify-start w-full mt-1 mb-1">
                    <LuPlug className="mr-2" />
                    <div className="w-20 ">콘센트</div>
                    <div className="flex-1 min-w-[150px]">
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
                      {coffecafeDetail.toliet ? "O" : "X"}
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
                  lat: 36.02625012993931,
                  lng: 129.36089331247362,
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
                    lat: 36.02625012993931,
                    lng: 129.36089331247362,
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
            <div className="mb-20 mt-36">
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
  return (
    <>
      <div className="flex flex-row w-full pl-5 pr-5">
        <div className="w-full">
          <div className="max-w-md mt-5 space-x-4 carousel carousel-center rounded-box">
            {coffecafeDetail.coffeecafeimage_set.map(
              (x: CafeImageType, i: number) => (
                <div
                  className="w-[90%] carousel-item"
                  key={i}
                  onClick={() => {
                    handleNowImage(process.env.REACT_APP_API_URL + x.image);
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
          <div className="grid items-center w-full grid-cols-1 mt-8 xl:grid-cols-3">
            {/* Images */}

            {/*  Info */}
            <div className="">
              <div className="mb-3 text-2xl font-bold">
                {coffecafeDetail.name}
              </div>
              <Stars score={coffecafeDetail.total_score} size="large" />
              <div className="mt-2 mb-1 text-base">
                {coffecafeDetail.address}
              </div>
              <div className="mb-4 text-base"> {coffecafeDetail.time} </div>
              {/* <div> {data.lat} </div>
                  <div> {data.lng} </div> */}
              <hr />
              <div className="mt-5 mb-4 text-lg font-semibold cafedetail-info-con">
                편의시설
              </div>
              <div className="grid grid-cols-1 text-lg">
                <div className="flex items-center mt-1 mb-1">
                  <LuHome className="mr-2" />
                  <div className="w-20 text-base">분위기</div>
                  <div className="flex items-center justify-center flex-1 w-full">
                    <Stars score={coffecafeDetail.vibe} size="small" />
                  </div>
                </div>

                <div className="flex items-center mt-1 mb-1">
                  <LuCoffee className="mr-2" />
                  <div className="w-20 text-base">음료</div>
                  <div className="flex items-center justify-center flex-1 w-full">
                    <Stars score={coffecafeDetail.coffee} size="small" />
                  </div>
                </div>
                <div className="flex items-center justify-start w-full mt-1 mb-1">
                  <LuArmchair className="mr-2" />
                  <div className="w-20 text-base">좌석</div>
                  <div className="flex items-center justify-center flex-1 w-full">
                    <Stars score={coffecafeDetail.seat} size="small" />
                  </div>
                </div>
                <div className="flex items-center justify-start w-full mt-1 mb-1">
                  <LuPlug className="mr-2" />
                  <div className="w-20 text-base">콘센트</div>
                  <div className="flex items-center justify-center flex-1 w-full">
                    <Stars score={coffecafeDetail.plug} size="small" />
                  </div>
                </div>
                {/* */}
                <div className="mt-2 mb-2"></div>
                <div className="mt-2 mb-2"></div>
                <div className="flex items-center justify-start w-full mt-2 mb-1">
                  <LuWifi className="mr-2 " />
                  <div className="w-20 text-base">와이파이</div>
                  <div className="flex-1 w-full text-center">
                    {coffecafeDetail.wifi ? "O" : "X"}
                  </div>
                </div>
                <div className="flex items-center justify-start w-full mt-1 mb-1">
                  <LuParkingSquare className="mr-2" />
                  <div className="w-20 text-base">주차</div>
                  <div className="flex-1 w-full text-center">
                    {coffecafeDetail.parking ? "O" : "X"}
                  </div>
                </div>
                <div className="flex items-center justify-start w-full mt-1 mb-1">
                  <LuTrash className="mr-2" />
                  <div className="w-20 text-base">화장실</div>
                  <div className="flex-1 w-full text-center">
                    {coffecafeDetail.toliet ? "O" : "X"}
                  </div>
                </div>
                {/* 추가 옵션 */}
                <div className="flex items-center"></div>
              </div>
            </div>
          </div>

          {/* 통합 리뷰 */}
          <div className="w-full mt-20 mb-20">
            <CardContainer
              title={reviewTitle[0]}
              data={coffecafeDetail.review_set}
              type={2}
              isReviewModal={handleReviewModal}
              isCreateModal={handleReviewCreateMdoal}
              chevronWidth={1}
            />
          </div>

          <div className="w-full mt-16 mb-16 h-96">
            <div className="mb-10 text-xl font-bold">📌 카페 위치</div>
            <Map
              center={{
                lat: 36.02625012993931,
                lng: 129.36089331247362,
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
                  lat: 36.02625012993931,
                  lng: 129.36089331247362,
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
          <div className="w-full mb-20 mt-36">
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
}
