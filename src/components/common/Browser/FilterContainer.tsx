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

export default function FilterContainer({ data }: any) {
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

  // ** useEffect
  // * type 변경에 따라, 데이터 filtering
  useEffect(() => {
    setFilteredData(data.filter((x: ReviewData) => x.type == typeSelect));
  }, [typeSelect]);
  // * 초기 type은 1 -> "분위기"
  useEffect(() => {
    setFilteredData(data.filter((x: ReviewData) => x.type == 1));
  }, []);
  // *

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
        <div className="flex flex-row justify-between w-full">
          <div className="text-2xl font-semibold ">상세 리뷰</div>
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
        <div className="flex flex-row justify-between w-full">
          <span className="text-xl font-semibold">상세 리뷰</span>
          <select
            className="text-lg font-semibold w-1/8 select select-sm select-bordered"
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
