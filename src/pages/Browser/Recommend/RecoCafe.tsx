import { isBrowser } from "react-device-detect";
import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { RecoCafeAPI } from "../../../apis/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { LuCamera, LuX } from "react-icons/lu";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import moveMarker from "../../../../src/images/move_marker.png";
export default function RecoCafe() {
  const getDate = new Date();
  const username = useSelector((state: RootState) => state.user.username);
  const userId = useSelector((state: RootState) => state.user.user_id);
  const today = getToday(getDate);
  const [preImage, setPreImage] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [recoInputs, setRecoInputs] = useState({
    title: "",
    content: "",
    user: username,
    date: today,
  });
  const [nowState, setNowState] = useState({
    center: {
      lat: 0,
      lng: 0,
    },
  });
  // 마커 위치
  const [markerState, setMarkerState] = useState({
    center: {
      lat: 0,
      lng: 0,
    },
  });

  const handleInputsChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setRecoInputs({
      ...recoInputs,
      [name]: value,
    });
  };

  const recoCafeMutation = useMutation(
    ["recoCafeAPI"],
    (formData: FormData) => RecoCafeAPI(formData),
    {
      onSuccess: (res) => {
        alert(
          "카페를 추천해주셔서 감사합니다.\n확인 후, 메일을 보내드리겠습니다."
        );
        window.location.reload();
      },
    }
  );

  const handelReco = () => {
    const formData = new FormData();
    formData.append("title", recoInputs.title);
    formData.append("content", recoInputs.content);
    formData.append("date", recoInputs.date);
    formData.append("name", recoInputs.user);
    formData.append("lat", `${markerState.center.lat}`);
    formData.append("lng", `${markerState.center.lng}`);
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", "");
    }

    recoCafeMutation.mutate(formData);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImage(files[0]);
      setPreImage(URL.createObjectURL(files[0]));
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setNowState((prev) => ({
          ...prev,
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          isLoading: false,
        }));

        setMarkerState((prev) => ({
          ...prev,
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          isLoading: false,
        }));
      });
    } else {
      setNowState((prev) => ({
        ...prev,
        errMsg: "현재 위치 정보를 받아올 수 없습니다",
        isLoading: false,
      }));
    }
  }, []);
  if (recoCafeMutation.isLoading || recoCafeMutation.isSuccess)
    return (
      <div className="w-full ">
        <div className="fixed text-lg font-medium text-center text-gray-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div className="loading loading-spinner loading-lg bg-gongbang"></div>
          <div className="font-medium text-gray-500">카페 추천 하는 중</div>
        </div>
      </div>
    );
  if (!username)
    return (
      <div className="w-full ">
        <div className="fixed text-lg font-medium text-center text-gray-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          로그인 후, 카페를 추천할 수 있습니다.
        </div>
      </div>
    );
  if (isBrowser)
    return (
      <div className="mt-0 ml-10 mr-10">
        <div>
          <div>
            <div className="mb-3 text-2xl font-bold">카페 추천</div>
          </div>
          <hr />
          <div className="mt-5 text-lg font-medium">
            <div>공부하기 좋은 카페를 추천해주세요.</div>
            <div>카페의 외부 사진을 올려주세요.</div>
          </div>

          <div className="mt-3">
            <div>
              {preImage && (
                <div className="w-full h-[250px]  relative">
                  <img
                    className="object-cover w-full h-[250px] rounded-xl"
                    src={preImage}
                  />
                  <div
                    className="absolute top-0 right-0 m-2 cursor-pointer"
                    onClick={() => {
                      setImage(undefined);
                      setPreImage("");
                    }}
                  >
                    <LuX size={20} />
                  </div>
                </div>
              )}
            </div>

            {preImage.length === 0 && (
              <div className="mt-2 w-full h-[250px] border rounded-xl carousel-item mb-2 cursor-pointer">
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
            )}
          </div>
          <div className="mt-2">
            <div>
              <input
                maxLength={50}
                name="title"
                className="w-full mb-2 text-lg font-semibold input input-bordered"
                placeholder="OO 카페 추천합니다."
                onChange={handleInputsChange}
              />
            </div>
          </div>
          <div>
            <textarea
              maxLength={500}
              className="w-full text-base textarea textarea-bordered max-h-[200px]"
              name="content"
              placeholder="OO 카페가 공부하기 좋았습니다."
              id=""
              rows={4}
              onChange={handleInputsChange}
            ></textarea>
          </div>
          <div className="w-full h-[250px] mt-5 mb-5 rounded-xl">
            <Map
              center={{
                // 지도의 중심좌표
                lat: nowState.center.lat,
                lng: nowState.center.lng,
              }}
              style={{
                // 지도의 크기
                width: "100%",
                height: "100%",
                top: 0,
              }}
              level={3}
              onClick={(_t, mouseEvent) => {
                setMarkerState({
                  center: {
                    lat: mouseEvent.latLng.getLat(),
                    lng: mouseEvent.latLng.getLng(),
                  },
                });
              }}
            >
              <MapMarker
                position={markerState.center}
                image={{
                  src: moveMarker,
                  size: {
                    width: 70,
                    height: 80,
                  },
                }}
              ></MapMarker>
            </Map>
          </div>
          <div
            className="w-full mt-1 mb-5 text-lg text-white btn bg-gongbang"
            onClick={handelReco}
          >
            작성
          </div>
        </div>
      </div>
    );
  return (
    <div className="mt-0 ml-5 mr-5">
      <div>
        <div>
          <div className="mb-2 text-xl font-semibold">카페 추천</div>
        </div>
        <hr />
        <div className="mt-2 text-sm font-medium">
          <div>
            {"<"}공부하기 좋은 카페{">"}를 추천해주세요.
          </div>
          <div>카페의 외경 사진을 올려주세요.</div>
        </div>

        <div className="mt-5">
          <div>
            {preImage && (
              <div className="w-full h-[250px]  relative">
                <img
                  className="object-cover w-full h-[250px] rounded-xl"
                  src={preImage}
                />
                <div
                  className="absolute top-0 right-0 m-2 cursor-pointer"
                  onClick={() => {
                    setImage(undefined);
                    setPreImage("");
                  }}
                >
                  <LuX size={20} />
                </div>
              </div>
            )}
          </div>

          {preImage.length === 0 && (
            <div className="mt-2 w-full h-[250px] border rounded-xl carousel-item mb-2 cursor-pointer">
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
          )}
        </div>
        <div className="mt-2">
          <div>
            <input
              maxLength={50}
              name="title"
              className="w-full mb-2 text-base font-semibold input input-bordered"
              placeholder="OO 카페 추천합니다."
              onChange={handleInputsChange}
            />
          </div>
        </div>
        <div>
          <textarea
            maxLength={500}
            className="w-full text-base textarea textarea-bordered max-h-[200px]"
            name="content"
            placeholder="OO 카페가 공부하기 좋았습니다."
            id=""
            rows={4}
            onChange={handleInputsChange}
          ></textarea>
        </div>
        <div className="w-full h-[250px] mt-5 mb-5 rounded-xl">
          <Map
            center={{
              // 지도의 중심좌표
              lat: nowState.center.lat,
              lng: nowState.center.lng,
            }}
            style={{
              // 지도의 크기
              width: "100%",
              height: "100%",
              top: 0,
            }}
            level={3}
            onClick={(_t, mouseEvent) => {
              setMarkerState({
                center: {
                  lat: mouseEvent.latLng.getLat(),
                  lng: mouseEvent.latLng.getLng(),
                },
              });
            }}
          >
            <MapMarker
              position={markerState.center}
              image={{
                src: moveMarker,
                size: {
                  width: 50,
                  height: 60,
                },
              }}
            ></MapMarker>
          </Map>
        </div>
        <div
          className="w-full mt-1 mb-5 text-base font-medium text-white btn bg-gongbang"
          onClick={handelReco}
        >
          작성
        </div>
      </div>
    </div>
  );
}

function getToday(getDate: Date) {
  const today = `${getDate.getFullYear()}-${
    getDate.getMonth() + 1 >= 10
      ? getDate.getMonth() + 1
      : "0" + (getDate.getMonth() + 1)
  }-${getDate.getDate()}`;
  return today;
}
