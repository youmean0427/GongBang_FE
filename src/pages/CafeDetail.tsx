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

export default function CafeDetail() {
  const { id } = useParams();
  const reviewTitle = ["통합 리뷰", "분위기", "좌석", "음료", "콘센트"];

  const [nowImage, setNowImage] = useState();
  const [toggleReviewModal, setToggleReviewModal] = useState(false);
  const [toggleReviewCreateModal, setToggleReviewCreateModal] = useState(false);
  const [options, setOptions] = useState(["X", "X", "X", "X"]);

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

      if (coffecafeDetail.wifi) {
        options[0] = "O";
      }
      if (coffecafeDetail.toilet) {
        options[1] = "O";
      }
      if (coffecafeDetail.parking) {
        options[2] = "O";
      }

      // Review 최신순 정렬
      coffecafeDetail.review_set.sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  }, [coffecafeDetail]);

  if (isFetching && toggleReviewCreateModal === false) return <></>;
  if (isLoading) return <></>;
  return (
    <>
      <div className="">
        <div className="grid items-center grid-cols-2 mt-1">
          {/* Images */}
          <div className="flex items-center justify-center h-3/4">
            <div className="h-full">
              {coffecafeDetail.coffeecafeimage_set.map((x: any, i: any) => (
                <div
                  className="flex flex-col h-1/3"
                  key={i}
                  onClick={() => {
                    handleNowImage(x.image);
                  }}
                >
                  <img className="h-full" src={x.image} />
                </div>
              ))}
            </div>

            <div className="h-full">
              <img className="h-full" src={nowImage} />
            </div>
          </div>
          {/*  Info */}
          <div className="">
            <div className="mb-3 text-3xl"> {coffecafeDetail.name} </div>
            <Stars score={coffecafeDetail.total_score} size="large" />
            <div className="mt-2 mb-1 text-xl"> {coffecafeDetail.address} </div>
            <div className="mb-2 text-xl"> {coffecafeDetail.time} </div>
            {/* <div> {data.lat} </div>
                        <div> {data.lng} </div> */}
            <hr />
            <div className="mt-3 mb-2 text-xl cafedetail-info-con">
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
              <div className="flex items-center mt-3 mb-1">
                <LuWifi className="mr-2" />
                <div className="w-20">와이파이</div>
                <div>{options[0]}</div>
              </div>
              <div className="flex items-center mt-1 mb-1">
                <LuParkingSquare className="mr-2" />
                <div className="w-20">주차</div>
                <div>{options[1]}</div>
              </div>
              <div className="flex items-center mt-1 mb-1">
                <LuTrash className="mr-2" />
                <div className="w-20">화장실</div>
                <div>{options[2]}</div>
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
        <div>
          <CardContainer
            title={reviewTitle[0]}
            data={coffecafeDetail.review_set}
            type={2}
            isReviewModal={handleReviewModal}
            isCreateModal={handleReviewCreateMdoal}
            chevronWidth={100}
          />
          <div></div>
        </div>

        <div className="cafedetail-map-title">카페 위치</div>
        <div className="cafedetail-map">
          {/* <Map
            center={{
              lat: data.lat,
              lng: data.lng,
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
                lat: data.lat,
                lng: data.lng,
              }}
            ></MapMarker>
          </Map> */}
        </div>
        <hr />
        <div>
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
          <Modal close={handleReviewCreateMdoal} type={3} />
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
