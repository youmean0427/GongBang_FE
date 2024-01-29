import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCoffeeCafeDetailAPI, getReview, userAPI } from "../apis/api";
import {  deleteReview } from "../apis/api";
import { Link, useParams } from 'react-router-dom';
import "./CafeDetail.css"
import CardContainer from "../components/card/CardContainer";
import { Circle, Map, MapMarker } from 'react-kakao-maps-sdk';
export default function CafeDetail(){
    let accessToken = localStorage.getItem("access_token")
    const { id } = useParams();
    const title = ["통합 리뷰", "분위기", "좌석", "콘센트"]
    const [filteredReviewOne, setFilteredReviewOne ] = useState([])

    const { isFetching, data } = useQuery({
        queryKey: ['getCoffeeCafeDetail'],
        queryFn: () => getCoffeeCafeDetailAPI(id),
        
      });
    
    const { isLoading, data : userInfo } = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => userAPI(),
        enabled: !!localStorage.getItem("access_token"),
      }); 
   


 

    useEffect(() => {
        if (data) {
            const filteredOne = data.review_set.filter(review => review.type === 1)
            setFilteredReviewOne(filteredOne)
        }
      
    }, [data])


    // console

    console.log(data)

    // if (isLoading)  return <></>
    if (isFetching) return <></>
    return(
        <>
            <div className="cafedetail">
               
                <div className="cafedetail-info">
                    <div className="cafedetail-info-image">
                        <img src= {data.coffeecafeimage_set[0].image}/>
                    </div>
                    <div className="cafedetail-info-info">
                        <div className="cafedetail-info-total-score"> {data.total_score} </div>
                        <div className="cafedetail-info-name"> {data.name} </div>
                        <div className="cafedetail-info-address"> {data.address} </div>
                        <div className="cafedetail-info-time"> {data.time} </div>
                        {/* <div> {data.lat} </div>
                        <div> {data.lng} </div> */}
                        <div className="cafedetail-info-con">편의시설</div>
                        <div className="cafedetail-info-opt">
                            <div>
                                <div>옵션1</div>
                                <div>옵션2</div>
                                <div>옵션3</div>
                            </div>
                            <div>
                                <div>옵션1</div>
                                <div>옵션2</div>
                                <div>옵션3</div>
                            </div>
                            <div>
                                <div>옵션4</div>
                                <div>옵션5</div>
                                <div>옵션6</div>
                            </div>
                            <div>
                                <div>옵션1</div>
                                <div>옵션2</div>
                                <div>옵션3</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div> {data.coffeecafeimage_set.map((x, index) => (
                    <div key = {index}>
                        <img src = {x.image}/>
                    </div>
                ))} </div> */}
 

                <div></div>

                <div>
                    {accessToken ? <Link to = {`/coffeecafe/${data.id}/review`}>Review Test</Link> : <div></div>}
                </div>
                <div>
                    <CardContainer title={title[0]} data={data.review_set} type={2} userInfo={userInfo}/>
                    <div></div>
                </div>
                

                <hr/>

                <div className="cafedetail-map-title">카페 위치</div>
                <div className="cafedetail-map">
                    <Map
                        center={{
                            lat: data.lat,
                            lng: data.lng,
                        }}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        level={3}
                        draggable= {false}
                        >
                       
                        <MapMarker
                            position = {{
                                lat: data.lat,
                                lng: data.lng,
                            }}
                        ></MapMarker>
                    </Map>
                  
                </div>
                <hr/>
                <div>  
                    <CardContainer title={title[1]} data={filteredReviewOne} type={2} userInfo={userInfo}/>
                </div>


            </div>
        
        
        
        </>
    );

}