import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { BiCoffee } from "react-icons/bi";
import { TbHome } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import Modal from "../Browser/Modal";
import { useState } from "react";
export default function MobileFooter() {
  const location = useLocation();
  const username = useSelector((state: RootState) => state.user.username);

  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenSignupModal, setISOpenSignupModal] = useState(false);
  const [isOpenProfileModal, setISOpenProfileModal] = useState(false);

  const handleLoginModal = () => {
    setIsOpenLoginModal(!isOpenLoginModal);
  };
  const handleSignupModal = () => {
    setISOpenSignupModal(!isOpenSignupModal);
  };
  const handleProfileModal = () => {
    setISOpenProfileModal(!isOpenProfileModal);
  };

  return (
    <div className="fixed bottom-0 z-10 w-full h-14">
      <hr />
      <div className="flex items-center justify-between h-full bg-white">
        <Link to={"/coffeecafe"} className="flex-1">
          {location.pathname === "/coffeecafe" && !isOpenLoginModal ? (
            <>
              <div className="flex flex-col items-center justify-center ">
                <div className="w-8 h-8 ml-1">
                  <BiCoffee color="#E7B98E" className="w-full h-full" />
                </div>
                <div className="text-xs font-bold text-center text-gongbang">
                  카페
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center ">
                <div className="w-8 h-8 ml-1">
                  <BiCoffee color="gray" className="w-full h-full" />
                </div>
                <div className="w-8 text-xs text-center text-gray-500">
                  카페
                </div>
              </div>
            </>
          )}
        </Link>{" "}
        <Link to={"/"} className="flex-1">
          <div className="flex flex-col items-center justify-center ">
            {location.pathname === "/" && !isOpenLoginModal ? (
              <>
                <div className="w-8 h-8">
                  <TbHome color="#E7B98E" className="w-full h-full" />
                </div>
                <div className="text-xs font-bold text-gongbang ">홈</div>
              </>
            ) : (
              <>
                <div className="w-8 h-8">
                  <TbHome color="gray" className="w-full h-full" />
                </div>
                <div className="text-xs text-gray-500 ">홈</div>
              </>
            )}
          </div>
        </Link>
        <div className="flex-1">
          <div className="flex flex-col items-center justify-center ">
            {username ? (
              <>
                <div className="w-8 h-8 p-0.5">
                  <FaRegCircleUser
                    onClick={handleProfileModal}
                    color={isOpenProfileModal ? "#E7B98E" : "gray"}
                    className="w-full h-full"
                  />
                </div>
                <div
                  className={
                    isOpenProfileModal
                      ? "text-xs text-gongbang"
                      : "text-xs text-gray-500"
                  }
                  onClick={handleProfileModal}
                >
                  마이페이지
                </div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 p-0.5">
                  <FaRegCircleUser
                    onClick={handleLoginModal}
                    color={isOpenLoginModal ? "#E7B98E" : "gray"}
                    className="w-full h-full"
                  />
                </div>
                <div
                  className={
                    isOpenLoginModal
                      ? "text-xs text-gongbang"
                      : "text-xs text-gray-500"
                  }
                  onClick={handleLoginModal}
                >
                  로그인
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpenLoginModal && <Modal close={handleLoginModal} type={3} />}
      {isOpenSignupModal && <Modal close={handleSignupModal} type={4} />}
      {isOpenProfileModal && <Modal close={handleProfileModal} type={5} />}
    </div>
  );
}
