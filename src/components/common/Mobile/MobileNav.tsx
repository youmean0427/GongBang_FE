import { Link } from "react-router-dom";
import logoImage from "../../../images/gongbang_logo.png";
export default function MobileNav() {
  return (
    <div className="flex items-center justify-center w-full h-14">
      <Link to={"/"}>
        <img className="w-8 h-8" src={logoImage} />
      </Link>
    </div>
  );
}
