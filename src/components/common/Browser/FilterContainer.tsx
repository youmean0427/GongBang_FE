import { ChangeEvent, useEffect, useState } from "react";
import { isBrowser, isMobile } from "react-device-detect";
import { CoffeeCafeData, ReviewData } from "../../../types/type";
import CafeCard from "./Card/CafeCard";

import ReviewCard from "./Card/ReviewCard";

export default function FilterContainer({ data }: any) {
  const [nowType, setNowType] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [toggleReviewModal, setToggleReviewModal] = useState(false);
  const [toggleReviewCreateModal, setToggleReviewCreateModal] = useState(false);
  const typeList = [
    { value: 1, name: "분위기" },
    { value: 2, name: "좌석" },
    { value: 3, name: "음료" },
    { value: 4, name: "콘센트" },
  ];
  // console.log(data);
  const [typeSelect, setTypeSelect] = useState<number | string>(1);
  const handleTypeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setTypeSelect(event.target.value);
  };

  useEffect(() => {
    setFilteredData(data.filter((x: ReviewData) => x.type == typeSelect));
  }, [typeSelect]);
  useEffect(() => {
    setFilteredData(data.filter((x: ReviewData) => x.type == 1));
  }, []);

  const handleReviewModal = () => {
    setToggleReviewModal(!toggleReviewModal);
  };

  const handleReviewCreateMdoal = () => {
    setToggleReviewCreateModal(!toggleReviewCreateModal);
  };
  if (isBrowser)
    return (
      <div>
        <div className="w-full">
          <span className="text-2xl">🪄 </span>
          <select
            className="text-2xl font-bold w-1/8 select select-bordered"
            onChange={handleTypeSelect}
            value={typeSelect}
          >
            {typeList.map((item) => {
              return (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <span className="ml-5 text-2xl font-semibold"> 리뷰 </span>
        </div>
        <div>
          <ReviewCard
            title=""
            data={filteredData}
            type={2}
            isReviewModal={handleReviewModal}
            isCreateModal={handleReviewCreateMdoal}
          />
        </div>
      </div>
    );

  // Mobile
  return <></>;
}
