import React from "react";
import '../common/Nav.css'
import { Link } from "react-router-dom";

export default function Nav() {

    const links = [
    { title : '일반 카페', url : '/coffeecafe'}, 
    { title : '스터디 카페', url : '/studycafe'}
    ]

    return (
        <>
        <div className="nav-container">
            <div className="nav-item">Logo</div>
            {links.map((link, index) => (
                <Link to = {link.url} key = {index} className="nav-item">{link.title}</Link>
            ))}
        </div>
        
        </>
    );
}