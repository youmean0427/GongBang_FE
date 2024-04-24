import React from "react";
import { useQueries, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getProfileReview } from "../../apis/api";
import ListContainer from "../../components/common/Browser/ListContainer";
import { RootState } from "../../redux/store";
import emStar from "../../images/em_star.png";
export default function Profile() {
  const userName = useSelector((state: RootState) => state.user.username);
  const userId = useSelector((state: RootState) => state.user.user_id);
  const { isFetching, isLoading, data } = useQuery({
    queryKey: ["getProfileReview"],
    queryFn: () => getProfileReview(userId),
  });

  if (isLoading || isFetching) return <>isLoading</>;
  return (
    <>
      <div className="flex flex-col items-center justify-centerh-full">
        <div>
          <img src={emStar} className="w-10 h-10 mb-4" />
        </div>
        <div className="text-3xl font-bold">{userName}</div>
        {data && (
          <div className="mt-2 mb-10 text-lg font-bold">
            {data.length}개의 리뷰
          </div>
        )}
      </div>
      <hr />
      <div className="mt-10">
        {data &&
          data.map((x: any, i: any) => (
            <div key={i} className="w-full">
              <ListContainer data={x} type={2} />
              <hr />
            </div>
          ))}
      </div>
    </>
  );
}
