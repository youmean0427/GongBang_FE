import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { loginAPI } from "../../apis/api";
import { Link, useNavigate } from "react-router-dom";

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
        <div>
            <div>공방</div>
            <div>아이디</div>
            <div><input name='email' onChange={onChange} /></div>

            <div>비밀번호</div>
            <div><input type='password' name='password' onChange={onChange} /></div>

            <div>
            {isAccount ?  "아이디 또는 비밀번호를 잘못 입력했습니다." : ""}
            </div>
            
             <div>
                <button onClick={handleLogin} disabled={check}>로그인</button>
            </div>

        </div>
    </>

}