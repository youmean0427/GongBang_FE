import React, { useEffect, useState } from "react";
import { Map, MapMarker } from 'react-kakao-maps-sdk';
export default function CoffeeCafe() {
    const [state, setState] = useState( {
        center : {
            lat: 0,
            lng: 0,
        }
    })
    // Data 
    const positions = [
        {
            title: "카카오",
            latlng: {lat :  36.0888342, lng:129.2716482},
        }
    ]


    
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
                        >
                        <MapMarker // 마커를 생성합니다
                            position={{
                            // 마커가 표시될 위치입니다
                            lat: state.center.lat,
                            lng: state.center.lng,
                            }}
                        />
                         {positions.map((position, index) => (
                            <MapMarker
                            key={`${position.title}-${position.latlng}`}
                            position={position.latlng} // 마커를 표시할 위치
                            image={{
                                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                                size: {
                                width: 24,
                                height: 35
                                }, // 마커이미지의 크기입니다
                            }}
                            title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                            />
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