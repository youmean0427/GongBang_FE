import { useMutation, useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import { loginAPI, userAPI } from "../../apis/api";
import { Await, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import userSlice from "../../redux/userSlice";
import { AccessToken } from "../../recoil/atom";
import { useRecoilState } from "recoil";

interface Login {
  email: String;
  password: String;
}
interface UserData {
  email: String;
  pk: Number;
  username: String;
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoginError, setIsLoginError] = useState(false);
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
      setAccessToken(res.data.access);
      try {
        const userData = await userAPI(res.data.access);
        dispatch(userSlice.actions.post(userData.data.last_name));
        dispatch(userSlice.actions.postId(userData.data.pk));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
    onError: () => {
      setIsLoginError(true);
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

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="text-3xl text-center m-7">공방</div>

        <div className="w-72">
          <div className="mb-3 text-lg">이메일</div>
          <input
            name="email"
            className="w-full input input-bordered"
            onChange={handleChange}
          />
        </div>

        <div className="w-72">
          <div className="mt-3 mb-3 text-lg">비밀번호</div>
          <input
            type="password"
            className="w-full input input-bordered "
            name="password"
            onChange={handleChange}
          />
        </div>

        <div className="mt-3 mb-3 text-lg">
          {isLoginError ? "아이디 또는 비밀번호를 잘못 입력했습니다." : ""}
        </div>

        <div>
          <button
            className="mt-10 text-xl btn w-72"
            onClick={handleLogin}
            disabled={isValid}
          >
            로그인
          </button>
        </div>
      </div>
    </>
  );
}
