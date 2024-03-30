import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
export default function CoffeeCafe() {
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

  return (
    <>
      <div>
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
              height: "90vh",
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
            <MapMarker position={nowState.center}></MapMarker>
            <MapMarker position={markerState.center}></MapMarker>
          </Map>
        </div>
      </div>
    </>
  );
}
