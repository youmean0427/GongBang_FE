import React, { useEffect, useState } from "react";
import { Map, MapMarker } from 'react-kakao-maps-sdk';
export default function CoffeeCafe() {
    const [state, setState] = useState( {
        center : {
            lat: 0,
            lng: 0,
        }
    })

    const [isOpen, setIsOpen] = useState(false)
    const [clickIdx, setClickIdx] = useState(-1)

    // Data 
    const positions = [
        {
            latlng: {lat :  36.0888342, lng:129.2716482},
        },
        {
            latlng: {lat :  36.0888342, lng:129.3716482},
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
                    
                         {positions.map((position, index) => (
                            <MapMarker
                            key={index}
                            position={position.latlng} // 마커를 표시할 위치
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
                                <div style={{ padding: "5px", color: "#000" }}>{position.latlng.lng}</div>
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