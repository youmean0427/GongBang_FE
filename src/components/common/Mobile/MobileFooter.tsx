import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { BiCoffee } from "react-icons/bi";
import { TbHome } from "react-icons/tb";
import { PiUserCircleBold } from "react-icons/pi";
export default function MobileFooter() {
  const username = useSelector((state: RootState) => state.user.username);
  return (
    <div className="fixed bottom-0 z-10 w-full h-16">
      <hr />
      <div className="flex items-center justify-between h-full bg-white">
        <Link to={"/coffeecafe"} className="flex-1">
          <div className="flex flex-col items-center justify-center ">
            <BiCoffee color="gray" size={35} />
            <div className="text-sm ">카페</div>
          </div>
        </Link>{" "}
        <Link to={"/"} className="flex-1">
          <div className="flex flex-col items-center justify-center ">
            <TbHome color="gray" size={35} />
            <div className="text-sm ">홈</div>
          </div>{" "}
        </Link>
        <div className="flex-1">
          <div className="flex flex-col items-center justify-center ">
            <PiUserCircleBold color="gray" size={35} />
            {username ? (
              <div className="text-sm ">마이페이지</div>
            ) : (
              <div className="text-sm">로그인</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
