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

export default function App() {
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
        })
        .catch(async (error) => {
          tokenRefreshAPI(refreshTok)
            .then(async (res) => {
              localStorage.setItem("access_token", res.data.access);
              const userData = await userAPI(res.data.access);
              dispatch(userSlice.actions.post(userData.data.last_name));
              dispatch(userSlice.actions.postId(userData.data.pk));
              setRecoilAccessToken(res.data.access);
            })
            .catch((error) => {
              console.log("[Refresh Expired] Login Again");
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
        })
        .catch((error) => {
          console.log("[Refresh Expired] Login Again");
        });
    }
  }, []);

  return (
    <>
      <BrowserView>
        <Nav />
        <Router />
      </BrowserView>
      <MobileView>
        <MobileNav />
        <MobileFooter />
        <Router />
      </MobileView>
    </>
  );
}
