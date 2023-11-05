import React, { useEffect, useState } from "react";
import '../common/Nav.css'
import { Link } from "react-router-dom";

export default function Nav() {

    const [loginId, setLoginId] = useState("")
    
    
    useEffect(() => {
    setLoginId(localStorage.getItem("id"))
    }, [])

    
    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()

    }

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

            
            {loginId ? <div>
                <button onClick={handleLogout}>
                로그아웃</button></div>:
            <div><Link to = {'/login'}>로그인</Link></div>
            }

        </div>
        
        </>
    );
}