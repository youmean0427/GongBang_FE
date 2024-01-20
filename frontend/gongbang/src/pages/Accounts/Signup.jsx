import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { signupAPI } from "../../apis/api";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'

export default function Signup() {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        username : "",
        email : "",
        password1 : "",
        password2 : "",
    })

    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name] : value
        })
    }

    const signupMutation = useMutation(['signupAPI'], signupAPI, {       
        onSuccess: (res) => {
            navigate('/')
            window.location.reload()
        },
        onError: () => {
            console.log("username, email Check")
        }
})

    const handleSignup = () => {
        signupMutation.mutate({
        username : inputs.username,
        email : inputs.email,
        password1 : inputs.password1,
        password2 : inputs.password2,
        
    })
    }

    const[check, setCheck] = useState(true)
    const[passwordCheck, setPasswordcheck] = useState(0)

    useEffect(() => {
        {inputs.password1.length && inputs.password2.length && inputs.password1 !== inputs.password2 ? setPasswordcheck(1) : setPasswordcheck(0)}
        setCheck(!(inputs.username && inputs.email && inputs.password1 && inputs.password2 && checkEmail(inputs.email)))

    })

    const checkEmail = (data) => {
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        return regExp.test(data)
    }

    return <>
    <div className="login">
        <div>
        <div className="login-title">공방</div>

        <div>
            <div className="login-sub-title">이름</div>
            <div><input className= "login-input"  name = "username" onChange={onChange}/>
            </div>

            <div className="login-sub-title">아이디</div>
            <div><input className= "login-input" name = "email" onChange={onChange}/></div>

            <div className="login-sub-title">비밀번호</div>
            <div><input className= "login-input"  type='password' name = "password1" onChange={onChange} /></div>

            <div className="login-sub-title">비밀번호 확인</div>
            <div><input className= "login-input"  type='password' name = "password2" onChange={onChange} /></div>
            <div className="login-error" >{passwordCheck ? "비밀번호를 확인해주세요" : ""} </div>

           
            <div><button className="login-bnt" onClick={handleSignup} disabled={check}>회원가입</button></div>
        </div>
        </div>
    </div>
    
    
    </>


}