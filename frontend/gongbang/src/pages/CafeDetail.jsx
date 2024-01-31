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
    const title = ["통합 리뷰", "분위기", "좌석", "음료", "콘센트"]
    const [filteredReviewOne, setFilteredReviewOne ] = useState([])
    const [filteredReviewTwo, setFilteredReviewTwo ] = useState([])
    const [filteredReviewThr, setFilteredReviewThr ] = useState([])
    const [filteredReviewFou, setFilteredReviewFou ] = useState([])
    const [nowImage, setNowImage] = useState()

 
    const [totalScore, settotalScore] = useState(0)
    const [oneScore, setOneScore] = useState(0)
    const [twoScore, setTwoScore] = useState(0)
    const [thrScore, setThrScore] = useState(0)
    const [fouScore, setFouScore] = useState(0)

    const { isFetching, data } = useQuery({
        queryKey: ['getCoffeeCafeDetail'],
        queryFn: () => getCoffeeCafeDetailAPI(id),
        
      });
    
    const { isLoading, data : userInfo } = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => userAPI(),
        enabled: !!localStorage.getItem("access_token"),
      }); 
   

    const handleNowImage = (x) => {
        setNowImage(x)
    }
    
 

    useEffect(() => {
        if (data) {
            setNowImage(data.coffeecafeimage_set[0].image)

            const filteredOne = data.review_set.filter(review => review.type === 1)
            setFilteredReviewOne(filteredOne)
            const filteredTwo = data.review_set.filter(review => review.type === 2)
            setFilteredReviewTwo(filteredTwo)
            const filteredThr = data.review_set.filter(review => review.type === 3)
            setFilteredReviewThr(filteredThr)
            const filteredFou = data.review_set.filter(review => review.type === 4)
            setFilteredReviewFou(filteredFou)



            if (data.review_set.length) {
                const totalScoreArr = []
                data.review_set.map(x => {
                    totalScoreArr.push(x.score)
                })
                const totalScoreVal = totalScoreArr.reduce((a, b) => a += b)
                settotalScore(Math.round(totalScoreVal / totalScoreArr.length))
            }


            setOneScore(ReviewCount(filteredOne))
            setTwoScore(ReviewCount(filteredTwo))
            setThrScore(ReviewCount(filteredThr))
            setFouScore(ReviewCount(filteredFou))
            

        }
      
    }, [data])

    function ReviewCount(data) {
        if (data.length) {
            const scoreArr = []
            data.map(x => {
                scoreArr.push(x.score)
            })
            const scoreVal = scoreArr.reduce((a, b) => a+= b)
            return Math.round(scoreVal / data.length)}
        else {
            return 0
        }
    }


    if (isFetching) return <></>
    return(
        <>
            <div className="cafedetail">
               
                <div className="cafedetail-info">
                    <div className="cafedetail-info-image">
                        <div className="cafedetail-info-image-col">
                                {data.coffeecafeimage_set.map(x => (
                                <div onClick={() => {handleNowImage(x.image)}}>
                                    <img src= {x.image}/>
                                </div>
                                ))}
                                {data.coffeecafeimage_set.length === 1 ? <><div></div><div></div></> : <></>}
                                {data.coffeecafeimage_set.length === 2 ? <><div></div></> : <></>}
                        </div>
                    
                   
                        <div className="cafedetail-info-image-main">
                           <img src= {nowImage}/>
                        </div>
                    </div>

                    <div className="cafedetail-info-info">
                        <div className="cafedetail-info-total-score"> {totalScore} </div>
                        <div className="cafedetail-info-name"> {data.name} </div>
                        <div className="cafedetail-info-address"> {data.address} </div>
                        <div className="cafedetail-info-time"> {data.time} </div>
                        {/* <div> {data.lat} </div>
                        <div> {data.lng} </div> */}
                        <hr/>
                        <div className="cafedetail-info-con">편의시설</div>
                        <div className="cafedetail-info-opt">
                            <div>
                                <div className="cafedetail-info-opt-title" >분위기</div>
                                <div className="cafedetail-info-opt-title">음료</div>
                    
                            </div>
                            <div>
                                <div className="cafedetail-info-opt-score">{oneScore}</div>
                                <div className="cafedetail-info-opt-score">{thrScore}</div>
                            
                            </div>
                            <div>
                                <div className="cafedetail-info-opt-title">좌석</div>
                                <div className="cafedetail-info-opt-title">콘센트</div>
                                
                            </div>
                            <div>
                                <div className="cafedetail-info-opt-score">{twoScore}</div>
                                <div className="cafedetail-info-opt-score">{fouScore}</div>
                              
                            </div>
                        </div>
                        <div className="cafedetail-info-opt">
                            <div>
                                <div className="cafedetail-info-opt-title">와이파이</div>
                                <div className="cafedetail-info-opt-title">주차</div>
                            </div>
                            <div>
                                <div className="cafedetail-info-opt-score">유</div>
                                <div className="cafedetail-info-opt-score">유</div>
                            </div>
                            <div>
                                <div className="cafedetail-info-opt-title">화장실</div>
                                <div className="cafedetail-info-opt-title">주차</div>
                            </div>
                            <div>
                                <div className="cafedetail-info-opt-score">유</div>
                                <div className="cafedetail-info-opt-score">무</div>
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
                    <CardContainer title={title[2]} data={filteredReviewTwo} type={2} userInfo={userInfo}/>
                    <CardContainer title={title[3]} data={filteredReviewThr} type={2} userInfo={userInfo}/>
                    <CardContainer title={title[4]} data={filteredReviewFou} type={2} userInfo={userInfo}/>

                </div>


            </div>
        
        
        
        </>
    );

}