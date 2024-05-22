import { useMutation, useQuery } from "react-query";
import React, { ReactEventHandler, useEffect, useState } from "react";
import {
  getCoffeeCafeDetailAPI,
  postCoffeeCafeDetailReviewAPI,
  // getCoffeeCafeDetailReviewCreateAPI,
  userAPI,
} from "../../apis/api";
import { Params, useNavigate, useParams } from "react-router-dom";
// import "../components/list/ListContainer.css";
// import "./Review.css";
import { LuCamera } from "react-icons/lu";
import { CoffeeCafeData, ReviewData } from "../../types/type";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRecoilValue } from "recoil";
import { AccessToken } from "../../recoil/atom";
import { isBrowser } from "react-device-detect";

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

interface IdParamsType {
  id: string | number;
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
  const { id }: Readonly<Params<string>> | undefined = useParams();
  const getDate = new Date();
  const today = getToday(getDate);
  const x = useRecoilValue(AccessToken);
  const username = useSelector((state: RootState) => state.user.username);
  const userId = useSelector((state: RootState) => state.user.user_id);
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

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "content" && value.length >= 500) {
      alert("500자까지 작성할 수 있습니다.");
    } else if (name === "title" && value.length >= 50) {
      alert("50자까지 작성할 수 있습니다.");
    }
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
    if (imageList.length === 0) {
      alert("이미지를 1장 이상 넣어주세요.");
      return;
    }
    if (inputs.title === "") {
      alert("제목을 작성해주세요.");
      return;
    }
    if (inputs.content === "") {
      alert("내용을 작성해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("content", inputs.content);
    formData.append("date", today);
    formData.append("score", `${inputs.score}`);
    formData.append("type", `${inputs.type}`);
    formData.append("user", `${userId}`);
    formData.append("name", username);

    for (let i = 0; i < imageList.length; i++) {
      formData.append("image", imageList[i]);
    }

    reviewCreateMutation.mutate(formData);
  };

  const reviewCreateMutation = useMutation(
    ["createCoffeeCafeDetailReviewAPI"],
    (formData: FormData) => postCoffeeCafeDetailReviewAPI(id, formData, 0),
    {
      onSuccess: (res) => {
        console.log(res, "Success");
        window.location.reload();
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
  if (isBrowser)
    return (
      <div className="mt-5 ml-10 mr-10">
        <div className="mb-5 text-xl font-bold">✏️ 리뷰 작성</div>
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
                <LuCamera size={40} color="gray" />
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
            maxLength={50}
            name="title"
            className="w-full mb-2 text-lg font-semibold input input-bordered"
            placeholder="제목"
            onChange={handleInputChange}
          />

          <div className="flex justify-between mb-2">
            {/* Type */}
            <div className="w-full">
              <select
                className="w-1/2 max-w-xs text-base font-semibold select select-bordered"
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

            <div className="rating rating-lg rating-half">
              <input type="radio" name="rating-10" className="rating-hidden" />
              <input
                type="radio"
                name="rating-10"
                onClick={() => {
                  handleScore(0.5);
                }}
                className="bg-gongbang mask mask-star-2 mask-half-1"
              />
              <input
                type="radio"
                name="rating-10"
                onClick={() => {
                  handleScore(1);
                }}
                className="bg-gongbang mask mask-star-2 mask-half-2"
              />
              <input
                type="radio"
                name="rating-10"
                onClick={() => {
                  handleScore(1.5);
                }}
                className="bg-gongbang mask mask-star-2 mask-half-1"
              />
              <input
                type="radio"
                name="rating-10"
                onClick={() => {
                  handleScore(2);
                }}
                className="bg-gongbang mask mask-star-2 mask-half-2"
              />
              <input
                type="radio"
                name="rating-10"
                onClick={() => {
                  handleScore(2.5);
                }}
                className="bg-gongbang mask mask-star-2 mask-half-1"
              />
              <input
                type="radio"
                name="rating-10"
                onClick={() => {
                  handleScore(3);
                }}
                className="bg-gongbang mask mask-star-2 mask-half-2"
              />
              <input
                type="radio"
                name="rating-10"
                onClick={() => {
                  handleScore(3.5);
                }}
                className="bg-gongbang mask mask-star-2 mask-half-1"
              />
              <input
                type="radio"
                name="rating-10"
                onClick={() => {
                  handleScore(4);
                }}
                className="bg-gongbang mask mask-star-2 mask-half-2"
              />
              <input
                type="radio"
                name="rating-10"
                onClick={() => {
                  handleScore(4.5);
                }}
                className="bg-gongbang mask mask-star-2 mask-half-1"
              />
              <input
                type="radio"
                name="rating-10"
                onClick={() => {
                  handleScore(5);
                }}
                className="bg-gongbang mask mask-star-2 mask-half-2"
              />
            </div>
          </div>
        </div>

        <div>
          <div>
            <textarea
              maxLength={500}
              className="w-full text-base textarea textarea-bordered max-h-[150px]"
              name="content"
              id=""
              rows={5}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div
            className="mt-6 mb-5 text-lg text-white btn w-72 bg-gongbang"
            onClick={handleReviewCreate}
          >
            작성
          </div>
        </div>
      </div>
    );
  return (
    <div className="mt-2 ml-5 mr-5">
      <div className="mb-5 text-xl font-bold">✏️ 리뷰 작성</div>
      <hr />
      <div className="flex w-full mt-5 h-[180px]">
        {/* Image */}
        <div className="w-full h-[180px] space-x-2 carousel carousel-center">
          {imageList.map((image, index) => (
            <>
              <div className="h-[180px] carousel-item" key={index}>
                <img
                  className="object-cover w-[180px] h-[180px] rounded-xl"
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                />
              </div>
            </>
          ))}
          {imageList.length < 3 ? (
            <div className="w-[150px] h-[150px] border rounded-xl carousel-item">
              <label className="flex flex-col items-center justify-center w-full h-full ">
                <LuCamera size={40} color="gray" />
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
      </div>
      {/* Review */}
      <div className="">
        <input
          maxLength={50}
          name="title"
          className="w-full mb-2 text-base font-semibold input input-bordered"
          placeholder="제목"
          onChange={handleInputChange}
        />

        <div className="flex justify-between mb-2">
          {/* Type */}
          <div className="w-full">
            <select
              className="w-[100px] max-w-xs text-sm font-semibold select select-bordered"
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

          <div className="w-[150px] mt-1 rating rating-lg rating-half">
            <input type="radio" name="rating-10" className="rating-hidden" />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(0.5);
              }}
              className="bg-gongbang mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(1);
              }}
              className="bg-gongbang mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(1.5);
              }}
              className="bg-gongbang mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(2);
              }}
              className="bg-gongbang mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(2.5);
              }}
              className="bg-gongbang mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(3);
              }}
              className="bg-gongbang mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(3.5);
              }}
              className="bg-gongbang mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(4);
              }}
              className="bg-gongbang mask mask-star-2 mask-half-2"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(4.5);
              }}
              className="bg-gongbang mask mask-star-2 mask-half-1"
            />
            <input
              type="radio"
              name="rating-10"
              onClick={() => {
                handleScore(5);
              }}
              className="bg-gongbang mask mask-star-2 mask-half-2"
            />
          </div>
        </div>
      </div>

      <div>
        <div>
          <textarea
            maxLength={500}
            className="w-full text-base textarea textarea-bordered max-h-[100px]"
            name="content"
            id=""
            rows={5}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div
          className="w-full h-10 mt-3 mb-5 text-base text-white btn btn-sm bg-gongbang"
          onClick={handleReviewCreate}
        >
          작성
        </div>
      </div>
    </div>
  );
}
