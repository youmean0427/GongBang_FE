import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import logoImage from "../../../images/gongbang_logo.png";
import { logoutAPI, userAPI } from "../../../apis/api";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";
import { RootState } from "../../../redux/store";
import userSlice from "../../../redux/userSlice";
import { AccessToken } from "../../../recoil/atom";
import Modal from "./Modal";
import fullStar from "../../../images/full_star.png";
interface UserData {
  email: String;
  pk: Number;
  username: String;
}
interface NavLink {
  title: string;
  url: string;
}

export default function Nav() {
  const username = useSelector((state: RootState) => state.user.username);
  // const { isLoading, data } = useQuery<UserData | undefined>({
  //   queryKey: ["userInfo"],
  //   queryFn: () => userAPI(),
  //   enabled: !!localStorage.getItem("access_token"),
  // });
  // const dispatch = useDispatch();
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenSignupModal, setISOpenSignupModal] = useState(false);
  const [isOpenProfileModal, setISOpenProfileModal] = useState(false);
  const handleLoginModal = () => {
    setIsOpenLoginModal(!isOpenLoginModal);
  };
  const handleSignupModal = () => {
    setISOpenSignupModal(!isOpenSignupModal);
  };
  const handleProfileModal = () => {
    setISOpenProfileModal(!isOpenProfileModal);
  };

  const accessToken = useRecoilValue(AccessToken);
  const logoutMutation = useMutation(["logoutAPI"], logoutAPI, {
    onSuccess: () => {
      localStorage.clear();
      window.location.reload();
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate({});
  };

  const links: NavLink[] = [
    { title: "일반 카페", url: "/coffeecafe" },
    { title: "스터디 카페", url: "/studycafe" },
  ];
  return (
    <>
      <div className="flex flex-row w-full pl-[10%] pr-[10%]">
        <div className="flex items-center justify-between w-full h-20 text-lg">
          {/* Logo & Link */}
          <div className="flex items-center gap-14">
            <Link to={"/"}>
              <div className="w-12 h-12 ">
                <img className="nav-logo" src={logoImage} />
              </div>
            </Link>

            {links.map((link, index) => (
              <Link to={link.url} key={index}>
                <div className="font-medium ">{link.title}</div>
              </Link>
            ))}
          </div>

          {/* Login / Logout */}
          <div>
            {username && accessToken ? (
              // After 로그인
              <div className="flex items-baseline justify-center ">
                <img src={fullStar} className="w-5 h-5" />
                <div
                  className="ml-2 text-xl font-semibold cursor-pointer "
                  onClick={handleProfileModal}
                >
                  {username}
                </div>

                <div
                  onClick={handleLogout}
                  className="ml-8 mr-8 text-base font-semibold btn"
                >
                  로그아웃
                </div>
              </div>
            ) : (
              // Before 로그인
              <div className="flex gap-5">
                <div className="cursor-pointer ">
                  <button
                    className="text-lg text-black border-black btn"
                    onClick={handleLoginModal}
                  >
                    로그인
                  </button>
                  {/* <Link to={"/login"}>로그인</Link> */}
                </div>
                <div className="cursor-pointer ">
                  <button
                    className="text-lg font-semibold text-white btn bg-gongbang"
                    onClick={handleSignupModal}
                  >
                    회원가입
                  </button>
                  {/* <Link to={"/signup"}>회원가입</Link> */}
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
    </>
  );
}
