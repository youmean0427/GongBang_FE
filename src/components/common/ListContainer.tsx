import React, { useEffect, useState } from "react";
import { deleteReviewAPI, getCoffeeCafeDetailAPI } from "../../apis/api";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
// import "../list/ListContainer.css";
import Stars from "../common/Stars";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ListContainer {
  data: any;
  type?: number;
}

export default function ListContainer({ type, data }: ListContainer) {
  const typeCode: any = { 1: "분위기", 2: "좌석", 3: "음료", 4: "콘센트" };
  const [cafeId, setCafeId] = useState();
  const [images, setImages] = useState<any>([]);
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
    data.reviewimage_set.map((x: any) => {
      setImages([...images, x]);
    });
  }, []);

  if (isLoading || isFetching) return <></>;
  return (
    <div className="mt-5 mb-8 ml-8 mr-8">
      {/* Info */}
      {type == 2 && cafeData && cafeId && (
        <div
          className="mb-2 text-xl cursor-pointer"
          onClick={() => {
            window.location.href = `/coffeecafe/${cafeId}`;
          }}
        >
          {cafeData.name}
        </div>
      )}
      <div className="grid grid-cols-2 mb-5">
        <div className="mb-2 text-2xl font-bold">{data.title}</div>
        <div>
          <div className=" text-end">
            {userId === data.user ? (
              <div>
                {/* <Link to={`/review/${data.id}`}>
                  <span>수정</span>
                </Link>
                <span> | </span> */}
                <div
                  className="mt-2 cursor-pointer"
                  onClick={() => handleDelete(data.id)}
                >
                  삭제
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <Stars score={data.score} size="small" />

        <div className="font-bold text-end">{data.name}</div>
        <div className="mt-2">{typeCode[data.type]}</div>
        <div className="mt-1 text-end">{data.date}</div>
      </div>
      {/* Image */}
      <div className="flex mb-5">
        {data.reviewimage_set.map((x: any, i: any) => (
          <div className="w-1/3 " key={i}>
            <img className="rounded-2xl" src={x.image} />
          </div>
        ))}
      </div>
      <div className="">{data.content}</div>
    </div>
  );
}
