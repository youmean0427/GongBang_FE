import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Circle, Map, MapMarker } from 'react-kakao-maps-sdk';
import { getCoffeeCafesAPI } from "../apis/api";
import { Link } from "react-router-dom";
import "./CoffeeCafe.css"
import logoImage from '../images/gongbang_logo.png';
import CardContainer from "../components/card/CardContainer";
export default function CoffeeCafe() {

    const [isOpen, setIsOpen] = useState(false)
    const [clickIdx, setClickIdx] = useState(-1)
    const [filteredCafe, setFilteredCafe] = useState([])

    // 현재 위치
    const [state, setState] = useState( {
        center : {
            lat: 0,
            lng: 0,
        }
    })

    // 마커 위치
    const [moveState, setMoveState] = useState({
        center : {
            lat : 0,
            lng : 0,
        }
    })

    const { isLoading, data } = useQuery({
        queryKey: ['getCoffeeCafes'],
        queryFn: () => getCoffeeCafesAPI(1),
      });

    useEffect(() => {
        if (data) {
            const filtered = data.filter(cafe => {
                const distance = CalculateDistance(moveState.center.lat, moveState.center.lng, cafe.lat, cafe.lng)
                return distance <= 5  // km
            })
            setFilteredCafe(filtered)
        }
    }, [moveState, data]);
    
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition (
                position => {
                    setState( prev => ({ ...prev, center: {lat: position.coords.latitude, lng: position.coords.longitude,}, isLoading: false,}))
                    setMoveState(prev => ({...prev, center: {lat: position.coords.latitude, lng: position.coords.longitude,}, isLoading: false,}))
                })
        } else {
            setState(prev => ({...prev, errMsg: '현재 위치 정보를 받아올 수 없습니다', isLoading: false, }));
    }}, [])


    if (isLoading) return<></>
    return (
        <>
        <div className="coffeecafe">

         
              
           
          


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
                            height: "80vh",
                        }}
                        level={5}
                        onClick= {(_t, mouseEvent) => setMoveState({ center: {
                            lat: mouseEvent.latLng.getLat(),
                            lng: mouseEvent.latLng.getLng(),
                          }})}
                        
                        >
                    
                        <Circle
                                center={moveState.center}
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

                         {filteredCafe.map((cafe, index) => (
        
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
                            <div className="coffeecafe-map-modal">
                               
                               <div className="coffeecafe-map-modal-close" onClick={() => setIsOpen(false)}>X</div>
                                {cafe.coffeecafeimage_set.length ? 
                                <div className="coffeecafe-map-modal-image-container"><img className = "coffeecafe-map-modal-image"src={cafe.coffeecafeimage_set[0].image}/></div>:<div></div>}
                                <div className="coffeecafe-map-modal-info">
                                    <Link to= {`/coffeecafe/${cafe.id}`}>
                                        <div className="coffeecafe-map-modal-info-flex">
                                            <div className="coffeecafe-map-modal-name">{cafe.name}</div>
                                            <div className="coffeecafe-map-modal-score">{cafe.total_score}</div>
                                        </div>
                                        <div className="coffeecafe-map-modal-info-flex">
                                            <div className="coffeecafe-map-modal-address">{cafe.address}</div></div>
                                    </Link>
                                </div>
                            </div>
                            )}
                            </MapMarker>
                        ))}
                    </Map>
            </div>
            <div>
                
            </div>
                
       



        </div>
        
        
        </>
    );
}


function CalculateDistance(lat1, lon1, lat2, lon2) {
    
    const R = 6371
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

    return R * c
}

function deg2rad(deg) { return deg * (Math.PI/180)}