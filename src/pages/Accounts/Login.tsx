import { useMutation } from "react-query";
import React, { useEffect, useState } from "react";
import { loginAPI } from "../../apis/api";
import logoImage from "../../images/gongbang_logo.png";
import { useRecoilState } from "recoil";
import { AccessToken } from "../../recoil/atom";

interface Login {
  email: String;
  password: String;
}

export default function Login() {
  const [loginInputs, setLoginInputs] = useState<Login>({
    email: "",
    password: "",
  });

  const loginMutation = useMutation(["loginAPI"], loginAPI, {
    onSuccess: (res) => {
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInputs({
      ...loginInputs,
      [name]: value, // [name] : event.target.name / name : inputs의 key
    });
  };

  if (loginMutation.isLoading || loginMutation.isSuccess)
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="loading loading-spinner loading-lg bg-gongbang"></div>
          <div className="font-medium text-gray-500">로그인 하는 중</div>
        </div>
      </>
    );
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
            placeholder="비밀번호"
          />
        </form>
      </div>
      <div className="mt-2 mb-2 font-medium text-gray-500 ">비밀번호 찾기</div>

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
