import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import logoImage from "../../../images/gongbang_logo.png";
import { logoutAPI } from "../../../apis/api";
import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";
import { RootState } from "../../../redux/store";

import { AccessToken } from "../../../recoil/atom";
import Modal from "./Modal";
import fullStar from "../../../images/full_star.png";

interface NavLink {
  title: string;
  url: string;
}

export default function Nav() {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenSignupModal, setISOpenSignupModal] = useState(false);
  const [isOpenProfileModal, setISOpenProfileModal] = useState(false);
  const accessToken = useRecoilValue(AccessToken);
  const username = useSelector((state: RootState) => state.user.username);
  const links: NavLink[] = [
    { title: "일반 카페", url: "/coffeecafe" },
    // { title: "스터디 카페", url: "/studycafe" },
  ];

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
  const handleLogout = () => {
    logoutMutation.mutate({});
  };

  const logoutMutation = useMutation(["logoutAPI"], logoutAPI, {
    onSuccess: () => {
      localStorage.clear();
      window.location.reload();
    },
  });

  return (
    <>
      <div className="flex flex-row w-full pl-[10%] pr-[10%]">
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
                <div className="text-lg font-pm-5">{link.title}</div>
              </Link>
            ))}
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
    </>
  );
}
