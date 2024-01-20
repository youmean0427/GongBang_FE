import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { loginAPI } from "../../apis/api";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'

export default function Login() {
    const navigate = useNavigate()
    const [isAccount, setIsAccount] = useState(0)
    const [inputs, setInputs] = useState({
        email : '',
        password : '',
    })
    
    const onChange = (e) => {
        const {name, value} = e.target
        setInputs({
            ...inputs,
            [name] : value  // [name] : e.target.name / name : inputs의 key
        })
    }


    const loginMutation = useMutation(['loginAPI'], loginAPI, {
        onSuccess: (res) => {
            localStorage.setItem('access_token', res.data.access_token)
            navigate('/')
            window.location.reload()

        },
        onError: () => {
            setIsAccount(1)
        }
    })

    const handleLogin = () => {
        loginMutation.mutate({
            email : inputs.email,
            password : inputs.password
        })
  
    }

    const [check, setCheck] = useState(false)
    useEffect(() => {
        setCheck(!(inputs.email && inputs.password))
    })

    


    return <>
        <div className="login">
            <div>
                <div className="login-title">공방</div>
                
                <div className="login-sub-title">이메일</div>
                <div><input name='email' className= "login-input" onChange={onChange} /></div>

                <div className="login-sub-title">비밀번호</div>
                <div><input type='password' className= "login-input" name='password' onChange={onChange} /></div>

                <div className="login-error">
                    {isAccount ?  "아이디 또는 비밀번호를 잘못 입력했습니다." : ""}
                </div>
            
                <div>
                    <button className="login-bnt" onClick={handleLogin} disabled={check}>로그인</button>
                </div>
            </div>

        </div>
    
    </>

}