import { LuX } from "react-icons/lu";
import Review from "../../pages/Reveiw";
import ReviewCreate from "../../pages/ReviewCreate";
import ListContainer from "./ListContainer";

const modalsSize: any = {
  0: "w-1/2 overflow-y-auto bg-white h-2/3",
  1: "w-1/2 overflow-y-auto bg-white h-4/5",
  2: "w-1/3 overflow-y-auto bg-white h-4/5",
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
            {type === 0 ? (
              <ListContainer data={data} />
            ) : (
              <>
                {type === 1 ? (
                  <div className="">
                    <Review data={data} />
                  </div>
                ) : (
                  <div>
                    <ReviewCreate coffeeCafe={data} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
