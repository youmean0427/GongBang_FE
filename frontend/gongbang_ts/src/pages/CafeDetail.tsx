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
// import Stars from "../components/common/Stars";
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

export default function CafeDetail() {
  let accessToken = localStorage.getItem("access_token");
  const { id } = useParams();
  const title = ["통합 리뷰", "분위기", "좌석", "음료", "콘센트"];
  const [filteredReviewOne, setFilteredReviewOne] = useState([]);
  const [filteredReviewTwo, setFilteredReviewTwo] = useState([]);
  const [filteredReviewThr, setFilteredReviewThr] = useState([]);
  const [filteredReviewFou, setFilteredReviewFou] = useState([]);
  const [nowImage, setNowImage] = useState();

  const [reviewModal, setReviewModal] = useState(false);
  const [reviewCreateModal, setReviewCreateModal] = useState(false);
  const [options, setOptions] = useState(["X", "X", "X", "X"]);

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["getCoffeeCafeDetail"],
    queryFn: () => getCoffeeCafeDetailAPI(id),
  });

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => userAPI(),
    enabled: !!localStorage.getItem("access_token"),
  });

  const handleNowImage = (x: any) => {
    setNowImage(x);
  };

  const isReviewModal = (x: any) => {
    setReviewModal(true);
  };
  const isReviewCreateMdoal = (x: any) => {
    setReviewCreateModal(true);
  };

  useEffect(() => {
    if (data) {
      setNowImage(data.coffeecafeimage_set[0].image);
      console.log(data.wifi);
      if (data.wifi) {
        options[0] = "O";
      }
      if (data.toilet) {
        options[1] = "O";
      }
      if (data.parking) {
        options[2] = "O";
      }
      console.log(options);
      const filteredOne = data.review_set.filter(
        (review: any) => review.type === 1
      );
      setFilteredReviewOne(filteredOne);
      const filteredTwo = data.review_set.filter(
        (review: any) => review.type === 2
      );
      setFilteredReviewTwo(filteredTwo);
      const filteredThr = data.review_set.filter(
        (review: any) => review.type === 3
      );
      setFilteredReviewThr(filteredThr);
      const filteredFou = data.review_set.filter(
        (review: any) => review.type === 4
      );
      setFilteredReviewFou(filteredFou);

      data.review_set.sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  }, [data]);

  if (isFetching && reviewCreateModal === false) return <></>;
  if (isLoading) return <></>;
  return (
    <>
      <div className="cafedetail">
        <div className="cafedetail-info">
          <div className="cafedetail-info-image">
            <div className="cafedetail-info-image-col">
              {data.coffeecafeimage_set.map((x: any, i: any) => (
                <div
                  key={i}
                  onClick={() => {
                    handleNowImage(x.image);
                  }}
                >
                  <img src={x.image} />
                </div>
              ))}
              {data.coffeecafeimage_set.length === 1 ? (
                <>
                  <div></div>
                  <div></div>
                </>
              ) : (
                <></>
              )}
              {data.coffeecafeimage_set.length === 2 ? (
                <>
                  <div></div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="cafedetail-info-image-main">
              <img src={nowImage} />
            </div>
          </div>

          <div className="cafedetail-info-info">
            <div className="cafedetail-total-score-cont">
              {/* <div className="cafedetail-info-total-score"> {data.total_score} </div> */}
              <div>{/* <Stars score={data.total_score} size={1} /> */}</div>
            </div>
            <div className="cafedetail-info-name"> {data.name} </div>
            <div className="cafedetail-info-address"> {data.address} </div>
            <div className="cafedetail-info-time"> {data.time} </div>
            {/* <div> {data.lat} </div>
                        <div> {data.lng} </div> */}
            <hr />
            <div className="cafedetail-info-con">편의시설</div>
            <div className="cafedetail-info-opt">
              <div className="cafedetail-info-opt-bet">
                <div className="cafedetail-info-opt-title">
                  <LuHome /> 분위기
                </div>
                <div className="cafedetail-info-opt-title">
                  <LuCoffee /> 음료
                </div>
              </div>
              <div className="cafedetail-info-opt-bet-star">
                <div className="cafedetail-info-opt-score">
                  {/* <Stars score={data.vibe} size={0} />{" "} */}
                </div>
                <div className="cafedetail-info-opt-score">
                  {/* <Stars score={data.coffee} size={0} /> */}
                </div>
              </div>

              <div className="cafedetail-info-opt-bet">
                <div className="cafedetail-info-opt-title">
                  <LuArmchair /> 좌석
                </div>
                <div className="cafedetail-info-opt-title">
                  <LuPlug /> 콘센트
                </div>
              </div>
              <div>
                <div className="cafedetail-info-opt-score">
                  {/* <Stars score={data.seat} size={0} /> */}
                </div>
                <div className="cafedetail-info-opt-score">
                  {/* <Stars score={data.plug} size={0} /> */}
                </div>
              </div>
            </div>
            <div className="cafedetail-info-opt">
              <div>
                <div className="cafedetail-info-opt-title">
                  <LuWifi /> 와이파이
                </div>
                <div className="cafedetail-info-opt-title">
                  <LuParkingSquare /> 주차
                </div>
              </div>
              <div>
                <div className="cafedetail-info-opt-score">{options[0]}</div>
                <div className="cafedetail-info-opt-score">{options[1]}</div>
              </div>
              <div>
                <div className="cafedetail-info-opt-title">
                  <LuTrash /> 화장실
                </div>
                <div className="cafedetail-info-opt-title">주차</div>
              </div>
              <div>
                <div className="cafedetail-info-opt-score">{options[2]}</div>
                <div className="cafedetail-info-opt-score">{options[3]}</div>
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

        <div>
          <CardContainer
            title={title[0]}
            data={data.review_set}
            type={2}
            userInfo={userInfo}
            isReviewModal={isReviewModal}
            isCreateModal={isReviewCreateMdoal}
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
          <CardContainer
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
          />
        </div>
      </div>

      {/* Modal */}
      {reviewModal ? (
        <div className="review-all-Modal">
          <div
            className="review-Modal-x"
            onClick={() => {
              setReviewModal(false);
            }}
          >
            <LuX size={30} />
          </div>
          <div className="review-all-Modal-List">
            <div className="review-all-Modal-content">
              <div>{/* <Review data={data} /> */}</div>
            </div>
          </div>
        </div>
      ) : null}
      {reviewCreateModal ? (
        <div className="review-all-Modal">
          <div
            className="review-Modal-x"
            onClick={() => {
              setReviewCreateModal(false);
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
