import { Route, Routes } from "react-router-dom";
import Login from "../pages/Accounts/Login";
import Signup from "../pages/Accounts/Signup";
import Nav from "../components/common/Nav";
import Main from "../pages/Main";
export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
