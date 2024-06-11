import { Route, Routes } from "react-router-dom";

import Main from "../pages/Browser/Main";
import CafeDetail from "../pages/Browser/CafeDetail";
import CoffeeCafe from "../pages/Browser/CoffeeCafe";

import FilterContainer from "../components/common/Browser/FilterContainer";

import PasswordReset from "../pages/Accounts/PasswordReset/PasswordReset";
import PasswordResetConfirm from "../pages/Accounts/PasswordReset/PasswordResetConfirm";
import RecoCafe from "../pages/Browser/Recommend/RecoCafe";
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
        <Route path="/recocafe" element={<RecoCafe />} />
        <Route path="/password/reset" element={<PasswordReset />} />
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<PasswordResetConfirm />}
        />
      </Routes>
    </>
  );
}
