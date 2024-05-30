import React, { useState } from "react";
import { useMutation } from "react-query";
import { passwordResetAPI } from "../../../apis/api";
import logoImage from "../../../images/gongbang_logo.png";
import { PassWordResetInputType } from "../../../types/type";

export default function PasswordReset() {
  const [inputEmail, setInputEmail] = useState<PassWordResetInputType>({
    email: "",
  });

  const passwordResetMutation = useMutation(
    ["passwordReset"],
    passwordResetAPI,
    {
      onSuccess: () => {
        alert("이메일로 비밀번호 변경 링크를 보냈습니다.");
        window.location.href = "/";
      },
      onError: () => {
        alert("이메일이 존재하지 않습니다.");
      },
    }
  );

  const handlePasswordReset = () => {
    passwordResetMutation.mutate({ email: inputEmail.email });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputEmail({
      email: value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <div className="flex flex-col items-center justify-center gap-6 w-72">
        <div className="w-10 h-10 ">
          <img src={logoImage} />
        </div>
        <div className="w-full text-xl font-semibold text-center">
          비밀번호 찾기
        </div>
        <div className="w-full">
          <input
            onChange={handleChange}
            name="email"
            className="w-full text-lg input input-bordered"
            placeholder="이메일"
          />
        </div>
        <div className="w-full">
          <div
            className="w-full text-lg text-white bg-gongbang btn"
            onClick={handlePasswordReset}
          >
            확인
          </div>
        </div>
      </div>
    </div>
  );
}
