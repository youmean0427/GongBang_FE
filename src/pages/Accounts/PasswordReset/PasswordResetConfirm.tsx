import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { passwordResetAPI, passwordResetConfirmAPI } from "../../../apis/api";
import logoImage from "../../../images/gongbang_logo.png";
import { useParams } from "react-router-dom";
import { PasswordResetConfrimInputType } from "../../../types/type";
import { isBrowser } from "react-device-detect";

export default function PasswordResetConfirm() {
  // URL에서 uid와 token을 가져옴
  const { uid, token } = useParams();
  const [isValid, setIsValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isPasswordLen8, setIsPasswordLen8] = useState(false);
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

  useEffect(() => {
    {
      inputPasswordConfirm.new_password1.length &&
      inputPasswordConfirm.new_password1.length < 8
        ? setIsPasswordLen8(false)
        : setIsPasswordLen8(true);
    }
    {
      inputPasswordConfirm.new_password1.length &&
      inputPasswordConfirm.new_password2.length &&
      inputPasswordConfirm.new_password1 !== inputPasswordConfirm.new_password2
        ? setIsPasswordMatch(false)
        : setIsPasswordMatch(true);
    }
    setIsValid(!(isPasswordMatch && isPasswordLen8));
  });
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
  if (isBrowser)
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
              type="password"
              className="w-full input input-bordered"
              placeholder="비밀번호"
            />
            {!isPasswordLen8 && inputPasswordConfirm.new_password1 && (
              <div className="mt-2 text-center text-error">
                비밀번호를 8자리 이상 입력해주세요.
              </div>
            )}
          </div>

          <div className="w-full">
            <input
              onChange={handleChange}
              name="new_password2"
              type="password"
              className="w-full input input-bordered"
              placeholder="비밀번호 확인"
            />
            {!isPasswordMatch && inputPasswordConfirm.new_password2 && (
              <div className="mt-2 text-center text-error">
                비밀번호를 확인해주세요.
              </div>
            )}
          </div>

          <div className="w-full">
            <button
              className="w-full text-lg text-white bg-gongbang btn"
              onClick={handlePasswordReset}
              disabled={isValid}
            >
              변경
            </button>
          </div>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <div className="flex flex-col items-center justify-center gap-5 w-72">
        <div className="w-full mt-5 text-lg font-semibold text-center">
          비밀번호 재설정
        </div>
        <div className="w-full">
          <input
            onChange={handleChange}
            name="new_password1"
            type="password"
            className="w-full input input-bordered"
            placeholder="비밀번호"
          />
          {!isPasswordLen8 && inputPasswordConfirm.new_password1 && (
            <div className="mt-2 text-sm text-center text-error">
              비밀번호를 8자리 이상 입력해주세요.
            </div>
          )}
        </div>

        <div className="w-full">
          <input
            onChange={handleChange}
            name="new_password2"
            type="password"
            className="w-full input input-bordered"
            placeholder="비밀번호 확인"
          />
          {!isPasswordMatch && inputPasswordConfirm.new_password2 && (
            <div className="mt-2 text-sm text-center text-error">
              비밀번호를 확인해주세요.
            </div>
          )}
        </div>

        <div className="w-full">
          <button
            className="w-full text-base font-bold text-white bg-gongbang btn"
            onClick={handlePasswordReset}
            disabled={isValid}
          >
            변경
          </button>
        </div>
      </div>
    </div>
  );
}
