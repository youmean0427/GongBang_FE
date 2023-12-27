import React, { useEffect, useState } from "react";
import '../common/Nav.css'
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userAPI, logoutAPI } from "../../apis/api";
import { useMutation } from "@tanstack/react-query";


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
            <Link to = {'/'}><div className="nav-item">Logo</div></Link>
            {links.map((link, index) => (
                <Link to = {link.url} key = {index} className="nav-item">{link.title}</Link>
            ))}
            
      
         
            {!!!isLoading? 
            <div>
                <div>{data.username}</div>
                <div onClick= {handleLogout}>로그아웃</div>
            </div>
             : !!localStorage.getItem("access_token") ? 
             <div>
                isLoading
             </div>
             :
            <div>
                <div><Link to = {'/login'}>로그인</Link></div>
                <div><Link to = {'/signup'}>회원가입</Link></div>
            </div>
            }

        </div>
        
        </>
    );
}