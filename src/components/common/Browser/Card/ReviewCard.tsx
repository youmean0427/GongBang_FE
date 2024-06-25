import { useState, useEffect } from "react";
import { isBrowser } from "react-device-detect";
import { useSelector } from "react-redux";
import { useRecoilState } from "recoil";
import { RootState } from "../../../../redux/store";
import { ReviewData, TypeCode } from "../../../../types/type";
import Badge from "../Badge/Badge";
import Modal from "../Modal";
import Stars from "../Stars";
import { ModalDatailData } from "../../../../recoil/atom";

interface ReviewCardType {
  title: string;
  data: ReviewData[];
  type: number; // 1 : 통합리뷰 / 2: 필터리뷰
  isCreateModal: () => void;
  isReviewModal: () => void;
  isReviewDetailIdx?: (idx: number) => void;
}

export default function ReviewCard({
  title,
  data,
  type,
  isCreateModal,
  isReviewModal,
  isReviewDetailIdx,
}: ReviewCardType) {
  const [toggleReviewDetailModal] = useState(false);

  const [reviewData, setReviewData] =
    useRecoilState<ReviewData>(ModalDatailData);
  const [reviewModalData, setReviewModalData] = useState<ReviewData>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const username = useSelector((state: RootState) => state.user.username);

  const handelReviewDetailModal = (modalData: ReviewData) => {
    isReviewDetailIdx?.(modalData.id); // 옵셔널체이닝(?.)으로 정의되지 않을 가능성이 있는 개체 예외 처리
    setReviewData(modalData);
    document.body.style.overflow = "done";
  };

  const handleReviewModal = () => {
    setReviewModalData(undefined);
    document.body.style.overflow = "auto";
  };

  // * 이미지 버튼
  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === data.length - 1 ? currentSlide : currentSlide + 1
    );
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 0 : currentSlide - 1);
  };
  // *

  if (isBrowser)
    return (
      <>
        <div className="mt-5 mb-5 ">
          <div className="flex items-center justify-between mb-10">
            {title.length > 0 && (
              <div className="text-2xl font-semibold">{title}</div>
            )}
            <div className="flex ">
              {type === 1 && (
                <div
                  className="text-base cursor-pointer btn"
                  onClick={isReviewModal}
                >
                  모든 리뷰 보기
                </div>
              )}
              {username && type === 1 && (
                <div
                  onClick={isCreateModal}
                  className="ml-5 text-base text-white btn bg-gongbang"
                >
                  리뷰 작성하기
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <div className="w-full carousel carousel-start">
            <div className="space-x-5 carousel-item h-[380px] ">
              {data.length === 0 && (
                <div className="absolute flex items-center justify-center w-full h-[380px]   ">
                  <div className="text-lg font-medium text-gray-500">
                    리뷰가 없습니다.
                  </div>
                </div>
              )}
              {data &&
                data.map((data: ReviewData, i: number) => (
                  <div
                    key={data.id}
                    onClick={() => handelReviewDetailModal(data)}
                    className="h-full max-w-96"
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`,
                      transition: "transform 0.5s ease",
                    }}
                  >
                    {/* Images */}
                    <div className="mb-3 ">
                      {data.reviewimage_set.length > 0 ? (
                        <img
                          className=" h-[250px] w-[250px] object-cover rounded-2xl"
                          src={
                            process.env.REACT_APP_API_URL +
                            data.reviewimage_set[0].image
                          }
                          alt="Cafe"
                        />
                      ) : (
                        <div className="h-[250px] w-[250px] bg-gray-400  rounded-2xl"></div>
                      )}
                    </div>
                    {/* <div>{data.id}</div> */}

                    {/* Info */}
                    <Stars score={data.score} size="small" />
                    <div className="w-[250px] mt-2 text-xl font-medium truncate ">
                      {data.title}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge typeIdx={data.type} />
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
                className="absolute btn btn-circle -left-5 top-1/2 opacity-40 shadow-black hover:opacity-100"
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
          )}
        </div>
        {/* ReviewDetail Modal */}
        {reviewModalData && toggleReviewDetailModal && (
          <Modal close={handleReviewModal} data={reviewModalData} type={0} />
        )}
      </>
    );
  return (
    <>
      <div className="mt-5 mb-5 ">
        {title.length > 0 && (
          <div className="flex items-center justify-between ">
            {title.length > 0 && (
              <div className="text-xl font-semibold"> {title}</div>
            )}
            {type === 1 && (
              <div className="flex ">
                {type === 1 && (
                  <div
                    className="font-semibold text-black border-none cursor-pointer bg-slate-200 btn btn-sm"
                    onClick={isReviewModal}
                  >
                    모든 리뷰
                  </div>
                )}
                {username && type === 1 && (
                  <div
                    onClick={isCreateModal}
                    className="ml-2 font-semibold text-white border-none btn btn-sm bg-gongbang"
                  >
                    리뷰 작성
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="relative w-full">
        <div className="w-full carousel carousel-start">
          <div className="space-x-5 carousel-item h-[250px] ">
            {data.length === 0 && (
              <div className="absolute flex items-center justify-center w-full h-[300px]   ">
                <div className="text-base font-medium text-gray-500">
                  리뷰가 없습니다.
                </div>
              </div>
            )}
            {data.map((data: ReviewData, i: number) => (
              <div
                key={data.id}
                onClick={() => handelReviewDetailModal(data)}
                className="h-full max-w-96"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                  transition: "transform 0.5s ease",
                }}
              >
                {/* Images */}
                <div className="mb-3 ">
                  {data.reviewimage_set.length > 0 ? (
                    <img
                      className=" h-[150px] w-[150px] object-cover rounded-2xl"
                      src={
                        process.env.REACT_APP_API_URL +
                        data.reviewimage_set[0].image
                      }
                      alt="Cafe"
                    />
                  ) : (
                    <div className="h-[150px] w-[150px] bg-gray-400  rounded-2xl"></div>
                  )}
                </div>

                {/* Info */}
                <Stars score={data.score} size="small" />
                <div className="w-[150px] mt-1 text-base font-semibold truncate ">
                  {data.title}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <Badge typeIdx={data.type} />
                  <div className="text-xs ">{data.name}</div>
                </div>
                <div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {reviewModalData && (
        <Modal close={handleReviewModal} data={reviewModalData} type={0} />
      )}
    </>
  );
}
