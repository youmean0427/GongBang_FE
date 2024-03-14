import { LuX } from "react-icons/lu";
import Review from "../../pages/Reveiw";
import ListContainer from "./ListContainer";

export default function Modal({ close, data, type }: any) {
  console.log(data);
  return (
    <>
      <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div className="w-1/2 overflow-y-auto bg-white h-2/3">
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
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
