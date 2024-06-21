import { useMutation } from "react-query";
import React, { useEffect, useRef, useState } from "react";
import {
  postCoffeeCafeDetailReviewAPI,
  // getCoffeeCafeDetailReviewCreateAPI,
  userAPI,
  getReviewDetailAPI,
  deleteReviewImageAPI,
} from "../../../apis/api";
import { Params, useNavigate, useParams } from "react-router-dom";
// import "../components/list/ListContainer.css";
// import "./Review.css";
import { LuCamera, LuX } from "react-icons/lu";
import {
  CoffeeCafeData,
  ReveiwImageData,
  ReviewData,
} from "../../../types/type";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useRecoilValue } from "recoil";
import { AccessToken } from "../../../recoil/atom";
import { isBrowser } from "react-device-detect";

interface ReviewCreateData {
  coffeeCafe: CoffeeCafeData;
}
interface InputState {
  title: string;
  content: string;
  date: string;
  score: number;
  type: number | string;
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
export default function ReviewUpdate({
  reviewData,
}: {
  reviewData: ReviewData;
}) {
  let [imageLength, setImageLength] = useState(0);
  const getDate = new Date();
  const today = getToday(getDate);
  const x = useRecoilValue(AccessToken);
  const username = useSelector((state: RootState) => state.user.username);
  const userId = useSelector((state: RootState) => state.user.user_id);
  const [imageList, setImageList] = useState<(File | string)[]>([]);
  const [preImageList, setPreImageList] = useState<(File | ReveiwImageData)[]>(
    []
  );
  const [inputs, setInputs] = useState<InputState>({
    title: "",
    content: "",
    date: "",
    score: 5,
    type: 1,
  });

  const typeList = [
    { value: 1, name: "분위기" },
    { value: 2, name: "좌석" },
    { value: 3, name: "음료" },
    { value: 4, name: "콘센트" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // * 이미지 버튼
  const nextSlide = () => {
    setCurrentSlide(
      currentSlide >= imageList.length - 1 ? 0 : currentSlide + 1
    );
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 0 : currentSlide - 1);
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

  const handleDelete = (id: number) => {
    reviewDeleteImageMutation.mutate(id);
  };

  const reviewDeleteImageMutation = useMutation(
    ["deleteReviewImage"],
    (x: number) => deleteReviewImageAPI(x),
    {}
  );

  useEffect(() => {
    let imageBox: (File | string)[] = [];
    preImageList.map((x) => {
      if (!(x instanceof File)) {
        imageBox.push(x.image);
      } else {
        imageBox.push(x);
      }
    });

    setImageList(imageBox);
  }, [preImageList]);

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

  useEffect(() => {
    if (reviewData) {
      setInputs({
        title: reviewData.title,
        content: reviewData.content,
        date: reviewData.date,
        score: reviewData.score,
        type: reviewData.type,
      });

      setPreImageList([...reviewData.reviewimage_set]);
    }
  }, []);

  const reviewCreateMutation = useMutation(
    ["createCoffeeCafeDetailReviewAPI"],
    // id는 cafe_id
    (formData: FormData) =>
      postCoffeeCafeDetailReviewAPI(reviewData.cafe, formData, reviewData.id),
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

  const handleDeleteFile = (index: number) => {
    setPreImageList((prevImageList) =>
      prevImageList.filter((_, i) => i !== index)
    );
  };

  const handleImageChange = (event: any) => {
    const files = event.target.files;
    let imageUrl: any[] = [...preImageList];
    for (let i = 0; i < files.length; i++) {
      imageUrl.push(files[i]);
      // * Blob *
      // imageUrl.push(URL.createObjectURL(files[i]))
    }
    if (imageUrl.length > 5) {
      imageUrl.slice(0, 5);
    }

    setPreImageList(imageUrl);
  };

  const handleTypeSelect = (event: any) => {
    setInputs({
      ...inputs,
      type: event.target.value,
    });
    // setTypeSelect(event.target.value);
  };

  // if (!accessToken) return <></>;
  // if (coffeeLoading) return <></>
  if (reviewCreateMutation.isLoading || reviewCreateMutation.isSuccess)
    return (
      <>
        <div className="flex flex-col items-center justify-center w-full h-[90%]   gap-4">
          <div className="loading loading-spinner loading-lg bg-gongbang"></div>
          <div className="font-medium text-gray-500">리뷰 수정하는 중</div>
        </div>
      </>
    );
  if (isBrowser)
    return (
      <div className="mt-0 ml-10 mr-10">
        <div className="mb-2 text-xl font-bold">리뷰 수정</div>
        <hr />

        <div className="flex w-full mt-2 mb-5 h-[200px]">
          {/* Image */}
          <div className="relative w-full">
            <div className="w-full h-[200px] space-x-2 relative carousel carousel-end">
              {preImageList.map((x: ReveiwImageData | File | string, index) => (
                <div key={index}>
                  <div
                    className="relative w-[200px] h-[200px] carousel-item"
                    style={{
                      transform: `translateX(-${currentSlide * 208}px)`,
                      transition: "transform 0.5s ease",
                    }}
                  >
                    {x instanceof File && (
                      <>
                        <img
                          className="object-cover w-[200px] h-[200px] rounded-xl"
                          src={URL.createObjectURL(x)}
                          alt={`Preview ${index + 1}`}
                        />
                        <div
                          className="fixed cursor-pointer right-1 top-1 absoulte"
                          onClick={() => {
                            handleDeleteFile(index);
                          }}
                        >
                          <LuX size={20} />
                        </div>
                      </>
                    )}

                    {!(x instanceof File) && typeof x === "object" && (
                      <>
                        <img
                          className="object-cover w-[200px] h-[200px] rounded-xl"
                          src={process.env.REACT_APP_API_URL + x.image}
                          alt={`Preview ${index + 1}`}
                        />
                        <div
                          className="fixed cursor-pointer right-1 top-1 absoulte"
                          onClick={() => {
                            handleDeleteFile(index);
                            handleDelete(x.id);
                          }}
                        >
                          <LuX size={20} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {preImageList.length !== 0 && (
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
        {preImageList.length < 5 ? (
          <div className="mt-2 w-full h-[50px] border rounded-xl carousel-item mb-2 cursor-pointer">
            <label className="flex flex-col items-center justify-center w-full h-full ">
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
          <div className="mt-2 mb-2 flex items-center justify-center w-full h-[50px]">
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
            value={inputs.title}
            onChange={handleInputChange}
          />

          <div className="flex justify-between mb-2">
            {/* Type */}
            <div className="w-full">
              <select
                className="w-1/2 max-w-xs text-base font-semibold select select-bordered"
                onChange={handleTypeSelect}
                disabled
                defaultValue={typeList[reviewData.type - 1].value}
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
              {Array.from({ length: 10 }).map((x, index) => {
                let score = index * 0.5 + 0.5;
                return (
                  <input
                    key={score}
                    type="radio"
                    name="rating-10"
                    onChange={() => {
                      handleScore(score);
                    }}
                    onClick={() => {
                      handleScore(score);
                    }}
                    checked={index === inputs.score * 2 - 1}
                    className={
                      index % 2 === 0
                        ? `bg-gongbang mask mask-star-2 mask-half-1`
                        : `bg-gongbang mask mask-star-2 mask-half-2`
                    }
                  />
                );
              })}
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
              value={inputs.content}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div
            className="mt-6 mb-5 text-lg text-white btn w-72 bg-gongbang"
            onClick={handleReviewCreate}
          >
            수정
          </div>
        </div>
      </div>
    );
  return (
    <div className="mt-2 ml-5 mr-5">
      <div className="mb-2 text-xl font-semibold">리뷰 수정</div>
      <hr />
      <div className="flex w-full mt-5 h-[180px]">
        {/* Image */}
        <div className="w-full h-[180px]  space-x-2 carousel carousel-center">
          {preImageList.map((x: ReveiwImageData | File | string, index) => (
            <div key={index}>
              <div
                className="relative w-[170px] h-[170px] carousel-item"
                style={{
                  transform: `translateX(-${currentSlide * 208}px)`,
                  transition: "transform 0.5s ease",
                }}
              >
                {x instanceof File && (
                  <>
                    <img
                      className="object-cover w-[170px] h-[170px] rounded-xl"
                      src={URL.createObjectURL(x)}
                      alt={`Preview ${index + 1}`}
                    />
                    <div
                      className="fixed cursor-pointer right-1 top-1 absoulte"
                      onClick={() => {
                        handleDeleteFile(index);
                      }}
                    >
                      <LuX size={20} />
                    </div>
                  </>
                )}

                {!(x instanceof File) && typeof x === "object" && (
                  <>
                    <img
                      className="object-cover w-[170px] h-[170px] rounded-xl"
                      src={process.env.REACT_APP_API_URL + x.image}
                      alt={`Preview ${index + 1}`}
                    />
                    <div
                      className="fixed cursor-pointer right-1 top-1 absoulte"
                      onClick={() => {
                        handleDeleteFile(index);
                        handleDelete(x.id);
                      }}
                    >
                      <LuX size={20} />
                    </div>
                  </>
                )}
              </div>
            </div>
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
          value={inputs.title}
          onChange={handleInputChange}
        />

        <div className="flex justify-between mb-2">
          {/* Type */}
          <div className="w-full">
            <select
              className="w-[100px] max-w-xs text-sm font-semibold select select-bordered"
              onChange={handleTypeSelect}
              disabled
              defaultValue={typeList[reviewData.type - 1].value}
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

          <div className="w-[150px] rating rating-lg rating-half -space-x-[0.8px]">
            <input type="radio" name="rating-10" className="rating-hidden" />
            {Array.from({ length: 10 }).map((x, index) => {
              let score = index * 0.5 + 0.5;
              return (
                <input
                  key={score}
                  type="radio"
                  name="rating-10"
                  onChange={() => {
                    handleScore(score);
                  }}
                  onClick={() => {
                    handleScore(score);
                  }}
                  checked={index === inputs.score * 2 - 1}
                  className={
                    index % 2 === 0
                      ? `bg-gongbang mask mask-star-2 mask-half-1`
                      : `bg-gongbang mask mask-star-2 mask-half-2`
                  }
                />
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <div>
          <textarea
            maxLength={500}
            className="w-full text-sm textarea textarea-bordered max-h-[100px]"
            name="content"
            id=""
            rows={5}
            value={inputs.content}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div
          className="w-full h-10 mt-3 mb-5 text-sm font-bold text-white btn btn-sm bg-gongbang"
          onClick={handleReviewCreate}
        >
          수정
        </div>
      </div>
    </div>
  );
}
