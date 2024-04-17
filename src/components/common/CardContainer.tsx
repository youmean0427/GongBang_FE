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
import { LuChevronRightCircle } from "react-icons/lu";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Stars from "./Stars";
import ListContainer from "./ListContainer";
import Modal from "./Modal";
import { CardData } from "../../types/type";
import { LuChevronLeftCircle } from "react-icons/lu";
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
  const [coffeecafes, setCoffeecafes] = useState([...data]);
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

  const handelReviewDetailModal = (modalData: string) => {
    setReviewModalData(modalData);
    setToggleReviewDetailModal(true);
  };

  const handleReviewModal = () => {
    setReviewModalData("");
  };
  // Cafe Card
  console.log(coffeecafes);
  if (type === 1)
    return (
      <div className="w-full mt-12 mb-10 ">
        {/* <div className="element"> */}

        <div className="w-full">
          <div className="text-2xl font-bold mb-7">{title}</div>
          <div className="flex">
            <div className="w-full">
              <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={4}
                gutter={10}
                leftChevron={
                  <button className="h-full">
                    <LuChevronLeftCircle size={30} />
                  </button>
                }
                rightChevron={
                  <button className="h-full">
                    <LuChevronRightCircle size={30} />
                  </button>
                }
                // outsideChevron
                chevronWidth={100}
              >
                {coffeecafes.map((x, i) => (
                  <Link
                    to={`coffeecafe/${x.id}`}
                    style={{ textDecoration: "none" }}
                    key={i}
                  >
                    <div className="text-lg ">
                      <div className="mb-5 h-80">
                        {x.coffeecafeimage_set &&
                          x.coffeecafeimage_set.length > 0 && (
                            <div className="w-full h-full">
                              <img
                                className="object-cover w-full h-full rounded-2xl"
                                src={x.coffeecafeimage_set[0].image}
                                alt="Cafe"
                              />
                            </div>
                          )}
                      </div>

                      <div className="">
                        <Stars score={x.total_score} size="small" />
                      </div>
                      <div className="text-xl font-bold">{x.name}</div>
                      <div className="text-base ">{x.address}</div>
                    </div>
                  </Link>
                ))}
              </ItemsCarousel>
            </div>
          </div>
        </div>
      </div>
    );
  // Review Card
  return (
    <>
      <div className="mt-5 mb-5 ">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold mb-7">{title}</div>
          <div className="flex text-lg">
            {username && type == 2 ? (
              <div onClick={isCreateModal}>리뷰 작성하기 | </div>
            ) : (
              <div></div>
            )}
            {type == 2 && (
              <div className="" onClick={isReviewModal}>
                {" "}
                모든 리뷰 보기
              </div>
            )}
          </div>
        </div>

        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={4}
          gutter={20}
          leftChevron={
            <button className="h-full">
              <LuChevronLeftCircle size={30} />
            </button>
          }
          rightChevron={
            <button className="h-full">
              <LuChevronRightCircle size={30} />
            </button>
          }
          outsideChevron
          chevronWidth={chevronWidth}
        >
          {data.map((data: any, i: number) => (
            <div key={i} onClick={() => handelReviewDetailModal(data)}>
              {/* Images */}
              <div className="mb-3">
                {data.reviewimage_set.length ? (
                  <img
                    className="w-full rounded-2xl"
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
          ))}
        </ItemsCarousel>
        {!data.length && (
          <div className="flex items-center justify-center text-xl text-center h-80">
            <div>리뷰가 없습니다.</div>
          </div>
        )}
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
