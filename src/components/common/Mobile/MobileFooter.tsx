import { Link } from "react-router-dom";

export default function MobileFooter() {
  return (
    <div className="fixed bottom-0 z-10 w-full h-20">
      <div className="flex items-center justify-between h-full bg-gray-100">
        <Link to={"/coffeecafe"}>
          <div>일반카페</div>
        </Link>
        <Link to={"/"}>
          <div>HOME</div>
        </Link>
        <div>마이페이지</div>
      </div>
    </div>
  );
}
