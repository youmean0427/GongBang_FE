import React from "react";
import "./App.css";
import Router from "./routes/router";
import { Provider, useSelector, useDispatch } from "react-redux";
import Nav from "./components/common/Nav";
import store from "./redux/store";
import { RecoilRoot } from "recoil";
export default function App() {
  return (
    <>
      <RecoilRoot>
        <Provider store={store}>
          <Nav />
          <Router />
        </Provider>
      </RecoilRoot>
    </>
  );
}
