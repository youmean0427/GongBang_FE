import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { signupAPI } from "../../apis/api";
import { Link } from "react-router-dom";

export default function Signup() {
    const [inputs, setInputs] = useState({
        name : "",
        login_id : "",
        password : "",
        email : "",
        nickname : ""

    })

    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name] : value
        })
    }

    const signupMutation = useMutation(['signupAPI'], signupAPI, {})

    const handleSignup = () => {
        signupMutation.mutate({name : inputs.name,
        login_id : inputs.login_id,
        password : inputs.password,
        email : inputs.email,
        nickname : inputs.nickname
    })
    }


    const[check, setCheck] = useState(true)
    
    useEffect(() => {
        setCheck(!(inputs.name && inputs.login_id && inputs.password && checkEmail(inputs.email) && inputs.nickname))

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
            <div><input name = "name" onChange={onChange}/>
            </div>
            <div>
      
            </div>

            <div>닉네임</div>
            <div><input name = "nickname" onChange={onChange} /></div>

            <div>아이디</div>
            <div><input name = "login_id" onChange={onChange}/></div>

            <div>비밀번호</div>
            <div><input type='password' name = "password" onChange={onChange} /></div>

            <div>이메일</div>
            <div><input name = "email" onChange={onChange}/></div>

            <div>회원가입</div>
            <div><Link to = {'/'}><button onClick={handleSignup} disabled={check}>회원가입</button></Link></div>
        </div>


    </div>
    
    
    
    </>


}