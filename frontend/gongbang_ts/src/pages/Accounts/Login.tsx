import { useMutation, useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import { loginAPI, userAPI } from "../../apis/api";
import { Await, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import userSlice from "../../redux/userSlice";

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
  const [loginError, setLoginError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [logininputs, setLoginInputs] = useState<Login>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInputs({
      ...logininputs,
      [name]: value, // [name] : event.target.name / name : inputs의 key
    });
  };

  const loginMutation = useMutation(["loginAPI"], loginAPI, {
    onSuccess: async (res) => {
      localStorage.setItem("access_token", res.data.access_token);
      try {
        const userData = await userAPI();
        dispatch(userSlice.actions.post(userData.username));
        navigate("/");
      } catch (error) {}
      //   window.location.reload();
    },
    onError: () => {
      setLoginError(true);
    },
  });

  const handleLogin = () => {
    loginMutation.mutate({
      email: logininputs.email,
      password: logininputs.password,
    });
  };

  useEffect(() => {
    setIsValid(!(logininputs.email && logininputs.password));
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <div className="text-3xl text-center m-7">공방</div>

        <div className="w-72">
          <div className="text-lg mb-3">이메일</div>
          <input
            name="email"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
        </div>

        <div className="w-72">
          <div className="text-lg mb-3 mt-3">비밀번호</div>
          <input
            type="password"
            className="input input-bordered w-full "
            name="password"
            onChange={handleChange}
          />
        </div>

        <div className="text-lg mb-3 mt-3">
          {loginError ? "아이디 또는 비밀번호를 잘못 입력했습니다." : ""}
        </div>

        <div>
          <button
            className="btn  text-xl w-72 mt-10"
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
