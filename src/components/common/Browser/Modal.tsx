import { useEffect, useState } from "react";
import { isBrowser } from "react-device-detect";
import { LuX } from "react-icons/lu";
import Login from "../../../pages/Accounts/Login";
import Profile from "../../../pages/Accounts/Profile";
import Signup from "../../../pages/Accounts/Signup";
import RecoCafe from "../../../pages/Browser/Recommend/RecoCafe";
import Review from "../../../pages/Browser/Review/Reveiw";
import ReviewCreate from "../../../pages/Browser/Review/ReviewCreate";
import ReviewUpdate from "../../../pages/Browser/Review/ReviewUpdate";
import MobileLogin from "../../../pages/Mobile/MobileLogin";
import ListContainer from "./List/ListContainer";
import Popup from "./Popup";

type ModalType = {
  [key: number]: string;
};

// Type
// 0 : ListContainer
// 1 : Review
// 2 : ReviewCreate
// 3 : Login
// 4 : Signup
// 5 : Profile
// 6 : ReviewUpdate
// 7 : RecoCafe
// 8 : Popup

// Browser
const modalsSize: ModalType = {
  0: "w-2/5 min-w-[650px] max-w-[800px] overflow-y-auto bg-white h-1.5/2 rounded-xl",
  1: "w-1/2 min-w-[650px] max-w-[800px]  bg-white h-4/5 rounded-xl",
  2: "w-[700px]  overflow-y-auto bg-white h-[700px] rounded-xl",
  3: "w-[400px] overflow-y-auto bg-white h-[500px] rounded-xl",
  4: "w-[400px] overflow-y-auto bg-white h-[550px] rounded-xl",
  5: "w-2/5 min-w-[650px] max-w-[800px]  overflow-y-auto bg-white h-4/5 rounded-xl",
  6: "w-[700px]  overflow-y-auto bg-white h-[700px] rounded-xl",
  7: "w-[700px]  overflow-y-auto bg-white h-[700px] rounded-xl",
  8: "w-[500px] overflow-y-auto h-[550px] rounded-xl bg-[#F1D4B9]",
};

// Mobile
const MobileModalsSize: ModalType = {
  0: "w-full m-5 min-w-[300px] max-w-[500px] overflow-y-auto bg-white h-1.5/2 rounded-xl",
  1: "w-full m-5 overflow-y-auto bg-white h-4/5 rounded-xl",
  2: "w-full m-5  overflow-y-auto bg-white h-full max-h-[600px] rounded-xl",
  3: "w-[500px] m-5 bg-white h-[350px] rounded-xl",
  4: "w-[500px] m-5 overflow-y bg-white h-[550px] rounded-xl",
  5: "w-full m-5 overflow-y-auto bg-white h-full min-h-[400px] max-h-[80%] rounded-xl",
  6: "w-full m-5  overflow-y-auto bg-white h-full max-h-[600px] rounded-xl",
  7: "w-full m-5 overflow-y-auto bg-white h-full min-h-[400px] max-h-[80%] rounded-xl",
  8: "w-[320px] m-5 overflow-y-auto h-[400px] rounded-xl bg-[#F1D4B9]",
};

interface ModalPropType {
  close: () => void;
  data?: any;
  type: number;
}

export default function Modal({ close, data, type }: ModalPropType) {
  const modalSize = modalsSize[type];
  const mobileModalSize = MobileModalsSize[type];
  const [mobileSignup, setMobileSignup] = useState(false);
  const handleMobileSignup = () => {
    setMobileSignup(!mobileSignup);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      if (type !== 6 && type !== 7) {
        document.body.style.overflow = "auto";
      }
    };
  }, []);

  if (isBrowser)
    return (
      <>
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className={`${modalSize}`}>
            <div
              className="flex justify-end m-3 cursor-pointer"
              onClick={close}
            >
              <LuX size={30} />
            </div>

            {type === 0 && (
              <div className=" overflow-y-auto h-[90%]">
                <ListContainer data={data} />
              </div>
            )}
            {type === 1 && (
              <div className=" overflow-y-auto h-[90%]">
                <Review data={data} />
              </div>
            )}
            {type === 5 && (
              <div className=" overflow-y-auto h-[90%]">
                <Profile />
              </div>
            )}
            {type === 2 && <ReviewCreate coffeeCafe={data} />}
            {type === 6 && <ReviewUpdate reviewData={data} />}
            {type === 7 && <RecoCafe />}
            {type === 8 && <Popup />}

            {(type === 3 || type == 4) && (
              <div className="flex items-center justify-center w-full h-4/5 ">
                {type === 3 && <Login />}
                {type === 4 && <Signup />}
              </div>
            )}
          </div>
        </div>
      </>
    );
  return (
    <>
      {mobileSignup === false ? (
        <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-full h-full bg-black bg-opacity-50 min-w-">
          <div className={`${mobileModalSize}`}>
            <div
              className="flex justify-end mt-2 mr-2 cursor-pointer "
              onClick={close}
            >
              <LuX size={25} />
            </div>

            {type === 3 && mobileSignup === false && (
              <div className="flex items-center justify-center w-full h-4/5 ">
                <MobileLogin handleMobileSignup={handleMobileSignup} />
              </div>
            )}
            {type === 5 && mobileSignup === false && (
              <div className=" overflow-y-auto h-[90%]">
                <Profile />
              </div>
            )}
            {type === 0 && (
              <div className=" overflow-y-auto h-[90%]">
                <ListContainer data={data} />
              </div>
            )}
            {type === 6 && <ReviewUpdate reviewData={data} />}
            {type === 7 && <RecoCafe />}
            {type === 2 && <ReviewCreate coffeeCafe={data} />}
            {type === 8 && <Popup />}
            {type === 1 && (
              <div className=" overflow-y-auto h-[90%]">
                <Review data={data} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50 ">
          <div className={`${MobileModalsSize[4]}`}>
            <div
              className="flex justify-end mt-2 mr-2 cursor-pointer"
              onClick={close}
            >
              <LuX size={25} />
            </div>
            <div className="flex items-center justify-center w-full h-[90%]">
              <Signup />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
