import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import Router from "./routes/router";
import { Provider, useSelector, useDispatch } from "react-redux";
import Nav from "./components/common/Browser/Nav";
import store from "./redux/store";
import { BrowserView, MobileView } from "react-device-detect";

import { tokenRefreshAPI, tokenVerifyAPI, userAPI } from "./apis/api";
import { error } from "console";
import userSlice from "./redux/userSlice";
import Footer from "./components/common/Browser/Footer";
import MobileNav from "./components/common/Mobile/MobileNav";
import MobileFooter from "./components/common/Mobile/MobileFooter";
import { useRecoilState } from "recoil";
import { AccessToken } from "./recoil/atom";
import { useLocation } from "react-router-dom";

export default function App() {
  const [isLoading, setIsLoding] = useState(true);
  const accessToken: null | string = localStorage.getItem("access_token");
  const refreshToken: null | string = localStorage.getItem("refresh_token");
  const dispatch = useDispatch();
  const [recoilAccessToken, setRecoilAccessToken] = useRecoilState(AccessToken);
  useEffect(() => {
    const refreshTok: { refresh: null | string } = { refresh: refreshToken };
    if (accessToken) {
      const accessTok: { token: string } = { token: accessToken };
      const res = tokenVerifyAPI(accessTok)
        .then(async (res) => {
          const userData = await userAPI(accessTok.token);
          // console.log(userData.data);
          dispatch(userSlice.actions.post(userData.data.last_name));
          dispatch(userSlice.actions.postId(userData.data.pk));
          setRecoilAccessToken(accessToken);
          setIsLoding(false);
        })
        .catch(async (error) => {
          tokenRefreshAPI(refreshTok)
            .then(async (res) => {
              localStorage.setItem("access_token", res.data.access);
              const userData = await userAPI(res.data.access);
              dispatch(userSlice.actions.post(userData.data.last_name));
              dispatch(userSlice.actions.postId(userData.data.pk));
              setRecoilAccessToken(res.data.access);
              setIsLoding(false);
            })
            .catch((error) => {
              console.log("[Refresh Expired] Login Again");
              setIsLoding(false);
            });
        });
    } else {
      tokenRefreshAPI(refreshTok)
        .then(async (res) => {
          localStorage.setItem("access_token", res.data.access);
          const userData = await userAPI(res.data.access);
          dispatch(userSlice.actions.post(userData.data.last_name));
          dispatch(userSlice.actions.postId(userData.data.pk));
          setRecoilAccessToken(res.data.access);
          setIsLoding(false);
        })
        .catch((error) => {
          console.log("[Refresh Expired] Login Again");
          setIsLoding(false);
        });
    }
  }, []);
  // eslint-disable-next-line no-restricted-globals
  const location = useLocation();
  const isNavMap = ["/coffeecafe"].includes(location.pathname);
  if (isLoading) return <></>;
  return (
    <>
      <BrowserView className="relative h-full">
        {!isNavMap && <Nav />}

        <Router />
        {isNavMap && (
          <div className="absolute top-0 z-10 w-full bg-white">
            <Nav />
          </div>
        )}
      </BrowserView>
      <MobileView>
        {isNavMap && <MobileNav path={"coffeecafe"} />}
        {!isNavMap && <MobileNav path={""} />}
        <MobileFooter />
        <Router />
      </MobileView>
    </>
  );
}
