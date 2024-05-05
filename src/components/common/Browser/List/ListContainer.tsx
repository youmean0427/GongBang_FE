import React, { useEffect, useState } from "react";
import { deleteReviewAPI, getCoffeeCafeDetailAPI } from "../../../../apis/api";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
// import "../list/ListContainer.css";
import Stars from "../Stars";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { ReviewData, TypeCode } from "../../../../types/type";
import { LuHome } from "react-icons/lu";
import Badge from "../Badge/Badge";

interface ListContainer {
  data: ReviewData;
  type?: number;
}

export default function ListContainer({ type, data }: ListContainer) {
  const typeCode: TypeCode = { 1: "분위기", 2: "좌석", 3: "음료", 4: "콘센트" };
  const [cafeId, setCafeId] = useState();
  const [images, setImages] = useState<string[]>([]);
  const userId = useSelector((state: RootState) => state.user.user_id);
  const reviewDeleteMutation = useMutation(
    ["deleteReview"],
    (x: number) => deleteReviewAPI(x),
    {
      onSuccess: () => {
        window.location.reload();
      },
    }
  );
  console.log(data);
  const {
    isFetching,
    isLoading,
    data: cafeData,
  } = useQuery({
    queryKey: ["listCafeData", data.cafe],
    queryFn: () => getCoffeeCafeDetailAPI(data.cafe),
    onSuccess: (x) => {
      setCafeId(x.id);
    },
  });

  const handleDelete = (review_id: any) => {
    reviewDeleteMutation.mutate(review_id);
  };

  useEffect(() => {
    if (data.reviewimage_set) {
      data.reviewimage_set.map((x: any) => {
        setImages([...images, x]);
      });
    }
  }, []);

  if (isLoading || isFetching) return <></>;
  return (
    <div className="pb-2 mt-8 mb-8 ml-8 mr-8">
      {/* Info */}
      {type == 2 && cafeData && cafeId && (
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
        <div className="w-full h-full text-xl font-semibold ">{data.title}</div>
        {userId === data.user && (
          <div
            className=" w-[30px] text-center text-sm font-medium cursor-pointer "
            onClick={() => handleDelete(data.id)}
          >
            삭제
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div>
          <Stars score={data.score} size="small" />
        </div>
        <div className="text-base font-medium text-end">{data.name}</div>
        <Badge typeIdx={data.type} />
        <div className="text-base text-end">{data.date}</div>
      </div>
      {/* Image */}
      <div className="flex w-full gap-3 mb-5">
        {data.reviewimage_set &&
          data.reviewimage_set.map((x: any, i: number) => (
            <div className="w-1/3 h-[200px] " key={i}>
              <img
                className="object-cover w-full h-full rounded-2xl"
                src={x.image}
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
      <div className="">{data.content}</div>
    </div>
  );
}
