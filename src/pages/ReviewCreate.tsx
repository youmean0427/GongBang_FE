import { useMutation, useQuery } from "react-query";
import React, { ReactEventHandler, useEffect, useState } from "react";
import {
  getCoffeeCafeDetailAPI,
  postCoffeeCafeDetailReviewAPI,
  // getCoffeeCafeDetailReviewCreateAPI,
  userAPI,
} from "../apis/api";
import { useNavigate, useParams } from "react-router-dom";
// import "../components/list/ListContainer.css";
// import "./Review.css";
import { LuCamera } from "react-icons/lu";
import { CoffeeCafeData, ReviewData } from "../types/type";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRecoilValue } from "recoil";
import { AccessToken } from "../recoil/atom";

interface ReviewCreateData {
  coffeeCafe: CoffeeCafeData;
}
interface InputState {
  title: string;
  content: string;
  date: string;
  score: number;
  type: number;
}

function getToday(getDate: Date) {
  const today = `${getDate.getFullYear()}-${
    getDate.getMonth() + 1 >= 10
      ? getDate.getMonth() + 1
      : "0" + (getDate.getMonth() + 1)
  }-${getDate.getDate()}`;
  return today;
}
export default function ReviewCreate({ coffeeCafe }: ReviewCreateData) {
  const { id }: any = useParams();
  const getDate = new Date();
  const today = getToday(getDate);
  const x = useRecoilValue(AccessToken);
  const username = useSelector((state: RootState) => state.user.username);
  const userId = useSelector((state: RootState) => state.user.user_id);
  console.log(username);
  // const { isLoading: coffeeLoading, data: coffeeCafe } = useQuery({
  //   queryKey: ['getCoffeeCafeDetailReviewCreate'],
  //   queryFn: () => getCoffeeCafeDetailAPI(id),
  // })

  // const { isLoading, data: userInfo } = useQuery({
  //   queryKey: ['userInfoReviewCreate'],
  //   queryFn: () => userAPI(),
  //   enabled: !!localStorage.getItem('access_token'),
  // })
  const [imageList, setImageList] = useState([]);
  const [inputs, setInputs] = useState<InputState>({
    title: "",
    content: "",
    date: "",
    score: 5,
    type: 1,
  });
  const [typeSelect, setTypeSelect] = useState("분위기");
  const typeList = [
    { value: 1, name: "분위기" },
    { value: 2, name: "좌석" },
    { value: 3, name: "음료" },
    { value: 4, name: "콘센트" },
  ];

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleScore = (score: number) => {
    setInputs({
      ...inputs,
      score: score,
    });
  };

  const handleReviewCreate = () => {
    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("content", inputs.content);
    formData.append("date", today);
    formData.append("score", `${inputs.score}`);
    formData.append("type", `${inputs.type}`);
    // formData.append("user", `${userId}`);
    // formData.append("name", username);
    // Test
    formData.append("user", `${userId}`);
    formData.append("name", username);

    for (let i = 0; i < imageList.length; i++) {
      formData.append("image", imageList[i]);
    }
    // * FormData Check *
    // for (let value of formData.values()) {
    //     console.log(value)
    // }

    reviewCreateMutation.mutate(formData);
    window.location.reload();
  };

  const reviewCreateMutation = useMutation(
    ["createCoffeeCafeDetailReviewAPI"],
    (formData: FormData) => postCoffeeCafeDetailReviewAPI(id, formData, 0),
    {
      onSuccess: (res) => {
        console.log(res, "Success");
      },
      onError: (res) => {
        console.log(res, "Error");
      },
    }
  );

  const handleImageChange = (event: any) => {
    const files = event.target.files;
    let imageUrl: any = [...imageList];
    for (let i = 0; i < files.length; i++) {
      imageUrl.push(files[i]);
      // * Blob *
      // imageUrl.push(URL.createObjectURL(files[i]))
    }
    setImageList(imageUrl);
  };

  const handleTypeSelect = (event: any) => {
    setInputs({
      ...inputs,
      type: event.target.value,
    });
    setTypeSelect(event.target.value);
  };

  // if (!accessToken) return <></>;
  // if (coffeeLoading) return <></>
  return (
    <div className="mt-5 ml-10 mr-10">
      <div className="mb-5 text-2xl font-bold">리뷰 작성</div>
      <hr />
      <div className="flex w-full mt-5 mb-5 h-44">
        {/* Image */}
        {imageList.map((image, index) => (
          <>
            <div className="w-1/3 h-full" key={index}>
              <img
                className="object-cover w-full h-full rounded-xl"
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
              />
            </div>
            <div className="m-1"></div>
          </>
        ))}
        {imageList.length < 3 ? (
          <div className="w-1/3 h-full border rounded-xl">
            <label className="flex flex-col items-center justify-center h-full ">
              <LuCamera size={50} color="" />
              <input
                className="hidden "
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </label>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* Review */}
      <div className="">
        <input
          name="title"
          className="w-full mb-2 text-lg input input-bordered"
          placeholder="제목"
          onChange={handleInputChange}
        />

        <div className="flex justify-between mb-2">
          {/* Type */}
          <div className="w-full">
            <select
              className="w-1/2 max-w-xs text-base select select-bordered"
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

          {/* <input
                className="input input-bordered"
                name="score"
                onChange={onChange}
                placeholder="점수"
              /> */}
          <div className="rating rating-lg rating-half">
            <input type="radio" name="rating-10" className="rating-hidden" />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(0.5);
              }}
              className="bg-green-500 mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(1);
              }}
              className="bg-green-500 mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(1.5);
              }}
              className="bg-green-500 mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(2);
              }}
              className="bg-green-500 mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(2.5);
              }}
              className="bg-green-500 mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(3);
              }}
              className="bg-green-500 mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(3.5);
              }}
              className="bg-green-500 mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(4);
              }}
              className="bg-green-500 mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(4.5);
              }}
              className="bg-green-500 mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(5);
              }}
              className="bg-green-500 mask mask-star-2 mask-half-2"
            />
          </div>
        </div>

        <div>
          <div>{/* 점수 */}</div>
          {/* <div>{data.username}</div>
                        <div>{today}</div> */}
        </div>
      </div>

      <div>
        <div>
          <textarea
            className="w-full text-base textarea textarea-bordered"
            name="content"
            id=""
            cols={10}
            rows={5}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="mt-10 text-lg btn w-72" onClick={handleReviewCreate}>
          작성
        </div>
      </div>
    </div>
  );
}
