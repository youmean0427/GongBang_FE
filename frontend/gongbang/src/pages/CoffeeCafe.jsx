import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Circle, Map, MapMarker } from 'react-kakao-maps-sdk';
import { getCoffeeCafesAPI } from "../apis/api";
import { Link } from "react-router-dom";
export default function CoffeeCafe() {

    const [isOpen, setIsOpen] = useState(false)
    const [clickIdx, setClickIdx] = useState(-1)

    const [state, setState] = useState( {
        center : {
            lat: 0,
            lng: 0,
        }
    })
    const [moveState, setMoveState] = useState({
        center : {
            lat : 0,
            lng : 0,
        }
    })

    const { isLoading, data } = useQuery({
        queryKey: ['getCoffeeCafes'],
        queryFn: () => getCoffeeCafesAPI(),
      });

    console.log(data)


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition (
                position => {
                    setState(prev => ({
                        ...prev,
                        center: {
                          lat: position.coords.latitude,
                          lng: position.coords.longitude,
                        },
                        isLoading: false,
                    }))
                    setMoveState(prev => ({
                        ...prev,
                        center: {
                          lat: position.coords.latitude,
                          lng: position.coords.longitude,
                        },
                        isLoading: false,
                    }))
                }
            )
        } else {
            setState(prev => ({
              ...prev,
              errMsg: '현재 위치 정보를 받아올 수 없습니다',
              isLoading: false,
            }));
        }
    }, []);
    console.log(state, moveState)

    if (isLoading) return<></>
    return (
        <>
        <div>

            <div>
                <div>List</div>
                <div>

                    ListBox
                </div>

                <div>
                    <Map // 지도를 표시할 Container
                        center={{
                            // 지도의 중심좌표
                            lat: state.center.lat,
                            lng: state.center.lng,
                        }}
                        style={{
                            // 지도의 크기
                            width: "100%",
                            height: "450px",
                        }}
                        level={4}
                        onClick= {(_t, mouseEvent) => setMoveState({ center: {
                            lat: mouseEvent.latLng.getLat(),
                            lng: mouseEvent.latLng.getLng(),
                          }})}
                        
                        >
                        
                    
                        <Circle
                                center={state.center}
                                radius={5000}
                                strokeWeight={1}
                                strokeColor="#ffd80b"
                                strokeOpacity={0.1}
                                strokeStyle="solid"
                                fillColor="#ffd80b"
                                fillOpacity={0.2}
                            />
                        <MapMarker
                            position = {state.center}
                        
                        ></MapMarker>
                        <MapMarker
                            position = {moveState.center}
                        
                        ></MapMarker>
                         {data.map((cafe, index) => (
        
                            <MapMarker
                            key={index}
                            position={{lat:cafe.lat, lng:cafe.lng}} // 마커를 표시할 위치
                            image={{
                                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                                size: {
                                width: 24,
                                height: 35
                                }, // 마커이미지의 크기입니다
                            }}
                            clickable = {true}
                            onClick={() => {setIsOpen(true); setClickIdx(index)}}
                            >
                            {isOpen && index === clickIdx && (
                            <div style={{ minWidth: "150px" }}>
                                <img
                                alt="close"
                                width="14"
                                height="13"
                                src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                                style={{
                                    position: "absolute",
                                    right: "5px",
                                    top: "5px",
                                    cursor: "pointer",
                                }}
                                onClick={() => setIsOpen(false)}
                                />
                                 <Link to= {`/coffeecafe/${cafe.id}`}>
                                <div style={{ padding: "5px", color: "#000" }}>{cafe.name}</div>
                                </Link>
                                {cafe.coffeecafeimage_set.length ? 
                                <div><img src={cafe.coffeecafeimage_set[0].image}/></div>:<div></div>}
                            </div>
                            )}
                            </MapMarker>
                        ))}
                    </Map>
                </div>
                    
                
            </div>


            <div>
                <div>Map</div>
            
            
            
            </div>


        </div>
        
        
        </>
    );
}