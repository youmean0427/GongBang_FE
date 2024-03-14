import React, { useEffect, useState } from "react";
// import { deleteReview } from "../../apis/api";
// import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
// import "../list/ListContainer.css";
import Stars from "../common/Stars";

interface ListContainer {
  data: any;
}

export default function ListContainer({ data }: ListContainer) {
  const typeCode: any = { 1: "분위기", 2: "좌석", 3: "음료", 4: "콘센트" };
  const [images, setImages] = useState<any>([]);

  // const reviewDeleteMutation = useMutation(
  //   ["deleteReview"],
  //   (x) => deleteReview(x),
  //   {
  //     onSuccess: () => {
  //       window.location.reload();
  //     },
  //   }
  // );

  // const handleDelete = (x: any) => {
  //   reviewDeleteMutation.mutate(x);
  // };

  useEffect(() => {
    data.reviewimage_set.map((x: any) => {
      setImages([...images, x]);
    });
  }, []);
  console.log(data);
  return (
    <div className="mt-5 mb-8 ml-8 mr-8">
      {/* Info */}
      <div className="grid grid-cols-2 mb-5">
        <div className="text-2xl font-bold">{data.title}</div>
        <div>
          <div className=" text-end">
            <Link to={`/review/${data.id}`}>
              <span>수정</span>
            </Link>

            {/* <span onClick={() => handleDelete(data.id)}>삭제</span> */}
          </div>
        </div>

        <Stars score={data.score} size="small" />

        <div className=" text-end">{data.name}</div>
        <div>{typeCode[data.type]}</div>
        <div className=" text-end">{data.date}</div>
      </div>
      {/* Image */}
      <div className="flex mb-5">
        {data.reviewimage_set.map((x: any, i: any) => (
          <div className="w-1/3" key={i}>
            <img src={x.image} />
          </div>
        ))}
      </div>
      <div className="">{data.content}</div>
    </div>
  );
}
