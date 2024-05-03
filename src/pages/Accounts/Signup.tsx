import { useMutation } from "react-query";
import React, { useEffect, useState } from "react";
import { signupAPI } from "../../apis/api";
import logoImage from "../../images/gongbang_logo.png";
import { isBrowser, isMobile } from "react-device-detect";

// Django REST AUTH 기본, 변경 금지
interface Signup {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export default function Signup() {
  const [isValid, setIsValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isPasswordLen8, setIsPasswordLen8] = useState(false);
  const [isSignupError, setIsSignupError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [signupInputs, setSignupInputs] = useState<Signup>({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupInputs({
      ...signupInputs,
      [name]: value,
    });
  };

  const signupMutation = useMutation(["signupAPI"], signupAPI, {
    onSuccess: () => {
      window.location.reload();
    },
    onError: () => {
      alert("존재하는 닉네임 또는 이메일입니다.");
      console.log("username, email Check");
      setIsSignupError(true);
    },
  });

  const handleSignup = () => {
    signupMutation.mutate({
      username: signupInputs.username,
      email: signupInputs.email,
      password1: signupInputs.password1,
      password2: signupInputs.password2,
    });
  };

  const handleCheckChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    {
      signupInputs.password1.length && signupInputs.password1.length < 9
        ? setIsPasswordLen8(false)
        : setIsPasswordLen8(true);
    }
    {
      signupInputs.password1.length &&
      signupInputs.password2.length &&
      signupInputs.password1 !== signupInputs.password2
        ? setIsPasswordMatch(false)
        : setIsPasswordMatch(true);
    }
    setIsValid(
      !(
        signupInputs.username &&
        signupInputs.email &&
        signupInputs.password1 &&
        signupInputs.password2 &&
        isChecked &&
        isPasswordMatch &&
        isPasswordLen8 &&
        checkEmail(signupInputs.email)
      )
    );
  });

  const checkEmail = (data: string) => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(data);
  };

  if (isBrowser)
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 w-72 ">
        <div className="flex items-center justify-center mb-5">
          <div className="w-10 h-10 ">
            <img src={logoImage} />
          </div>
        </div>

        <div className="w-full">
          <input
            className="w-full input input-bordered"
            name="username"
            onChange={handleChange}
            placeholder="닉네임"
          />
        </div>
        <div className="w-full">
          <input
            className="w-full input input-bordered"
            name="email"
            onChange={handleChange}
            placeholder="이메일"
          />
        </div>
        <div className="w-full">
          <input
            className="w-full input input-bordered"
            type="password"
            name="password1"
            placeholder="비밀번호"
            onChange={handleChange}
          />

          {!isPasswordLen8 && (
            <div className="mt-2 text-center">
              비밀번호를 9자리 이상 입력해주세요.
            </div>
          )}
        </div>
        <div className="w-full">
          <input
            className="w-full input input-bordered"
            type="password"
            name="password2"
            onChange={handleChange}
            placeholder="비밀번호 확인"
          />

          {!isPasswordMatch && (
            <div className="mt-2 text-center">비밀번호를 확인해주세요.</div>
          )}
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckChange}
            className="checkbox checked:border-gongbang [--chkfg:white]  [--chkbg:theme(colors.gongbang)] "
          />
          <div className="text-gray-500">개인정보수집 및 이용동의</div>
        </div>
        <div className="w-full mt-2">
          <button
            className="w-full text-lg text-white btn bg-gongbang"
            onClick={handleSignup}
            disabled={isValid}
          >
            회원가입
          </button>
        </div>
      </div>
    );
  if (isMobile)
    return (
      <div className="z-10 h-full w-72">
        <div className="flex flex-col items-center justify-center h-full gap-3">
          <div className="flex items-center justify-center mb-5 ">
            <div className="w-10 h-10 ">
              <img src={logoImage} />
            </div>
          </div>

          <input
            className="w-full input input-bordered"
            name="username"
            onChange={handleChange}
            placeholder="닉네임"
          />

          <input
            className="w-full input input-bordered"
            name="email"
            onChange={handleChange}
            placeholder="이메일"
          />

          <input
            className="w-full input input-bordered"
            type="password"
            name="password1"
            onChange={handleChange}
            placeholder="비밀번호"
          />
          {!isPasswordLen8 && (
            <div className="mt-2 text-center">
              비밀번호를 9자리 이상 입력해주세요.
            </div>
          )}

          <input
            className="w-full input input-bordered"
            type="password"
            name="password2"
            onChange={handleChange}
            placeholder="비밀번호 확인"
          />
          {!isPasswordMatch && (
            <div className="mt-2 text-center">비밀번호를 확인해주세요.</div>
          )}

          <div className="flex items-center justify-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckChange}
              className="checkbox checked:border-gongbang [--chkfg:white]  [--chkbg:theme(colors.gongbang)] "
            />
            <div className="text-gray-500">개인정보수집 및 이용동의</div>
          </div>

          <div>
            <button
              className="text-base text-white btn w-72 bg-gongbang"
              onClick={handleSignup}
              disabled={isValid}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    );
  return <></>;
}
