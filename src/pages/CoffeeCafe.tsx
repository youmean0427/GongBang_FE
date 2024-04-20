import { useEffect, useState } from "react";
import { LuX } from "react-icons/lu";
import { Circle, Map, MapMarker } from "react-kakao-maps-sdk";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getCoffeeCafesAPI } from "../apis/api";
import Stars from "../components/common/Stars";
import nowMarker from "../../src/images/now_marker.png";
import moveMarker from "../../src/images/move_marker.png";
import cafeMarker from "../../src/images/cafe_marker.png";
export default function CoffeeCafe() {
  const [filteredCafe, setFilteredCafe] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isClickIdx, setIsClickIdx] = useState(-1);
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

  useEffect(() => {
    if (data) {
      const filtered = data.filter((cafe: any) => {
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
  return (
    <div className="">
      <div className="">
        <Map
          center={{
            // 지도의 중심좌표
            lat: nowState.center.lat,
            lng: nowState.center.lng,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "91vh",
          }}
          level={5}
          onClick={(_t, mouseEvent) =>
            setMarkerState({
              center: {
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              },
            })
          }
        >
          <Circle
            center={markerState.center}
            radius={5000}
            strokeWeight={1}
            strokeColor="#ffd80b"
            strokeOpacity={0.1}
            strokeStyle="solid"
            fillColor="#ffd80b"
            fillOpacity={0.2}
          />
          <MapMarker
            position={nowState.center}
            image={{
              src: nowMarker,
              size: {
                width: 1,
                height: 1,
              },
            }}
          ></MapMarker>
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

          {filteredCafe.map((cafe, index) => (
            <div>
              <MapMarker
                key={index}
                position={{ lat: cafe.lat, lng: cafe.lng }} // 마커를 표시할 위치
                image={{
                  src: cafeMarker, // 마커이미지의 주소입니다
                  size: {
                    width: 80,
                    height: 90,
                  }, // 마커이미지의 크기입니다
                }}
                clickable={true}
                onClick={() => {
                  setIsOpen(true);
                  setIsClickIdx(index);
                }}
              >
                {isOpen && index === isClickIdx && (
                  <div className=" w-72 h-72">
                    <div
                      className="absolute right-2 top-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <LuX size={25} />
                    </div>
                    <Link to={`/coffeecafe/${cafe.id}`}>
                      <div className="flex flex-col items-center justify-center w-full h-full mt-1">
                        {cafe.coffeecafeimage_set.length ? (
                          <div className="w-2/3 mb-2">
                            <img
                              className="object-cover w-full h-full rounded-lg"
                              src={cafe.coffeecafeimage_set[0].image}
                            />
                          </div>
                        ) : (
                          <div></div>
                        )}

                        <div className="text-xl font-bold">{cafe.name}</div>
                        <div>
                          <Stars score={cafe.total_score} size="small" />
                        </div>
                        <div className="text-base">{cafe.address}</div>
                      </div>
                    </Link>
                  </div>
                )}
              </MapMarker>
            </div>
          ))}
        </Map>
      </div>
    </div>
  );
}

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
