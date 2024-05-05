import { useMutation, useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import { loginAPI, userAPI } from "../../apis/api";
import { Await, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import userSlice from "../../redux/userSlice";
import { AccessToken } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import logoImage from "../../images/gongbang_logo.png";

interface Login {
  email: String;
  password: String;
}

export default function MobileLogin({ handleMobileSignup }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isValid, setIsValid] = useState(false);
  const [accessToken, setAccessToken] = useRecoilState(AccessToken);
  const [loginInputs, setLoginInputs] = useState<Login>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInputs({
      ...loginInputs,
      [name]: value, // [name] : event.target.name / name : inputs의 key
    });
  };

  const loginMutation = useMutation(["loginAPI"], loginAPI, {
    onSuccess: async (res) => {
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      setAccessToken(res.data.access);
      window.location.reload();
      // try {
      //   const userData = await userAPI(res.data.access);
      //   dispatch(userSlice.actions.post(userData.data.last_name));
      //   dispatch(userSlice.actions.postId(userData.data.pk));
      // } catch (error) {
      //   console.log(error);
      // }
    },
    onError: () => {
      alert("아이디 또는 비밀번호를 확인해주세요.");
    },
  });

  const handleLogin = () => {
    loginMutation.mutate({
      email: loginInputs.email,
      password: loginInputs.password,
    });
  };

  useEffect(() => {
    setIsValid(!(loginInputs.email && loginInputs.password));
  });
  if (loginMutation.isLoading || loginMutation.isSuccess)
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="loading loading-spinner loading-lg bg-gongbang"></div>
          <div className="font-medium text-gray-500">
            ... 로그인 하는 중 ...
          </div>
        </div>
      </>
    );
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-3">
      <div className="flex items-center justify-center mb-5">
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
        <input
          type="password"
          className="w-full input input-bordered "
          name="password"
          onChange={handleChange}
          placeholder="비밀번호"
        />
      </div>
      <div className="flex justify-center w-full mt-2 font-medium text-gray-500">
        <div>비밀번호 찾기</div>
        <div className="ml-2 mr-2">|</div>
        <div onClick={handleMobileSignup}>회원가입</div>
      </div>
      <div>
        <button
          className="mt-2 text-base text-white btn bg-gongbang w-72"
          onClick={handleLogin}
          disabled={isValid}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
