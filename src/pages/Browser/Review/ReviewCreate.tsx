import { useMutation } from "react-query";
import React, { useState } from "react";
import { postCoffeeCafeDetailReviewAPI } from "../../../apis/api";
import { Params, useParams } from "react-router-dom";

import { LuCamera, LuX } from "react-icons/lu";
import {
  CoffeeCafeData,
  ReviewData,
  ReviewCreatePropsType,
  ReviewCreateInputType,
} from "../../../types/type";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useRecoilValue } from "recoil";
import { AccessToken } from "../../../recoil/atom";
import { isBrowser } from "react-device-detect";

// 오늘 날짜 찾는 함수
function getToday(getDate: Date) {
  const today = `${getDate.getFullYear()}-${
    getDate.getMonth() + 1 >= 10
      ? getDate.getMonth() + 1
      : "0" + (getDate.getMonth() + 1)
  }-${getDate.getDate()}`;
  return today;
}

export default function ReviewCreate({ coffeeCafe }: ReviewCreatePropsType) {
  const { id }: Readonly<Params<string>> | undefined = useParams();
  const username = useSelector((state: RootState) => state.user.username);
  const userId = useSelector((state: RootState) => state.user.user_id);

  const getDate = new Date();
  const today = getToday(getDate);
  const token = useRecoilValue(AccessToken);

  const [imageList, setImageList] = useState<File[]>([]);
  const [inputs, setInputs] = useState<ReviewCreateInputType>({
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

  // * Image Slide
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide(
      currentSlide >= imageList.length - 1 ? 0 : currentSlide + 1
    );
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 0 : currentSlide - 1);
  };
  // *

  // * Mutation
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
  // *

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

  const handleImageChange = (event: any) => {
    const files = event.target.files;
    let imageUrl: File[] = [...imageList];
    for (let i = 0; i < files.length; i++) {
      imageUrl.push(files[i]);
      // * Blob *
      // imageUrl.push(URL.createObjectURL(files[i]))
    }
    if (imageUrl.length > 5) {
      imageUrl.slice(0, 5);
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
  if (reviewCreateMutation.isLoading || reviewCreateMutation.isSuccess)
    return (
      <>
        <div className="flex flex-col items-center justify-center w-full h-[90%]   gap-4">
          <div className="loading loading-spinner loading-lg bg-gongbang"></div>
          <div className="font-medium text-gray-500">리뷰 작성하는 중</div>
        </div>
      </>
    );
  if (isBrowser)
    return (
      <div className="mt-0 ml-10 mr-10">
        <div className="mb-2 text-xl font-bold">✏️ 리뷰 작성</div>
        <hr />

        <div className="flex w-full mt-2 mb-5 h-[200px]">
          {/* Image */}
          <div className="relative w-full">
            <div className="w-full h-[200px] space-x-2 relative carousel carousel-end">
              {imageList.map((image, index) => (
                <>
                  <div
                    className="relative h-full carousel-item"
                    key={index}
                    style={{
                      transform: `translateX(-${currentSlide * 208}px)`,
                      transition: "transform 0.5s ease",
                    }}
                  >
                    <img
                      className="object-cover w-[200px] h-[200px] rounded-xl"
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                    />
                    <div
                      className="fixed cursor-pointer right-2 top-2 absoulte"
                      onClick={() => {
                        imageList.splice(index, 1);
                        setImageList([...imageList]);
                      }}
                    >
                      <LuX size={20} />
                    </div>
                  </div>
                </>
              ))}
            </div>
            {imageList.length !== 0 && (
              <>
                <button
                  className="absolute btn btn-circle -left-5 top-1/2 opacity-40 shadow-black hover:opacity-100"
                  onClick={prevSlide}
                >
                  ❮
                </button>
                <button
                  className="absolute btn btn-circle -right-5 top-1/2 opacity-40 shadow-black hover:opacity-100"
                  onClick={nextSlide}
                >
                  ❯
                </button>
              </>
            )}
          </div>
        </div>
        {imageList.length < 5 ? (
          <div className="mt-2 w-full h-[50px] border rounded-xl carousel-item mb-2 cursor-pointer">
            <label className="flex items-center justify-center w-full h-full ">
              <LuCamera size={30} color="gray" />

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
          <div className="mt-2 flex items-center justify-center w-full h-[50px] mb-2">
            사진은 5장까지 업로드 가능합니다.
          </div>
        )}
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
                className="bg-gongbang mask mask-star-2 mask-half-2 checked:"
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
              rows={3}
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
      <div className="mb-2 text-xl font-bold">✏️ 리뷰 작성</div>
      <hr />
      <div className="flex w-full mt-5 h-[180px]">
        {/* Image */}
        <div className="w-full h-[180px]  space-x-2 carousel carousel-center">
          {imageList.map((image, index) => (
            <>
              <div
                className="relative w-[170px] h-[170px]  carousel-item"
                key={index}
              >
                <img
                  className="object-cover w-[170px] h-[170px] rounded-xl"
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                />
                <div
                  className="absolute cursor-pointer top-1 right-1"
                  onClick={() => {
                    imageList.splice(index, 1);
                    setImageList([...imageList]);
                  }}
                >
                  <LuX size={20} />
                </div>
              </div>
            </>
          ))}
          {imageList.length < 5 ? (
            <div className="w-[170px] h-[170px] border rounded-xl carousel-item">
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
          className="w-full mt-1 mb-2 text-base font-semibold input input-bordered"
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

          <div className="w-[150px] mt-1 rating rating-lg rating-half -space-x-[0.9px]">
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
          className="w-full h-10 mt-3 mb-5 text-base font-medium text-white btn btn-sm bg-gongbang"
          onClick={handleReviewCreate}
        >
          작성
        </div>
      </div>
    </div>
  );
}
