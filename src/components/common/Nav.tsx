import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import logoImage from "../../images/gongbang_logo.png";
import { logoutAPI, userAPI } from "../../apis/api";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";
import { RootState } from "../../redux/store";
import userSlice from "../../redux/userSlice";
import { AccessToken } from "../../recoil/atom";
import Modal from "./Modal";

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
  const handleLoginModal = () => {
    setIsOpenLoginModal(!isOpenLoginModal);
  };
  const handleSignupModal = () => {
    setISOpenSignupModal(!isOpenSignupModal);
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
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
  }, [username]);

  return (
    <>
      <div className="flex items-center justify-between h-20 text-xl">
        {/* Logo & Link */}
        <div className="flex items-center">
          <Link to={"/"}>
            <div className="m-8">
              <img className="nav-logo" src={logoImage} />
            </div>
          </Link>

          {links.map((link, index) => (
            <Link to={link.url} key={index}>
              <div className="m-8">{link.title}</div>
            </Link>
          ))}
        </div>

        {/* Login / Logout */}
        <div>
          {username ? (
            // After 로그인
            <div className="flex">
              <div className="m-8 font-bold">{username}</div>
              <div onClick={handleLogout} className="m-8">
                로그아웃
              </div>
            </div>
          ) : (
            // Before 로그인
            <div className="flex">
              <div className="m-8">
                <div onClick={handleLoginModal}>로그인</div>
                {/* <Link to={"/login"}>로그인</Link> */}
              </div>
              <div className="m-8">
                <div onClick={handleSignupModal}>회원가입</div>
                {/* <Link to={"/signup"}>회원가입</Link> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <hr />

      {/* modal */}
      {isOpenLoginModal && <Modal close={handleLoginModal} type={3} />}
      {isOpenSignupModal && <Modal close={handleSignupModal} type={4} />}
    </>
  );
}
