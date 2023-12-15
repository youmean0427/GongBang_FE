import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import CoffeeCafe from "../pages/CoffeeCafe";
import StudyCafe from "../pages/StudyCafe";
import Signup from "../pages/Accounts/Signup";
import Login from "../pages/Accounts/Login";


export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/coffeecafe" element={<CoffeeCafe />}/>
                <Route path="/studycafe" element={<StudyCafe />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<Signup />}/>
            </Routes>
        </>
    );
}