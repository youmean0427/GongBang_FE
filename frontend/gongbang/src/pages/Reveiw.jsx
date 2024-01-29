import { useQuery } from "@tanstack/react-query"
import React from "react"
import { getAllReveiw, getCoffeeCafeDetailAPI, getReview } from "../apis/api"
import { useParams } from "react-router-dom";

export default function Review() {
    const { id } = useParams();

    const { isLoading, data } = useQuery({
        queryKey: ['getCoffeeCafeDetail'],
        queryFn: () => getCoffeeCafeDetailAPI(id),
      });
    
    console.log(data)
    return (
    <div>
        <div>
            <div>전체 리뷰</div>
            {data ? data.review_set.map((x) => (
            <div>
                <div>{x.user}</div>
                <div>{x.title}</div>
                <div>{x.content}</div>
            
            </div>)):<></>}
            <div>hi</div>
            <div></div>
        </div>
    </div>
    )
}