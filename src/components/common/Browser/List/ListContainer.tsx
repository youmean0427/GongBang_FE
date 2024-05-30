import { useEffect, useState } from "react";
import { deleteReviewAPI, getCoffeeCafeDetailAPI } from "../../../../apis/api";
import { useMutation, useQuery } from "react-query";
import Stars from "../Stars";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { ReveiwImageData, ReviewData, TypeCode } from "../../../../types/type";
import Badge from "../Badge/Badge";
import { isBrowser } from "react-device-detect";

interface ListContainer {
  data: ReviewData;
  type?: number;
}

interface ImageType {
  id: number;
  image: string;
  review: number;
}

export default function ListContainer({ type, data }: ListContainer) {
  const typeCode: TypeCode = { 1: "분위기", 2: "좌석", 3: "음료", 4: "콘센트" };
  const [cafeId, setCafeId] = useState();
  const [images, setImages] = useState<ReveiwImageData[]>([]);
  const userId = useSelector((state: RootState) => state.user.user_id);

  useEffect(() => {
    if (data.reviewimage_set) {
      data.reviewimage_set.map((x: ReveiwImageData) => {
        console.log(x);
        setImages([...images, x]);
      });
    }
  }, []);

  const {
    isFetching,
    isLoading,
    data: cafeData,
  } = useQuery({
    queryKey: ["listCafeData", data],
    queryFn: () => getCoffeeCafeDetailAPI(data.cafe),
    onSuccess: (x) => {
      setCafeId(x.id);
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

  const handleDelete = (review_id: number) => {
    reviewDeleteMutation.mutate(review_id);
  };

  if (type === 2 && isFetching) return <></>;
  if (isBrowser)
    return (
      <div className="pb-2 mt-8 mb-8 ml-8 mr-8">
        {/* Info */}
        {type === 2 && cafeData && cafeId && (
          <div
            className="mb-2 text-base font-medium cursor-pointer"
            onClick={() => {
              window.location.href = `/coffeecafe/${cafeId}`;
            }}
          >
            {cafeData.name}
          </div>
        )}

        <div className="flex items-center justify-between mb-2">
          <div className="w-full h-full text-xl font-semibold ">
            {data.title}
          </div>

          {userId === data.user && (
            <div>
              <div>수정</div>
              <div
                className=" w-[40px] bg-gray-200 p-1 rounded-md text-center text-sm font-semibold cursor-pointer hover:bg-gray-300"
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
        <div className="flex w-full gap-3 mb-5">
          {data.reviewimage_set &&
            data.reviewimage_set.map((x: ReveiwImageData, i: number) => (
              <div className="w-1/3 h-[200px] " key={x.id}>
                <img
                  className="object-cover w-full h-full rounded-2xl"
                  src={process.env.REACT_APP_API_URL + x.image}
                />
              </div>
            ))}
          {data.reviewimage_set?.length === 1 && (
            <>
              <div className="w-1/3 bg-gray-200 rounded-2xl"></div>
              <div className="w-1/3 bg-gray-200 rounded-2xl"></div>
            </>
          )}
          {data.reviewimage_set?.length === 2 && (
            <>
              <div className="w-1/3 bg-gray-200 rounded-2xl"></div>
            </>
          )}
        </div>
        <div className="mb-5">{data.content}</div>
        <hr />
      </div>
    );
  return (
    <div className="pb-2 mt-8 mb-8 ml-5 mr-5">
      {/* Info */}
      {type === 2 && cafeData && cafeId && (
        <div
          className="mb-2 text-base font-medium cursor-pointer"
          onClick={() => {
            window.location.href = `/coffeecafe/${cafeId}`;
          }}
        >
          {cafeData.name}
        </div>
      )}

      <div className="flex items-center justify-between mb-2">
        <div className="w-full h-full text-lg font-bold ">{data.title}</div>
        {userId === data.user && (
          <div
            className=" w-[40px] bg-gray-200 mt-1 p-1 rounded-md text-center text-xs font-semibold cursor-pointer hover:bg-gray-300"
            onClick={() => handleDelete(data.id)}
          >
            삭제
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
            <div className="carousel-item h-[170px]" key={x.id}>
              <img
                className="object-cover w-[170px] h-[170px] rounded-2xl"
                src={process.env.REACT_APP_API_URL + x.image}
              />
            </div>
          ))}
      </div>
      {/* <div className="flex w-full gap-3 mb-5">
        {data.reviewimage_set?.length === 1 && (
          <>
            <div className="w-1/3 bg-gray-200 rounded-2xl"></div>
            <div className="w-1/3 bg-gray-200 rounded-2xl"></div>
          </>
        )}
        {data.reviewimage_set?.length === 2 && (
          <>
            <div className="w-1/3 bg-gray-200 rounded-2xl"></div>
          </>
        )}
      </div> */}
      {data.content.length > 100 ? (
        <div className="mb-5 h-[120px] overflow-y-auto">{data.content}</div>
      ) : (
        <div className="mb-5 ">{data.content}</div>
      )}

      <hr />
    </div>
  );
}
