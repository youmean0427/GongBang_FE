import { useEffect, useState } from "react";
import { deleteReviewAPI, getCoffeeCafeDetailAPI } from "../../../../apis/api";
import { useMutation, useQuery } from "react-query";
import Stars from "../Stars";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { ReveiwImageData, ReviewData, TypeCode } from "../../../../types/type";
import Badge from "../Badge/Badge";
import { isBrowser, isMobile } from "react-device-detect";
import Modal from "../Modal";
import {
  ModalDetailDataInProfile,
  ModealDetailDataInProfileBool,
} from "../../../../recoil/atom";
import { useRecoilState } from "recoil";

interface ListContainer {
  data: ReviewData;
  type?: number;
}

export default function ListContainer({ type, data }: ListContainer) {
  const typeCode: TypeCode = { 1: "분위기", 2: "좌석", 3: "음료", 4: "콘센트" };
  const [cafeId, setCafeId] = useState();
  const [cafeName, setCafeName] = useState("");
  const [images, setImages] = useState<ReveiwImageData[]>([]);
  const userId = useSelector((state: RootState) => state.user.user_id);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOpenReviewUpdateModal, setIsOpenReviewUpdateModal] = useState(false);

  useEffect(() => {
    if (data.reviewimage_set) {
      data.reviewimage_set.map((x: ReveiwImageData) => {
        setImages([...images, x]);
      });
    }
  }, []);

  const {
    isLoading,
    isFetching,
    data: cafeData,
  } = useQuery({
    queryKey: ["listCafeData"],
    queryFn: () => getCoffeeCafeDetailAPI(data.cafe),
    onSuccess: (x) => {
      // Rerendering Issue
      setCafeId(x.id);
      setCafeName(x.name);
    },
  });

  const reviewDeleteMutation = useMutation(
    ["deleteReview"],
    (x: number) => deleteReviewAPI(x),
    {
      onSuccess: () => {
        window.location.reload();
      },
    }
  );
  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === data.reviewimage_set.length - 1 ? 0 : currentSlide + 1
    );
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 0 : currentSlide - 1);
  };

  const handleDelete = (review_id: number) => {
    var deleteConfirm = window.confirm("리뷰를 삭제합니다.");
    if (deleteConfirm) {
      reviewDeleteMutation.mutate(review_id);
    }
  };

  const hadleUpdateModal = (data: ReviewData) => {
    setIsOpenReviewUpdateModal(!isOpenReviewUpdateModal);
  };

  // type 2 -> Profile
  if (type === 2 && isLoading)
    if (isMobile) {
      return (
        <>
          <div className="mt-5 ml-5 mr-5 ">
            <div className="w-[180px] h-[20px] skeleton mb-2"></div>
            <div className="w-full h-[25px] skeleton mb-2"></div>
            <div className="grid w-full grid-cols-2 gap-2">
              <div className="w-[140px] h-[25px] skeleton"></div>
              <div className="w-[140px] h-[25px] skeleton justify-self-end"></div>
              <div className="w-[140px] h-[25px] skeleton"></div>
              <div className="w-[140px] h-[25px] skeleton justify-self-end"></div>
            </div>
            <div className="w-[150px] h-[150px] skeleton mt-2"></div>
            <div className="w-full h-[20px] skeleton mt-2"></div>
            <div className="w-full h-[20px] skeleton mt-2"></div>
            <div className="w-full h-[20px] skeleton mt-2"></div>
          </div>
        </>
      );
    }
  if (type == 2 && isFetching && isBrowser) return <></>;
  if (isBrowser)
    return (
      <div className="pb-2 mt-1 mb-8 ml-8 mr-8">
        {/* Info */}
        {/* Profile일 경우, 카페의 ID로 Cafe 이름을 찾고, 링크로 표시 */}
        {type === 2 && cafeData ? (
          <div
            className="mb-2 text-base font-medium cursor-pointer"
            onClick={() => {
              window.location.href = `/coffeecafe/${cafeId}`;
            }}
          >
            {cafeName}
          </div>
        ) : (
          <div className="mb-2 text-base h-[24px] "> </div>
        )}

        <div className="flex items-center justify-between mb-2">
          <div className="w-full h-full text-xl font-semibold ">
            {data.title}
          </div>

          {userId === data.user && (
            <div className="flex gap-2">
              {type === 1 ? (
                <div></div>
              ) : (
                <div
                  className=" w-[40px] bg-gray-100 p-1 rounded-md text-center text-sm font-semibold cursor-pointer hover:bg-gray-300"
                  onClick={() => hadleUpdateModal(data)}
                >
                  수정
                </div>
              )}
              <div
                className=" w-[40px] bg-gray-100 p-1 rounded-md text-center text-sm font-semibold cursor-pointer hover:bg-gray-300"
                onClick={() => handleDelete(data.id)}
              >
                삭제
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 mb-5 align-baseline">
          <div>
            <Stars score={data.score} size="small" />
          </div>
          <div className="mt-1 mr-1 text-base font-medium text-end">
            {data.name}
          </div>
          <Badge typeIdx={data.type} />
          <div className="mr-1 text-base text-end">{data.date}</div>
        </div>

        {/* Image */}
        <div className="relative flex w-full gap-3 mb-5">
          {/* Image */}
          <div className="w-full space-x-2 carousel carousel-center">
            {data &&
              data.reviewimage_set &&
              data.reviewimage_set.map((x: ReveiwImageData, i: number) => (
                <div
                  className="carousel-item h-[200px]"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    transition: "transform 0.5s ease",
                  }}
                  key={x.id}
                >
                  <img
                    className="object-cover w-[200px] h-[200px] rounded-2xl"
                    src={process.env.REACT_APP_API_URL + x.image}
                  />
                </div>
              ))}
          </div>{" "}
          {data && data.reviewimage_set && (
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

        <div className="mb-5">{data.content}</div>

        {isOpenReviewUpdateModal && (
          <Modal close={() => hadleUpdateModal(data)} data={data} type={6} />
        )}
      </div>
    );

  return (
    <div className="pb-2 mb-2 ml-5 mr-5 -mt-1">
      {/* Info */}
      {type === 2 && cafeData ? (
        <div
          className="mb-2 text-sm font-medium cursor-pointer"
          onClick={() => {
            window.location.href = `/coffeecafe/${cafeId}`;
          }}
        >
          {cafeData.name}
        </div>
      ) : (
        <div className="mt-4 mb-2 text-base"></div>
      )}

      <div className="flex items-center justify-between mb-2">
        <div className="w-full h-full text-lg font-semibold ">{data.title}</div>
        {userId === data.user && (
          <div className="flex items-center justify-center gap-2">
            <div
              className=" w-[40px] bg-gray-100 mt-1 p-1 rounded-md text-center text-xs font-semibold cursor-pointer hover:bg-gray-300"
              onClick={() => hadleUpdateModal(data)}
            >
              수정
            </div>
            <div
              className=" w-[40px] bg-gray-100 mt-1 p-1 rounded-md text-center text-xs font-semibold cursor-pointer hover:bg-gray-300"
              onClick={() => handleDelete(data.id)}
            >
              삭제
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 mb-5 align-baseline">
        <div className="">
          <Stars score={data.score} size="small" />
        </div>
        <div className="mt-1 mr-1 text-sm font-medium text-end">
          {data.name}
        </div>
        <Badge typeIdx={data.type} />
        <div className="mr-1 text-sm text-end">{data.date}</div>
      </div>
      {/* Image */}
      <div className="w-full space-x-2 carousel carousel-center">
        {data.reviewimage_set &&
          data.reviewimage_set.map((x: ReveiwImageData, i: number) => (
            <div className="carousel-item h-[150px]" key={x.id}>
              <img
                className="object-cover w-[150px] h-[150px] rounded-2xl"
                src={process.env.REACT_APP_API_URL + x.image}
              />
            </div>
          ))}
      </div>

      {data.content.length > 100 ? (
        <div className="mb-5 mt-2 h-[120px] overflow-y-auto text-sm">
          {data.content}
        </div>
      ) : (
        <div className="mt-2 mb-2 text-sm">{data.content}</div>
      )}

      {isOpenReviewUpdateModal && (
        <Modal close={() => hadleUpdateModal(data)} data={data} type={6} />
      )}
    </div>
  );
}
