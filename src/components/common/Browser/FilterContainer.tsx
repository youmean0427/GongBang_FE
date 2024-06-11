import { ChangeEvent, useEffect, useState } from "react";
import { isBrowser } from "react-device-detect";
import { useRecoilValue } from "recoil";
import { ModalDatailData } from "../../../recoil/atom";
import { ReviewData, ReveiwImageData } from "../../../types/type";

import ReviewCard from "./Card/ReviewCard";

interface FilterDataType {
  cafe: number;
  id: number;
  reviewimage_set: ReveiwImageData[];
  title: string;
  content: string;
  date: string;
  name: string;
  score: number;
  type: number;
  user: number;
}
interface FilterData {
  data: FilterDataType[];
}

export default function FilterContainer({ data }: any) {
  const [nowType, setNowType] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [toggleReviewModal, setToggleReviewModal] = useState(false);
  const [toggleReviewCreateModal, setToggleReviewCreateModal] = useState(false);
  const reviewDetail = useRecoilValue(ModalDatailData);
  const [typeSelect, setTypeSelect] = useState<number | string>(1);
  const typeList = [
    { value: 1, name: "분위기" },
    { value: 2, name: "좌석" },
    { value: 3, name: "음료" },
    { value: 4, name: "콘센트" },
  ];

  useEffect(() => {
    setFilteredData(data.filter((x: ReviewData) => x.type == typeSelect));
  }, [typeSelect]);
  useEffect(() => {
    setFilteredData(data.filter((x: ReviewData) => x.type == 1));
  }, []);

  const handleTypeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setTypeSelect(event.target.value);
  };

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
            className="text-xl font-bold w-1/8 select select-bordered"
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
  return (
    <>
      <div>
        <div className="w-full">
          <span className="text-xl">🪄 </span>
          <select
            className="text-xl font-bold w-1/8 select select-bordered"
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
          <span className="ml-5 text-xl font-bold"> 리뷰 </span>
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
    </>
  );
}
