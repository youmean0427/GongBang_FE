import { useMutation } from "react-query";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { loginAPI } from "../../apis/api";
import logoImage from "../../images/gongbang_logo.png";
import { useRecoilState } from "recoil";
import { AccessToken } from "../../recoil/atom";
import { Link } from "react-router-dom";
import { LoginInputType } from "../../types/type";

export default function Login() {
  const [loginInputs, setLoginInputs] = useState<LoginInputType>({
    email: "",
    password: "",
  });

  // Login API
  // onSuccess 경우, token을 localStorage에 저장
  const loginMutation = useMutation(["loginAPI"], loginAPI, {
    onSuccess: (res) => {
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      window.location.reload();
    },
    onError: () => {
      alert("아이디 또는 비밀번호를 확인해주세요.");
    },
  });

  // useMutation을 위한, mutate 함수
  const handleLogin = () => {
    loginMutation.mutate({
      email: loginInputs.email,
      password: loginInputs.password,
    });
  };

  // input이 변경될 때마다, loginInputs에 추가
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInputs({
      ...loginInputs,
      // [name] : event.target.name / name : inputs의 key
      [name]: value,
    });
  };

  // Enter Event 추가
  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  // loginMutation : 로그인 API가 로딩중이거나 성공했을 경우
  // ?? 성공했을 때 잠시 UI가 보이는 현상을 방지
  if (loginMutation.isLoading || loginMutation.isSuccess)
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="loading loading-spinner loading-lg bg-gongbang"></div>
          <div className="font-medium text-gray-500">로그인 하는 중</div>
        </div>
      </>
    );
  // Browser
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
      <div className="flex items-center justify-center mb-8">
        <div className="w-10 h-10 ">
          <img src={logoImage} />
        </div>
      </div>

      <div className="w-72">
        <input
          name="email"
          className="w-full input input-bordered"
          onChange={handleChange}
          placeholder="이메일"
        />
      </div>

      <div className="w-72">
        <form>
          <input
            type="password"
            className="w-full input input-bordered "
            name="password"
            onChange={handleChange}
            onKeyDown={handleEnterPress}
            placeholder="비밀번호"
          />
        </form>
      </div>
      <Link to={"/password/reset/"}>
        <div className="mt-2 mb-2 font-medium text-gray-500 ">
          비밀번호 재설정
        </div>
      </Link>
      <div>
        <button
          className="text-lg text-white btn bg-gongbang w-72"
          onClick={handleLogin}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
