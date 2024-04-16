import React from "react";
import { useQueries, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getProfileReview } from "../../apis/api";
import ListContainer from "../../components/common/ListContainer";
import { RootState } from "../../redux/store";
export default function Profile() {
  const userName = useSelector((state: RootState) => state.user.username);
  const userId = useSelector((state: RootState) => state.user.user_id);
  const { isLoading, data } = useQuery({
    queryKey: ["getProfileReview"],
    queryFn: () => getProfileReview(userId),
  });

  return (
    <div className="flex flex-col items-center justify-centerh-full">
      <div className="text-3xl font-bold">{userName}</div>
      {data && (
        <div className="mt-5 text-lg font-bold">{data.length}개의 리뷰</div>
      )}
      {data &&
        data.map((x: any, i: any) => (
          <div key={i} className="w-full">
            <ListContainer data={x} />
            <hr />
          </div>
        ))}
    </div>
  );
}
