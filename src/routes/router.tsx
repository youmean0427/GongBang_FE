import { Route, Routes, useParams } from "react-router-dom";
import Login from "../pages/Accounts/Login";
import Signup from "../pages/Accounts/Signup";
import Nav from "../components/common/Browser/Nav";
import Main from "../pages/Browser/Main";
import CafeDetail from "../pages/Browser/CafeDetail";
import CoffeeCafe from "../pages/Browser/CoffeeCafe";
import Profile from "../pages/Accounts/Profile";
import FilterContainer from "../components/common/Browser/FilterContainer";
import Banner from "../components/common/Browser/Banner/Banner";
import { isMobile } from "react-device-detect";
import MobileLogin from "../pages/Mobile/MobileLogin";
import ReviewUpdate from "../pages/Browser/Review/ReviewUpdate";
import PasswordReset from "../pages/Accounts/PasswordReset/PasswordReset";
import PasswordResetConfirm from "../pages/Accounts/PasswordReset/PasswordResetConfirm";
export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/coffeecafe/:id" element={<CafeDetail />} />
        <Route path="/coffeecafe" element={<CoffeeCafe />} />
        <Route path="/filter" element={<FilterContainer />} />
        <Route path="/review/update/:id" element={<ReviewUpdate />} />
        <Route path="/password/reset" element={<PasswordReset />} />
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<PasswordResetConfirm />}
        />
      </Routes>
    </>
  );
}
