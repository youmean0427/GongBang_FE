import { Link } from "react-router-dom";
import logoImage from "../../../images/gongbang_logo.png";
export default function MobileNav({ path }: { path: string }) {
  if (path === "coffeecafe") {
    return (
      <div className="fixed top-0 z-10 w-full bg-white h-14">
        <div className="flex items-center justify-center w-full h-full">
          <Link to={"/"}>
            <img className="w-8 h-8" src={logoImage} />
          </Link>
        </div>
        <hr />
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center justify-center w-full bg-white h-14">
        <Link to={"/"}>
          <img className="w-8 h-8" src={logoImage} />
        </Link>
      </div>
      <hr />
    </>
  );
}
