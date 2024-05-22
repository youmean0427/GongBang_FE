import { isBrowser } from "react-device-detect";
import { LuArmchair, LuCoffee, LuHome, LuPlug } from "react-icons/lu";
import { Interface } from "readline";
import { TypeCode } from "../../../../types/type";
interface BadgeType {
  typeIdx: number;
}

export default function Badge({ typeIdx }: BadgeType) {
  const typeCode: TypeCode = { 1: "분위기", 2: "좌석", 3: "음료", 4: "콘센트" };
  return (
    <>
      <div
        className={
          isBrowser
            ? "p-2.5 text-sm font-medium badge badge-outline"
            : "p-1.5 text-xs font-medium badge badge-outline"
        }
      >
        {typeIdx === 1 && <LuHome className="mr-1" />}
        {typeIdx === 2 && <LuArmchair className="mr-1" />}
        {typeIdx === 3 && <LuCoffee className="mr-1" />}
        {typeIdx === 4 && <LuPlug className="mr-1" />}

        {typeCode[typeIdx]}
      </div>
    </>
  );
}
