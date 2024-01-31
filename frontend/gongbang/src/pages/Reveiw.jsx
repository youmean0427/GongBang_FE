import { useQuery } from "@tanstack/react-query"
import React from "react"
import { getAllReveiw, getCoffeeCafeDetailAPI, getReview, userAPI } from "../apis/api"
import { useParams } from "react-router-dom";
import ListContainer from "../components/list/ListContainer";
import "./Review.css"

export default function Review() {
    const { id } = useParams();

    const { isLoading, data } = useQuery({
        queryKey: ['getCoffeeCafeDetail'],
        queryFn: () => getCoffeeCafeDetailAPI(id),
      });

    const { isFetched, data : userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userAPI(),
    enabled: !!localStorage.getItem("access_token"),
    }); 

    console.log(data)
    if (isLoading) return;
    return (
    <div className="review">
        <div>
            <div className="review-cafename">{data.name}</div>
            <div className="review-cafescore">{data.total_score}</div>
            <div className="review-count">{data.review_set.length}개의 리뷰</div>

            {data ? data.review_set.map((x) => (
            <div>
                <ListContainer data={x} userInfo={userInfo} />
            
            </div>)):<></>}
    
            <div></div>
        </div>
    </div>
    )
}