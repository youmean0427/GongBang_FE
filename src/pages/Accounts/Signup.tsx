import { useMutation } from "react-query";
import React, { useEffect, useState } from "react";
import { signupAPI } from "../../apis/api";
import { Link, useNavigate } from "react-router-dom";

interface Signup {
  // Django REST AUTH 변경 금지
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isPasswordLen8, setIsPasswordLen8] = useState(false);
  const [isSignupError, setIsSignupError] = useState(false);
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
    onSuccess: (res) => {
      navigate("/");
      window.location.reload();
    },
    onError: () => {
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
        checkEmail(signupInputs.email)
      )
    );
  });

  const checkEmail = (data: string) => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(data);
  };

  console.log(signupInputs);
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div>
          <div className="text-3xl text-center m-7">공방</div>

          <div className="w-72">
            <div className="mt-3 mb-3 text-lg">닉네임</div>

            <input
              className="w-full input input-bordered"
              name="username"
              onChange={handleChange}
            />

            <div className="mt-3 mb-3 text-lg">이메일</div>
            <div>
              <input
                className="w-full input input-bordered"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="mt-3 mb-3 text-lg">
              {!isSignupError ? "" : "존재하는 닉네임 또는 이메일입니다."}{" "}
            </div>
            <div className="mt-3 mb-3 text-lg">비밀번호</div>
            <div>
              <input
                className="w-full input input-bordered"
                type="password"
                name="password1"
                onChange={handleChange}
              />
            </div>
            <div className="mt-3 mb-3 text-lg">
              {isPasswordLen8 ? "" : "9자리 이상 입력해주세요."}{" "}
            </div>

            <div className="mt-3 mb-3 text-lg">비밀번호 확인</div>
            <div>
              <input
                className="w-full input input-bordered"
                type="password"
                name="password2"
                onChange={handleChange}
              />
            </div>
            <div className="mt-3 mb-3 text-lg">
              {isPasswordMatch ? "" : "비밀번호를 확인해주세요."}{" "}
            </div>

            <div>
              <button
                className="mt-10 text-xl btn w-72"
                onClick={handleSignup}
                disabled={isValid}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
