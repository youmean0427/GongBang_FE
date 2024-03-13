import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import logoImage from "../../images/gongbang_logo.png";
import { logoutAPI, userAPI } from "../../apis/api";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import userSlice from "../../redux/userSlice";

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
      <div className="flex justify-between items-center text-xl h-20 bg-slate-300 ">
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
              <div className="m-8">{username}</div>
              <div onClick={handleLogout} className="m-8">
                로그아웃
              </div>
            </div>
          ) : (
            // Before 로그인
            <div className="flex">
              <div className="m-8">
                <Link to={"/login"}>로그인</Link>
              </div>
              <div className="m-8">
                <Link to={"/signup"}>회원가입</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
