import { useState, useEffect } from "react";
import { Link, useFetcher } from "react-router-dom";
import { useMutation } from "react-query";
import logoImage from "../../../images/gongbang_logo.png";
import { logoutAPI } from "../../../apis/api";
import { useSelector } from "react-redux";
import { useRecoilState, useRecoilValue } from "recoil";
import { RootState } from "../../../redux/store";

import { AccessToken, ModalDatailData } from "../../../recoil/atom";
import Modal from "./Modal";
import fullStar from "../../../images/full_star.png";
import { ReviewData } from "../../../types/type";

export default function Nav() {
  // Modal
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenSignupModal, setISOpenSignupModal] = useState(false);
  const [isOpenProfileModal, setISOpenProfileModal] = useState(false);
  const [isOpenRecoModal, setISOpenRecoModal] = useState(false);

  // Recoil로 accessToken 가져오기
  const accessToken = useRecoilValue(AccessToken);
  const [reviewData, setReviewData] =
    useRecoilState<ReviewData>(ModalDatailData);
  // Redux로 username 가져오기
  const username = useSelector((state: RootState) => state.user.username);
  // Nav Links
  const links: {
    title: string;
    url: string;
  }[] = [{ title: "일반 카페", url: "/coffeecafe" }];

  const handleLoginModal = () => {
    setIsOpenLoginModal(!isOpenLoginModal);
    document.body.style.overflow = "auto";
  };
  const handleSignupModal = () => {
    setISOpenSignupModal(!isOpenSignupModal);
    document.body.style.overflow = "auto";
  };
  const handleProfileModal = () => {
    setISOpenProfileModal(!isOpenProfileModal);
    document.body.style.overflow = "auto";
  };
  const handleRecoModal = () => {
    setISOpenRecoModal(!isOpenRecoModal);
    document.body.style.overflow = "auto";
  };

  // * Logout Mutation
  const logoutMutation = useMutation(["logoutAPI"], logoutAPI, {
    onSuccess: () => {
      localStorage.clear();
      window.location.reload();
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate({});
  };
  // *

  return (
    <>
      <div className="flex flex-row w-full pl-[10%] pr-[10%] font-medium">
        <div className="flex items-center justify-between w-full h-20">
          {/* Logo & Link */}
          <div className="flex items-center gap-14">
            <Link to={"/"}>
              <div className="w-12 h-12 ">
                <img className="nav-logo" src={logoImage} />
              </div>
            </Link>

            {links.map((link, index) => (
              <Link to={link.url} key={index}>
                <div className="text-lg ">{link.title}</div>
              </Link>
            ))}
            <div className="text-lg " onClick={handleRecoModal}>
              카페 추천
            </div>
          </div>

          {/* Login / Logout */}
          <div>
            {username && accessToken ? (
              // After Login
              <div className="flex items-center justify-center ">
                <img src={fullStar} className="w-5 h-5" />
                <div
                  className="ml-2 text-base font-semibold cursor-pointer "
                  onClick={handleProfileModal}
                >
                  {username}
                </div>

                <div onClick={handleLogout} className="ml-8 mr-8 text-base btn">
                  로그아웃
                </div>
              </div>
            ) : (
              // Before Login
              <div className="flex gap-5">
                <div className="cursor-pointer ">
                  <button className="text-base btn" onClick={handleLoginModal}>
                    로그인
                  </button>
                </div>
                <div className="cursor-pointer ">
                  <div
                    className="text-base text-white btn bg-gongbang"
                    onClick={handleSignupModal}
                  >
                    회원가입
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />

      {/* modal */}
      {isOpenLoginModal && <Modal close={handleLoginModal} type={3} />}
      {isOpenSignupModal && <Modal close={handleSignupModal} type={4} />}
      {isOpenProfileModal && <Modal close={handleProfileModal} type={5} />}
      {isOpenRecoModal && <Modal close={handleRecoModal} type={7} />}
    </>
  );
}
