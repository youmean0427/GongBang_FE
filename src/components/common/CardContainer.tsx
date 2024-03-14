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
import Stars from "./Stars";
import ListContainer from "./ListContainer";
import Modal from "./Modal";

interface CardData {
  title: string;
  data: any;
  type: number;
  chevronWidth?: number;

  isReviewModal?: any;
  isCreateModal?: any;
}

export default function CardContainer({
  title,
  data,
  type,
  chevronWidth,
  isReviewModal,
  isCreateModal,
}: CardData) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [toggleReviewDetailModal, setToggleReviewDetailModal] = useState(false);
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

  const handelReviewDetailModal = (x: any) => {
    setReviewModalData(x);
    setToggleReviewDetailModal(true);
  };

  const handleReviewModal = () => {
    setReviewModalData("");
  };

  if (type === 1)
    return (
      <>
        <div className="mt-12 mb-10" style={{ padding: `0 ${0}px` }}>
          <div className="text-2xl font-bold mb-7">{title}</div>

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

                  <div>
                    <Stars score={data.total_score} size="small" />
                  </div>
                  <div>{data.name}</div>
                  <div>{data.address}</div>
                </div>
              </Link>
            ))}
          </ItemsCarousel>
        </div>
      </>
    );
  // Review Card
  return (
    <>
      <div className="mt-5 mb-5" style={{ padding: `0 0px` }}>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{title}</div>
          <div className="">
            <div onClick={isCreateModal}>리뷰 작성하기 |</div>
            <div className="text-xl" onClick={isReviewModal}>
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
              <div key={i} onClick={() => handelReviewDetailModal(data)}>
                {/* Images */}
                <div className="mb-3">
                  {data.reviewimage_set.length ? (
                    <img
                      className=""
                      src={data.reviewimage_set[0].image}
                      alt="Cafe"
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
                {/* <div>{data.id}</div> */}

                {/* Info */}
                <Stars score={data.score} size="small" />
                <div className="text-xl font-bold">{data.title}</div>
                <div className="text-lg ">{data.name}</div>
                <div></div>
              </div>
            </>
          ))}
        </ItemsCarousel>

        {reviewModalData ? (
          <Modal close={handleReviewModal} data={reviewModalData} type={0} />
        ) : (
          <></>
        )}

        {/* Modal */}
        {/* <div>
          {reviewModalData ? (
            <div className="review-Modal">
              <div onClick={handleReviewModal}>
               
              </div>
              <div className="review-Modal-List">
                <div>
                  <ListContainer data={reviewModalData} />
                </div>
              </div>
            </div>
          ) : null}
        </div> */}
      </div>
    </>
  );
}
