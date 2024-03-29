// import { useQuery } from '@tanstack/react-query'
import React from "react";
// import {
//   getAllReveiw,
//   getCoffeeCafeDetailAPI,
//   getReview,
//   userAPI,
// } from "../apis/api";
import { useParams } from "react-router-dom";
import ListContainer from "../components/common/ListContainer";
// import ListContainer from "../components/list/ListContainer";
// import "./Review.css";
import Stars from "../components/common/Stars";

export default function Review({ data }: any) {
  const { id } = useParams();

  //   const { isLoading, data } = useQuery({
  //     queryKey: ['getCoffeeCafeDetailReview'],
  //     queryFn: () => getCoffeeCafeDetailAPI(id),
  //   })

  // const { data: userInfo } = useQuery({
  //   queryKey: ["userInfo"],
  //   queryFn: () => userAPI(),
  //   enabled: !!localStorage.getItem("access_token"),
  // });

  return (
    <div className="">
      <div className="flex flex-col items-center mb-10">
        <div className="mb-2 text-2xl font-bold">{data.name}</div>
        <Stars score={data.total_score} size="small" />
        <div className="mt-2 text-lg font-bold">
          {data.review_set.length}개의 리뷰
        </div>
      </div>
      <div className="">
        {data ? (
          data.review_set.map((x: any, i: any) => (
            <div key={i}>
              <ListContainer data={x} />
              <hr />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
