import React, { useEffect, useState } from "react";
import "./Card.css";
import ItemsCarousel from "react-items-carousel";
import { useMutation, useQuery } from "react-query";
import { deleteReviewAPI, getCoffeeCafesAPI, userAPI } from "../../apis/api";
import { Link } from "react-router-dom";
// import Review from "../../pages/Reveiw";
// import ListContainer from "../list/ListContainer";
// import Stars from "../common/Stars";
import { LuX } from "react-icons/lu";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface CardData {
  title: string;
  data: any;
  type: number;
  chevronWidth?: number;
  userInfo?: number;
  isReviewModal?: any;
  isCreateModal?: any;
}

export default function CardContainer({
  title,
  data,
  type,
  chevronWidth,
  userInfo,
  isReviewModal,
  isCreateModal,
}: CardData) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isOpenReviewDetailModal, setIsOpenReviewDetailModal] = useState(false);
  const [reviewModalData, setReviewModalData] = useState("");

  const reviewDeleteMutation = useMutation(
    ["deleteReview"],
    (id: number) => deleteReviewAPI(id),
    {
      onSuccess: () => {
        window.location.reload();
      },
    }
  );
  const username = useSelector((state: RootState) => state.user.username);
  const handleDelete = (x: number) => {
    reviewDeleteMutation.mutate(x);
  };

  const handelReviewDetail = (x: string) => {
    setReviewModalData(x);
    setIsOpenReviewDetailModal(true);
  };

  const handleReviewModal = () => {
    setReviewModalData("");
  };

  if (type === 1)
    return (
      <>
        <div className="mt-12 mb-10" style={{ padding: `0 ${chevronWidth}px` }}>
          <div className="text-2xl mb-7">{title}</div>

          <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={4}
            gutter={20}
            leftChevron={<button>{"<"}</button>}
            rightChevron={<button>{">"}</button>}
            outsideChevron
            chevronWidth={chevronWidth}
          >
            {data.map((data: any) => (
              <Link
                to={`coffeecafe/${data.id}`}
                style={{ textDecoration: "none" }}
                key={data}
              >
                <div className="text-lg ">
                  <div className="mb-5 h-80">
                    {data.coffeecafeimage_set.length ? (
                      <img
                        className="w-full h-full bg-slate-950"
                        src={data.coffeecafeimage_set[0].image}
                        alt="Cafe"
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>

                  <div>{/* <Stars score={data.total_score} size={0} /> */}</div>
                  <div>{data.name}</div>
                  <div>{data.address}</div>
                </div>
              </Link>
            ))}
          </ItemsCarousel>
        </div>
      </>
    );

  return (
    <>
      <div className="cardcontainer" style={{ padding: `0 0px` }}>
        <div className="cardcontainer-title-container">
          <div className="cardcontainer-title">{title}</div>
          <div className="cardcontainer-title-container-review">
            {username ? (
              <div className="cardcontainer-review-create">
                <div onClick={isCreateModal}>리뷰 작성하기</div>
              </div>
            ) : (
              <div></div>
            )}
            {username ? (
              <div style={{ margin: "0 10px 0 10px" }}> | </div>
            ) : (
              <div></div>
            )}
            <div className="cardcontainer-review-all" onClick={isReviewModal}>
              모든 리뷰 보기
            </div>
          </div>
        </div>
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={4}
          gutter={20}
          leftChevron={<button>{"<"}</button>}
          rightChevron={<button>{">"}</button>}
          outsideChevron
          chevronWidth={chevronWidth}
        >
          {data.map((data: any, i: any) => (
            <>
              <div key={i} onClick={() => handelReviewDetail(data)}>
                <div className="cardcontainer-card-item">
                  {" "}
                  {data.reviewimage_set.length ? (
                    <img
                      className="cardcontainer-coffecafe-image"
                      src={data.reviewimage_set[0].image}
                      alt="Cafe"
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
                {/* <div>{data.id}</div> */}
                <div>{/* <Stars score={data.score} type={0} /> */}</div>
                <div className="cardcontaioner-data-title">{data.title}</div>
                <div>{data.name}</div>
                <div></div>
              </div>
            </>
          ))}
        </ItemsCarousel>
        {/* Modal */}
        <div>
          {reviewModalData ? (
            <div className="review-Modal">
              <div onClick={handleReviewModal}>
                <LuX size={30} />
              </div>
              <div className="review-Modal-List">
                <div>
                  {/* <ListContainer data={reviewModalData} userInfo={userInfo} /> */}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
