import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getProfileReview, logoutAPI } from "../../apis/api";
import ListContainer from "../../components/common/Browser/List/ListContainer";
import { RootState } from "../../redux/store";
import emStar from "../../images/em_star.png";
import { isBrowser, isMobile } from "react-device-detect";
import { ReviewData } from "../../types/type";
import fullStar from "../../images/full_star.png";
import { useState, useEffect } from "react";
import Modal from "../../components/common/Browser/Modal";
import { useRecoilState } from "recoil";
import {
  ModalDetailDataInProfile,
  ModealDetailDataInProfileBool,
} from "../../recoil/atom";
import { Retryer } from "react-query/types/core/retryer";
export default function Profile() {
  // Redux를 통해, userName과 userId 가져오기
  const userName = useSelector((state: RootState) => state.user.username);
  const userId = useSelector((state: RootState) => state.user.user_id);
  const [reviewDataInProfileBool, setReviewDataInProfileBool] =
    useRecoilState<Boolean>(ModealDetailDataInProfileBool);
  const [reviewDataInProfile, setReviewDataInProfile] =
    useRecoilState<ReviewData>(ModalDetailDataInProfile);
  const [isOpenRecoModal, setISOpenRecoModal] = useState(false);
  const handleRecoModal = () => {
    setISOpenRecoModal(!isOpenRecoModal);
    if (isBrowser) {
      document.body.style.overflow = "auto";
    }
  };

  // user가 작성한 모든 리뷰 가져오기
  const { isFetching, isLoading, data } = useQuery({
    queryKey: ["getProfileReview"],
    queryFn: () => getProfileReview(userId),
  });

  const handleUpdateModal = () => {
    setReviewDataInProfileBool(false);
  };

  // Logout Mutation
  const logoutMutation = useMutation(["logoutAPI"], logoutAPI, {
    onSuccess: () => {
      localStorage.clear();
      window.location.reload();
    },
  });
  const handleLogout = () => {
    let logoutConfirm = window.confirm("로그아웃을 합니다.");
    if (logoutConfirm) {
      logoutMutation.mutate({});
    }
  };
  // *
  if (isLoading)
    if (isMobile)
      return (
        <>
          <div className="flex flex-col items-center justify-center gap-2 mt-4">
            <div className="w-[50px] h-[20px] skeleton"></div>
            <div className="w-[80px] h-[28px] skeleton"></div>
            <div className="w-[50px] h-[20px] skeleton"></div>
            <div className="flex gap-2">
              <div className="w-[70px] h-[30px] skeleton"></div>
              <div className="w-[70px] h-[30px] skeleton"></div>
            </div>
          </div>
          <hr className="mt-10 ml-5 mr-5" />
          <div className="mt-10 ml-5 mr-5 ">
            <div className="w-[180px] h-[20px] skeleton mb-2"></div>
            <div className="w-full h-[25px] skeleton mb-2"></div>
            <div className="grid justify-between w-full grid-cols-2 grid-rows-2 gap-2">
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
    else return <></>;

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
        {data && data.length === 0 && (
          <div className="fixed right-0 w-full text-center top-1/2">
            리뷰가 없습니다.
          </div>
        )}
        <div className="mt-10">
          {data &&
            data.map((x: ReviewData, i: number) => (
              <div key={i} className="w-full">
                <ListContainer data={x} type={2} />
              </div>
            ))}
        </div>
        {reviewDataInProfileBool && (
          <Modal
            close={handleUpdateModal}
            type={6}
            data={reviewDataInProfile}
          />
        )}
      </>
    );

  if (isMobile)
    return (
      <>
        <div className="flex flex-col items-center justify-center mt-4">
          <div>
            {data && data.length < 10 && (
              <img src={emStar} className="w-5 h-5 mb-2" />
            )}
            {data && data.length >= 10 && (
              <img src={fullStar} className="w-5 h-5 mb-2" />
            )}
          </div>
          <div className="text-xl font-semibold">{userName}</div>
          {data && (
            <div className="mt-2 mb-3 text-sm font-semibold">
              {data.length}개의 리뷰
            </div>
          )}
          <div>
            <div
              onClick={handleRecoModal}
              className="mr-2 text-xs font-semibold text-white btn btn-sm bg-gongbang"
            >
              카페추천
            </div>
            <div
              onClick={handleLogout}
              className="ml-2 text-xs font-semibold btn btn-sm"
            >
              로그아웃
            </div>
          </div>
        </div>
        <hr className="mt-10 ml-5 mr-5" />
        <div className="">
          {data &&
            data.map((x: ReviewData) => (
              <div key={x.id} className="w-full mt-10">
                <ListContainer data={x} type={2} />
                <hr className="ml-5 mr-5" />
              </div>
            ))}
          {data && data.length === 0 && (
            <div className="fixed right-0 w-full text-sm font-medium text-center text-gray-500 top-1/2">
              리뷰가 없습니다.
            </div>
          )}
        </div>
        {isOpenRecoModal && <Modal close={handleRecoModal} type={7} />}
      </>
    );
  return <></>;
}
