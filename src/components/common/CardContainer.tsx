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
import { CardData } from "../../types/type";

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

  const handleDelete = (review_id: number) => {
    reviewDeleteMutation.mutate(review_id);
  };

  const handelReviewDetailModal = (data: string) => {
    setReviewModalData(data);
    setToggleReviewDetailModal(true);
  };

  const handleReviewModal = () => {
    setReviewModalData("");
  };

  // Cafe Card
  if (type === 1)
    return (
      <>
        <div className="mt-12 mb-10 lg:mr-72 lg:ml-72 md:ml-0 md:mr-0">
          <div className="text-2xl font-bold mb-7">{title}</div>
          <div className=" w-100">
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={4}
              gutter={10}
              leftChevron={<button>{"<"}</button>}
              rightChevron={
                <button className="w-full h-full hover:bg-slate-600">
                  {">"}
                </button>
              }
              // outsideChevron
              chevronWidth={100}
            >
              {data.map((data, i) => (
                <Link
                  to={`coffeecafe/${data.id}`}
                  style={{ textDecoration: "none" }}
                  key={i}
                >
                  <div className="text-lg ">
                    <div className="mb-5 h-80">
                      {data.coffeecafeimage_set.length ? (
                        <div className="w-full h-full">
                          <img
                            className="object-cover w-full h-full bg-slate-950"
                            src={data.coffeecafeimage_set[0].image}
                            alt="Cafe"
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>

                    <div className="">
                      <Stars score={data.total_score} size="small" />
                    </div>
                    <div className="text-xl font-bold">{data.name}</div>
                    <div className="text-base ">{data.address}</div>
                  </div>
                </Link>
              ))}
            </ItemsCarousel>
          </div>
        </div>
      </>
    );
  // Review Card
  return (
    <>
      <div className="mt-5 mb-5 lg:mr-72 lg:ml-72 md:ml-0 md:mr-0">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{title}</div>
          <div className="flex text-lg">
            <div onClick={isCreateModal}>리뷰 작성하기</div>
            <div> | </div>
            <div className="" onClick={isReviewModal}>
              모든 리뷰 보기
            </div>
          </div>
        </div>

        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={5}
          gutter={20}
          leftChevron={<button>{"<"}</button>}
          rightChevron={<button>{">"}</button>}
          outsideChevron
          chevronWidth={chevronWidth}
        >
          {data.map((data: any, i) => (
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
