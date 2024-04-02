import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import Router from "./routes/router";
import { Provider, useSelector, useDispatch } from "react-redux";
import Nav from "./components/common/Nav";
import store from "./redux/store";

import { tokenRefreshAPI, tokenVerifyAPI, userAPI } from "./apis/api";
import { error } from "console";
import userSlice from "./redux/userSlice";

export default function App() {
  const accessToken: null | string = localStorage.getItem("access_token");
  const refreshToken: null | string = localStorage.getItem("refresh_token");
  const dispatch = useDispatch();

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
        })
        .catch(async (error) => {
          tokenRefreshAPI(refreshTok)
            .then(async (res) => {
              localStorage.setItem("access_token", res.data.access);
              const userData = await userAPI(res.data.access);
              dispatch(userSlice.actions.post(userData.data.last_name));
              dispatch(userSlice.actions.postId(userData.data.pk));
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
        })
        .catch((error) => {
          console.log("[Refresh Expired] Login Again");
        });
    }
  }, []);

  return (
    <>
      <Nav />
      <Router />
      {/* Modal */}
    </>
  );
}
