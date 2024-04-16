import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  getCoffeeCafeDetailAPI,
  getReviewDetailAPI,
  userAPI,
} from "../apis/api";
import { deleteReviewAPI } from "../apis/api";
import { Link, useParams } from "react-router-dom";
// import "./CafeDetail.css";
import CardContainer from "../components/common/CardContainer";
// import { Circle, Map, MapMarker } from "react-kakao-maps-sdk";
import fullStar from "../images/full_star.png";
// import ListContainer from "../components/list/ListContainer";
// import Review from "./Reveiw";
// import ReviewCreate from "./ReviewCreate";
import { LuX } from "react-icons/lu";

import {
  LuHome,
  LuArmchair,
  LuCoffee,
  LuPlug,
  LuWifi,
  LuParkingSquare,
  LuTrash,
} from "react-icons/lu";
import Stars from "../components/common/Stars";
import Review from "./Reveiw";
import Modal from "../components/common/Modal";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { ReviewData } from "../types/type";

export default function CafeDetail() {
  const { id } = useParams();
  const reviewTitle = ["통합 리뷰", "분위기", "좌석", "음료", "콘센트"];

  const [nowImage, setNowImage] = useState();
  const [toggleReviewModal, setToggleReviewModal] = useState(false);
  const [toggleReviewCreateModal, setToggleReviewCreateModal] = useState(false);

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

  const handleNowImage = (image: any) => {
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

      // Review 최신순 정렬
      // coffecafeDetail.review_set.sort(
      //   (a: any, b: any) =>
      //     new Date(b.date).getTime() - new Date(a.date).getTime()
      // );
    }
  }, [coffecafeDetail]);

  // console.log(coffecafeDetail);
  // if (isFetching) return <></>;
  if (isLoading) return <></>;
  return (
    <>
      <div className="flex flex-row w-full">
        <div className="w-1/4"></div>
        <div className="">
          <div className="grid items-center grid-cols-2 mt-14 w-[1280px]">
            {/* Images */}
            <div className="flex items-center justify-center h-full">
              <div className="h-full">
                {coffecafeDetail.coffeecafeimage_set.map(
                  (x: any, i: number) => (
                    <div
                      className="flex flex-col mr-5 h-1/3"
                      key={i}
                      onClick={() => {
                        handleNowImage(x.image);
                      }}
                    >
                      <img className="h-full rounded-xl" src={x.image} />
                    </div>
                  )
                )}
              </div>

              <div className="h-full">
                <img className="h-full rounded-2xl" src={nowImage} />
              </div>
            </div>
            {/*  Info */}
            <div className="">
              <div className="mb-3 text-3xl font-bold">
                {coffecafeDetail.name}
              </div>
              <Stars score={coffecafeDetail.total_score} size="large" />
              <div className="mt-2 mb-1 text-xl">
                {" "}
                {coffecafeDetail.address}{" "}
              </div>
              <div className="mb-4 text-xl"> {coffecafeDetail.time} </div>
              {/* <div> {data.lat} </div>
                        <div> {data.lng} </div> */}
              <hr />
              <div className="mt-4 mb-3 text-xl cafedetail-info-con">
                편의시설
              </div>
              <div className="grid grid-cols-2 text-lg">
                <div className="flex items-center mt-1 mb-1">
                  <LuHome className="mr-2" />
                  <div className="w-20 ">분위기</div>
                  <Stars score={coffecafeDetail.vibe} size="small" />
                </div>

                <div className="flex items-center mt-1 mb-1">
                  <LuCoffee className="mr-2" />
                  <div className="w-20 ">음료</div>
                  <Stars score={coffecafeDetail.coffee} size="small" />
                </div>
                <div className="flex items-center mt-1 mb-1">
                  <LuArmchair className="mr-2" />
                  <div className="w-20 ">좌석</div>
                  <Stars score={coffecafeDetail.seat} size="small" />
                </div>
                <div className="flex items-center mt-1 mb-1">
                  <LuPlug className="mr-2" />
                  <div className="w-20 ">콘센트</div>
                  <Stars score={coffecafeDetail.plug} size="small" />
                </div>
                <div className="mt-1 mb-1"></div>
                <div className="mt-1 mb-1"></div>
                <div className="flex items-center mt-3 mb-1">
                  <LuWifi className="mr-2" />
                  <div className="w-20">와이파이</div>
                  <div>{coffecafeDetail.wifi ? "O" : "X"}</div>
                </div>
                <div className="flex items-center mt-1 mb-1">
                  <LuParkingSquare className="mr-2" />
                  <div className="w-20">주차</div>
                  <div>{coffecafeDetail.parking ? "O" : "X"}</div>
                </div>
                <div className="flex items-center mt-1 mb-1">
                  <LuTrash className="mr-2" />
                  <div className="w-20">화장실</div>
                  <div>{coffecafeDetail.toliet ? "O" : "X"}</div>
                </div>
                <div className="flex items-center">
                  {/* <div>주차</div> */}
                  {/* <div>{options[3]}</div> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div> {data.coffeecafeimage_set.map((x, index) => (
                    <div key = {index}>
                        <img src = {x.image}/>
                    </div>
                ))} </div> */}

          <div></div>
          {/* 통합 리뷰 */}

          <div className="mt-20 mb-20">
            <CardContainer
              title={reviewTitle[0]}
              data={coffecafeDetail.review_set}
              type={2}
              isReviewModal={handleReviewModal}
              isCreateModal={handleReviewCreateMdoal}
              chevronWidth={100}
            />{" "}
          </div>

          {/* <div className="text-2xl font-bold mb-7 lg:mr-72 lg:ml-72 md:ml-0 md:mr-0">
          {" "}
          카페 위치
        </div> */}

          <div className="w-full mt-16 mb-16 h-96">
            <div className="mb-10 text-2xl font-bold">카페 위치</div>
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
              ></MapMarker>
            </Map>
          </div>
          {/* 분위기 리뷰 */}
          <div className="mt-20">
            {/* {vibeReviewArr && (
              <CardContainer
                title={reviewTitle[1]}
                data={coffecafeDetail.review_set}
                type={2}
                isReviewModal={handleReviewModal}
                isCreateModal={handleReviewCreateMdoal}
                chevronWidth={100}
              />
            )} */}
            {/* <CardContainer
            title={title[1]}
            data={filteredReviewOne}
            type={2}
            userInfo={userInfo}
          />
          <CardContainer
            title={title[2]}
            data={filteredReviewTwo}
            type={2}
            userInfo={userInfo}
          />
          <CardContainer
            title={title[3]}
            data={filteredReviewThr}
            type={2}
            userInfo={userInfo}
          />

          <CardContainer
            title={title[4]}
            data={filteredReviewFou}
            type={2}
            userInfo={userInfo}
          /> */}
          </div>
        </div>
        <div className="w-1/4"></div>
      </div>
      {/* Modal */}
      {toggleReviewModal ? (
        <div>
          {" "}
          <Modal close={handleReviewModal} data={coffecafeDetail} type={1} />
        </div>
      ) : (
        <></>
      )}
      {toggleReviewCreateModal ? (
        <div>
          <Modal close={handleReviewCreateMdoal} type={2} />
        </div>
      ) : (
        <></>
      )}

      {/* {toggleReviewModal ? (
        <div className="review-all-Modal">
          <div
            className="review-Modal-x"
            onClick={() => {
              setToggleReviewModal(false);
            }}
          >
            <LuX size={30} />
          </div>
          <div className="review-all-Modal-List">
            <div className="review-all-Modal-content">
              <div></div>
            </div>
          </div>
        </div>
      ) : null} */}
      {toggleReviewCreateModal ? (
        <div className="review-all-Modal">
          <div
            className="review-Modal-x"
            onClick={() => {
              setToggleReviewCreateModal(false);
            }}
          >
            <LuX size={30} />
          </div>
          <div className="review-all-Modal-List">
            <div className="review-all-Modal-content">
              <div>
                {/* <ReviewCreate coffeeCafe={data} userInfo={userInfo} /> */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
