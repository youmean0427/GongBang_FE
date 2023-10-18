import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import CoffeeCafe from "../pages/CoffeeCafe";
import StudyCafe from "../pages/StudyCafe";


export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/coffeecafe" element={<CoffeeCafe />}/>
                <Route path="/studycafe" element={<StudyCafe />}/>
            </Routes>
        </>
    );
}