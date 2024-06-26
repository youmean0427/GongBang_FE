import { useEffect, useState, useRef } from "react";
import { LuX } from "react-icons/lu";
import { Circle, CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getCoffeeCafesAPI } from "../../apis/api";
import Stars from "../../components/common/Browser/Stars";

import moveMarker from "../../../src/images/move_marker.png";
import cafeMarker from "../../../src/images/cafe_marker.png";
import { isBrowser } from "react-device-detect";
import { CoffeeCafeData } from "../../types/type";
export default function CoffeeCafe() {
  const [filteredCafe, setFilteredCafe] = useState<CoffeeCafeData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isClickIdx, setIsClickIdx] = useState(-1);
  const mapRef = useRef<kakao.maps.Map>(null);
  // 현재 위치
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

  const { isLoading, data } = useQuery({
    queryKey: ["getCoffeeCafesMap"],
    queryFn: () => getCoffeeCafesAPI(1),
  });

  // 마커 기준, 5km 이내의 카페만 필터링
  useEffect(() => {
    if (data) {
      const filtered = data.filter((cafe: CoffeeCafeData) => {
        const distance = CalculateDistance(
          markerState.center.lat,
          markerState.center.lng,
          cafe.lat,
          cafe.lng
        );
        return distance <= 5; // km
      });
      setFilteredCafe(filtered);
    }
  }, [markerState, data]);

  // 현위치로 지도 중심을 이동하고, 마커도 이동
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

  if (isLoading) return <></>;
  if (isBrowser)
    return (
      <div className="h-[100vh] pt-20">
        <div className="h-full">
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
            onDragEnd={(map) => {
              const latlng = map.getCenter();
              setNowState({
                center: {
                  lat: latlng.getLat(),
                  lng: latlng.getLng(),
                },
              });
            }}
          >
            {/* <Circle
            center={markerState.center}
            radius={5000}
            strokeWeight={1}
            strokeColor="#ffd80b"
            strokeOpacity={0.1}
            strokeStyle="solid"
            fillColor="#ffd80b"
            fillOpacity={0.2}
          /> */}

            {filteredCafe.map((cafe, index) => (
              <div className="relative " key={index}>
                <CustomOverlayMap
                  position={{ lat: cafe.lat, lng: cafe.lng }}
                  // 커스텀오버레이에서 지도 클릭 이벤트를 방지
                  clickable={true}
                >
                  {isOpen && index === isClickIdx && (
                    <div className="absolute bg-white shadow-lg rounded-xl w-[250px] h-[220px] z-10 -top-[300px] -left-[125px] ">
                      <div
                        className="absolute cursor-pointer right-2 top-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <LuX size={20} />
                      </div>
                      <Link to={`/coffeecafe/${cafe.id}`}>
                        <div className="flex flex-col items-center justify-between w-full h-[220px] ">
                          {cafe.coffeecafeimage_set.length ? (
                            <img
                              className="object-cover w-full h-[125px] rounded-lg"
                              src={
                                process.env.REACT_APP_API_URL +
                                cafe.coffeecafeimage_set[0].image
                              }
                            />
                          ) : (
                            <div className="w-full h-[125px] bg-gray-300 rounded-lg"></div>
                          )}
                          <div className="flex flex-col h-[95px] items-center justify-center  gap-0 ">
                            <div className="text-xl font-semibold w-[230px] text-center truncate ">
                              {cafe.name}
                            </div>
                            <div>
                              <Stars score={cafe.total_score} size="small" />
                            </div>
                            <div className="w-[230px] text-center truncate mt-1 text-sm ">
                              {cafe.address}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </CustomOverlayMap>
                <MapMarker
                  key={index}
                  position={{ lat: cafe.lat, lng: cafe.lng }} // 마커를 표시할 위치
                  image={{
                    src: cafeMarker, // 마커이미지 주소
                    size: {
                      width: 70,
                      height: 75,
                    }, // 마커이미지 크기
                  }}
                  clickable={true}
                  onClick={() => {
                    setIsOpen(true);
                    setIsClickIdx(index);
                    setNowState({
                      center: {
                        lat: cafe.lat,
                        lng: cafe.lng,
                      },
                    });
                  }}
                ></MapMarker>
              </div>
            ))}
            <MapMarker
              position={markerState.center}
              image={{
                src: moveMarker,
                size: {
                  width: 90,
                  height: 100,
                },
              }}
            ></MapMarker>
          </Map>
        </div>
      </div>
    );
  return (
    <>
      <div className="h-[100vh] pt-14">
        <div className="h-full">
          <Map
            // 지도의 중심 좌표
            center={{
              lat: nowState.center.lat,
              lng: nowState.center.lng,
            }}
            // 지도의 크기 및 레벨
            style={{
              width: "100%",
              height: "100%",
            }}
            level={3}
            // 지도를 클릭했을 때, 마커를 이동
            onClick={(_t, mouseEvent) => {
              setMarkerState({
                center: {
                  lat: mouseEvent.latLng.getLat(),
                  lng: mouseEvent.latLng.getLng(),
                },
              });
              setIsOpen(false);
            }}
            // 지도를 이동하면, 중심 좌표를 변경
            onDragEnd={(map) => {
              const latlng = map.getCenter();
              setNowState({
                center: {
                  lat: latlng.getLat(),
                  lng: latlng.getLng(),
                },
              });
            }}
          >
            {/* 마커 위치 5km 반경의 원 */}
            {/* <Circle
        center={markerState.center}
        radius={5000}
        strokeWeight={1}
        strokeColor="#ffd80b"
        strokeOpacity={0.1}
        strokeStyle="solid"
        fillColor="#ffd80b"
        fillOpacity={0.2}
      /> */}
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
            {filteredCafe.map((cafe, index) => (
              <div key={cafe.id}>
                {isOpen && index === isClickIdx && (
                  <Link to={`/coffeecafe/${cafe.id}`}>
                    <div className="flex justify-between items-center fixed z-10 w-full bg-white  rounded-t-xl bottom-14 h-[100px] gap-3 shadow-[0_0_5px_0_rgba(0,0,0,0.3)] ">
                      <div>
                        {cafe.coffeecafeimage_set.length ? (
                          <div className="w-[120px] h-[100px] ">
                            <img
                              className="object-cover w-full h-full rounded-t-xl"
                              src={
                                process.env.REACT_APP_API_URL +
                                cafe.coffeecafeimage_set[0].image
                              }
                            />
                          </div>
                        ) : (
                          <div className="w-[120px] h-[100px] bg-gray-300 rounded-t-xl"></div>
                        )}
                      </div>

                      <div className="flex flex-col items-start justify-center w-full h-[120px] ">
                        <div className="w-[90%] text-base font-bold truncate ">
                          {cafe.name}
                        </div>
                        <div>
                          <Stars score={cafe.total_score} size="small" />
                        </div>
                        <div className="w-[90%] mt-1 text-xs truncate ">
                          {cafe.address}
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
                <div className="relative " key={index}>
                  <MapMarker
                    key={index}
                    zIndex={isOpen && isClickIdx === index ? 10 : 1}
                    position={{ lat: cafe.lat, lng: cafe.lng }} // 마커를 표시할 위치
                    image={{
                      src: cafeMarker, // 마커이미지의 주소

                      size:
                        isOpen && isClickIdx === index
                          ? {
                              width: 90,
                              height: 100,
                            }
                          : {
                              width: 55,
                              height: 60,
                            },

                      // 마커이미지의 크기
                    }}
                    clickable={true}
                    onClick={() => {
                      setIsOpen(true);
                      setIsClickIdx(index);
                      setNowState({
                        center: {
                          lat: cafe.lat,
                          lng: cafe.lng,
                        },
                      });
                    }}
                  ></MapMarker>
                </div>
              </div>
            ))}
          </Map>
        </div>
      </div>
    </>
  );
}

// 주변 거리 계산 (원)
function CalculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
