import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getProfileReview, logoutAPI } from "../../apis/api";
import ListContainer from "../../components/common/Browser/List/ListContainer";
import { RootState } from "../../redux/store";
import emStar from "../../images/em_star.png";
import { isBrowser, isMobile } from "react-device-detect";
import { ReviewData } from "../../types/type";
export default function Profile() {
  const userName = useSelector((state: RootState) => state.user.username);
  const userId = useSelector((state: RootState) => state.user.user_id);
  const { isFetching, isLoading, data } = useQuery({
    queryKey: ["getProfileReview"],
    queryFn: () => getProfileReview(userId),
  });

  const logoutMutation = useMutation(["logoutAPI"], logoutAPI, {
    onSuccess: () => {
      localStorage.clear();
      window.location.reload();
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate({});
  };
  if (isLoading || isFetching) return <></>;
  if (isBrowser)
    return (
      <>
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="text-2xl font-semibold">{userName}</div>
          {data && (
            <div className="mt-2 mb-10 text-base font-semibold">
              {data.length}개의 리뷰
            </div>
          )}
        </div>
        <hr />
        <div className="mt-10">
          {data &&
            data.map((x: ReviewData, i: number) => (
              <div key={i} className="w-full">
                <ListContainer data={x} type={2} />
                <hr />
              </div>
            ))}
          {data.length === 0 && (
            <div className="w-full h-full text-center mt-[180px] text-gray-500 ">
              작성한 리뷰가 없습니다.
            </div>
          )}
        </div>
      </>
    );

  if (isMobile)
    return (
      <>
        <div className="flex flex-col items-center justify-centerh-full">
          <div>
            <img src={emStar} className="w-10 h-10 mb-4" />
          </div>
          <div className="text-xl font-semibold">{userName}</div>
          {data && (
            <div className="mt-2 mb-3 text-sm font-semibold">
              {data.length}개의 리뷰
            </div>
          )}
          <div
            onClick={handleLogout}
            className="mb-3 ml-8 mr-8 text-sm font-semibold btn"
          >
            로그아웃
          </div>
        </div>
        <hr />
        <div className="mt-10">
          {data &&
            data.map((x: ReviewData, i: any) => (
              <div key={i} className="w-full">
                <ListContainer data={x} type={2} />
                <hr />
              </div>
            ))}
        </div>
      </>
    );
  return <></>;
}
