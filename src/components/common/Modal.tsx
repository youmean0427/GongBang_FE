import { LuX } from "react-icons/lu";
import Login from "../../pages/Accounts/Login";
import Signup from "../../pages/Accounts/Signup";
import Review from "../../pages/Reveiw";
import ReviewCreate from "../../pages/ReviewCreate";
import ListContainer from "./ListContainer";

const modalsSize: any = {
  0: "w-1/2 overflow-y-auto bg-white h-1.5/2 rounded-xl",
  1: "w-1/2 overflow-y-auto bg-white h-4/5 rounded-xl",
  2: "w-1/3 overflow-y-auto bg-white h-4/5 rounded-xl",
  3: "w-1/3 overflow-y-auto bg-white h-3/5 rounded-xl",
  4: "w-1/3 overflow-y-auto bg-white h-4/5 rounded-xl",
};

export default function Modal({ close, data, type }: any) {
  const modalSize = modalsSize[type];
  console.log(data);
  return (
    <>
      <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div className={`${modalSize}`}>
          <div className="flex justify-end m-3" onClick={close}>
            <LuX size={30} />
          </div>
          <div className="">
            {type === 0 && <ListContainer data={data} />}
            {type === 1 && <Review data={data} />}
            {type === 2 && <ReviewCreate coffeeCafe={data} />}
            {type === 3 && <Login />}
            {type === 4 && <Signup />}
            {/* {type === 0 ? (
              <ListContainer data={data} />
            ) : (
              <>{type === 1 ? <div className=""></div> : <div></div>}</>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}