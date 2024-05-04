import { useState } from "react";
import { isBrowser } from "react-device-detect";
import { LuX } from "react-icons/lu";
import Login from "../../../pages/Accounts/Login";
import Profile from "../../../pages/Accounts/Profile";
import Signup from "../../../pages/Accounts/Signup";
import Review from "../../../pages/Browser/Reveiw";
import ReviewCreate from "../../../pages/Browser/ReviewCreate";
import MobileLogin from "../../../pages/Mobile/MobileLogin";
import ListContainer from "./ListContainer";

type ModalType = {
  [key: number]: string;
};

// Browser
const modalsSize: ModalType = {
  0: "w-2/5 overflow-y-auto bg-white h-1.5/2 rounded-xl",
  1: "xl:w-2/5 w-1/2 overflow-y-auto bg-white h-4/5 rounded-xl",
  2: "w-[700px]  overflow-y-auto bg-white h-[700px] rounded-xl",
  3: "w-[400px] overflow-y-auto bg-white h-[500px] rounded-xl",
  4: "w-[400px] overflow-y-auto bg-white h-[550px] rounded-xl",
  5: "w-2/5 overflow-y-auto bg-white h-4/5 rounded-xl",
};

// Mobile
const MobileModalsSize: ModalType = {
  0: "w-2/5 overflow-y-auto bg-white h-1.5/2 rounded-xl",
  1: "w-full m-5 overflow-y-auto bg-white h-4/5 rounded-xl",
  2: "w-[700px]  overflow-y-auto bg-white h-[700px] rounded-xl",
  3: "w-[500px] m-5 bg-white h-[400px] rounded-xl",
  4: "w-[500px] m-5 overflow-y bg-white h-[550px] rounded-xl",
  5: "w-full m-5 overflow-y-auto bg-white h-[700px] rounded-xl",
};

export default function Modal({ close, data, type }: any) {
  const modalSize = modalsSize[type];
  const mobileModalSize = MobileModalsSize[type];
  const [mobileSignup, setMobileSignup] = useState(false);
  const handleMobileSignup = () => {
    setMobileSignup(!mobileSignup);
  };
  console.log(mobileSignup);
  if (isBrowser)
    return (
      <>
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50 min-w-">
          <div className={`${modalSize}`}>
            <div
              className="flex justify-end m-3 cursor-pointer"
              onClick={close}
            >
              <LuX size={30} />
            </div>

            {type === 0 && <ListContainer data={data} />}
            {type === 1 && <Review data={data} />}
            {type === 5 && <Profile />}
            {type === 2 && <ReviewCreate coffeeCafe={data} />}
            {(type === 3 || type == 4) && (
              <div className="flex items-center justify-center w-full h-4/5 ">
                {type === 3 && <Login />}
                {type === 4 && <Signup />}
                {/* {type === 0 ? (
              <ListContainer data={data} />
            ) : (
              <>{type === 1 ? <div className=""></div> : <div></div>}</>
            )} */}
              </div>
            )}
          </div>
        </div>
      </>
    );
  return (
    <>
      {mobileSignup === false ? (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50 min-w-">
          <div className={`${mobileModalSize}`}>
            <div
              className="flex justify-end m-3 cursor-pointer"
              onClick={close}
            >
              <LuX size={30} />
            </div>

            {type === 3 && mobileSignup === false && (
              <div className="flex items-center justify-center w-full h-4/5 ">
                <MobileLogin handleMobileSignup={handleMobileSignup} />
              </div>
            )}

            {type === 5 && mobileSignup === false && <Profile />}
            {type === 1 && <Review data={data} />}
          </div>
        </div>
      ) : (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50 ">
          <div className={`${MobileModalsSize[4]}`}>
            <div
              className="flex justify-end m-3 cursor-pointer"
              onClick={close}
            >
              <LuX size={30} />
            </div>
            <div className="flex items-center justify-center w-full h-4/5">
              <Signup />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
