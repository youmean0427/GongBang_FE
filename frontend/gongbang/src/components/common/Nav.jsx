import React, { useEffect, useState } from "react";
import '../common/Nav.css'
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userAPI, logoutAPI } from "../../apis/api";
import { useMutation } from "@tanstack/react-query";
import logoImage from '../../images/gongbang_logo.png';
export default function Nav() {


    const { isLoading, data } = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => userAPI(),
        enabled: !!localStorage.getItem("access_token"),
      }); 

    const handleLogout = () => {
        logoutMutation.mutate({
        })
    }
    const logoutMutation = useMutation(['logoutAPI'], logoutAPI, {
        onSuccess: () => {
        localStorage.clear()
        window.location.reload()
        }
    })
    

    const links = [
    { title : '일반 카페', url : '/coffeecafe'}, 
    { title : '스터디 카페', url : '/studycafe'}
    ]


    return (
        <>
        <div className="nav-container">
            <div className="nav-link">
              
                <Link to = {'/'}><div className="nav-link-item"><img className="nav-logo" src={logoImage}/></div></Link>

                {links.map((link, index) => (
                    <Link to = {link.url} key = {index} className="nav-link-item">{link.title}</Link>
                ))}
            </div>
            <div>
                {!!!isLoading? 
                // After 로그인
                <div className="nav-login">
                    <div className="nav-login-item">{data.username}</div>
                    <div className="nav-login-item" onClick= {handleLogout}>로그아웃</div>
                </div>
                : !!localStorage.getItem("access_token") ? 
                // Loading
                <div>
                    isLoading
                </div>
                :
                // Before 로그인
                <div className="nav-login">
                    <div className="nav-login-item" ><Link to = {'/login'}>로그인</Link></div>
                    <div className="nav-login-item" ><Link to = {'/signup'}>회원가입</Link></div>
                </div>
                }
            </div>

        </div>
        
        </>
    );
}