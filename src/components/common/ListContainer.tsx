import React, { useEffect, useState } from "react";
// import { deleteReview } from "../../apis/api";
// import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
// import "../list/ListContainer.css";
import Stars from "../common/Stars";

interface ListContainer {
  data: any;
  userInfo: any;
}

export default function ListContainer({ data, userInfo }: ListContainer) {
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

  return (
    <div className="">
      <div>
        <div className="">
          <div className="">{data.title}</div>

          {userInfo ? (
            <div>
              {userInfo.name === data.username ? (
                <div className="">
                  <Link to={`/review/${data.id}`}>
                    <span>수정</span>
                  </Link>
                  {"   "} | {"   "}
                  {/* <span onClick={() => handleDelete(data.id)}>삭제</span> */}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="">
          <div>{typeCode[data.type]}</div>
          <div className="">{data.name}</div>
          <div className="">{data.date}</div>
          <Stars score={data.score} size={0} />
        </div>

        <div>
          <div className="">
            {data.reviewimage_set.map((x: any, i: any) => (
              <div key={i}>
                <img src={x.image} />
              </div>
            ))}
            {data.reviewimage_set.length == 2 ? <div></div> : <></>}
            {data.reviewimage_set.length == 1 ? (
              <>
                <div></div>
                <div></div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="">{data.content}</div>
      </div>
    </div>
  );
}
