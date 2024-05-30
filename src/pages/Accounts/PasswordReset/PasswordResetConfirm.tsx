import React, { useState } from "react";
import { useMutation } from "react-query";
import { passwordResetAPI, passwordResetConfirmAPI } from "../../../apis/api";
import logoImage from "../../../images/gongbang_logo.png";
import { useParams } from "react-router-dom";
import { PasswordResetConfrimInputType } from "../../../types/type";

export default function PasswordResetConfirm() {
  // URL에서 uid와 token을 가져옴
  const { uid, token } = useParams();
  const [inputPasswordConfirm, setInputPasswordConfirm] =
    useState<PasswordResetConfrimInputType>({
      new_password1: "",
      new_password2: "",
      uid: uid,
      token: token,
    });

  const passwordResetConfirmMutation = useMutation(
    ["passwordResetConfirm"],
    passwordResetConfirmAPI,
    {
      onSuccess: () => {
        alert("비밀번호가 변경되었습니다.");
        window.location.href = "/";
      },
      onError: () => {
        alert("비밀번호를 다시 작성해주세요");
      },
    }
  );

  const handlePasswordReset = () => {
    passwordResetConfirmMutation.mutate({
      new_password1: inputPasswordConfirm.new_password1,
      new_password2: inputPasswordConfirm.new_password2,
      uid: inputPasswordConfirm.uid,
      token: inputPasswordConfirm.token,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputPasswordConfirm({
      ...inputPasswordConfirm,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <div className="flex flex-col items-center justify-center gap-5 w-72">
        <div className="w-10 h-10 ">
          <img src={logoImage} />
        </div>
        <div className="w-full text-xl font-semibold text-center">
          비밀번호 재설정
        </div>
        <div className="w-full">
          <input
            onChange={handleChange}
            name="new_password1"
            className="w-full text-lg input input-bordered"
            placeholder="비밀번호"
          />
        </div>
        <div className="w-full">
          <input
            onChange={handleChange}
            name="new_password2"
            className="w-full text-lg input input-bordered"
            placeholder="비밀번호 확인"
          />
        </div>
        <div className="w-full">
          <div
            className="w-full text-lg text-white bg-gongbang btn"
            onClick={handlePasswordReset}
          >
            변경{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
