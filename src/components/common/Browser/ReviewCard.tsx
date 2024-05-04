import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ReviewData, TypeCode } from "../../../types/type";
import Modal from "./Modal";
import Stars from "./Stars";

interface ReviewCardType {
  title: string;
  data: ReviewData[];
  type: number; // 1 : 통합리뷰 / 2: 필터리뷰
  isCreateModal: () => void;
  isReviewModal: () => void;
}

export default function ReviewCard({
  title,
  data,
  type,
  isCreateModal,
  isReviewModal,
}: ReviewCardType) {
  const [toggleReviewDetailModal, setToggleReviewDetailModal] = useState(false);
  const [reviewModalData, setReviewModalData] = useState<ReviewData>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const typeCode: TypeCode = { 1: "분위기", 2: "좌석", 3: "음료", 4: "콘센트" };
  const username = useSelector((state: RootState) => state.user.username);

  const handelReviewDetailModal = (modalData: ReviewData) => {
    setReviewModalData(modalData);
    setToggleReviewDetailModal(true);
  };

  const handleReviewModal = () => {
    setReviewModalData(undefined);
  };

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === data.length - 1 ? currentSlide : currentSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 0 : currentSlide - 1);
  };
  return (
    <>
      {" "}
      <div className="mt-5 mb-5 ">
        <div className="flex items-center justify-between mb-10">
          {title.length > 0 && (
            <div className="text-2xl font-semibold">📝 {title}</div>
          )}
          <div className="flex ">
            {username && type === 1 && (
              <div onClick={isCreateModal} className="text-base btn">
                리뷰 작성하기
              </div>
            )}
            {type === 1 && (
              <div
                className="ml-5 text-base cursor-pointer btn"
                onClick={isReviewModal}
              >
                모든 리뷰 보기
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <div className="w-full carousel carousel-center">
          <div className="space-x-4 carousel-item h-[350px] ">
            {data.map((data: ReviewData, i: number) => (
              <div
                key={i}
                onClick={() => handelReviewDetailModal(data)}
                className="h-full max-w-96"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                  transition: "transform 0.5s ease",
                }}
              >
                {/* Images */}
                <div className="mb-3">
                  {data.reviewimage_set ? (
                    <img
                      className="w-full rounded-2xl"
                      src={
                        process.env.REACT_APP_API_URL +
                        data.reviewimage_set[0].image
                      }
                      alt="Cafe"
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
                {/* <div>{data.id}</div> */}

                {/* Info */}
                <Stars score={data.score} size="small" />
                <div className="w-full mt-3 text-xl font-medium truncate ">
                  {data.title}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="p-3 text-sm font-medium badge badge-outline">
                    {typeCode[data.type]}
                  </div>
                  <div className="text-base">{data.name}</div>
                </div>
                <div></div>
              </div>
            ))}
          </div>
        </div>
        {data.length !== 0 && (
          <>
            <button
              className="absolute btn btn-circle -left-5 top-1/2"
              onClick={prevSlide}
            >
              ❮
            </button>
            <button
              className="absolute btn btn-circle -right-5 top-1/2"
              onClick={nextSlide}
            >
              ❯
            </button>
          </>
        )}
      </div>
      {reviewModalData && (
        <Modal close={handleReviewModal} data={reviewModalData} type={0} />
      )}
    </>
  );
}
