import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { signupAPI } from "../../apis/api";
import { Link, useNavigate } from "react-router-dom";

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
    <div>
        <div>공방</div>

        <div>
            <div>이름</div>
            <div><input name = "username" onChange={onChange}/>
            </div>

            <div>아이디</div>
            <div><input name = "email" onChange={onChange}/></div>

            <div>비밀번호</div>
            <div><input type='password' name = "password1" onChange={onChange} /></div>

            <div>비밀번호 확인</div>
            <div><input type='password' name = "password2" onChange={onChange} /></div>
            <div>{passwordCheck ? "비밀번호를 확인해주세요" : ""} </div>

            <div>회원가입</div>
            <div><button onClick={handleSignup} disabled={check}>회원가입</button></div>
        </div>
    </div>
    
    
    </>


}