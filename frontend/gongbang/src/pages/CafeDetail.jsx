import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCoffeeCafeDetailAPI, userAPI } from "../apis/api";
import {  deleteReview } from "../apis/api";
import { Link, useParams } from 'react-router-dom';
import "./CafeDetail.css"
export default function CafeDetail(){
    let accessToken = localStorage.getItem("access_token")
    const { id } = useParams();

    const { isFetching, data } = useQuery({
        queryKey: ['getCoffeeCafeDetail'],
        queryFn: () => getCoffeeCafeDetailAPI(id),
        
      });
    
    const { isLoading, data : userInfo } = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => userAPI(),
        enabled: !!localStorage.getItem("access_token"),
      }); 
   
    const reviewDeleteMutation = useMutation 
    (['deleteReview'],  (x) => deleteReview(x), {
        onSuccess: () => {
            window.location.reload()
        }
    }
    )


    const handleDelete = (x) => {
        reviewDeleteMutation.mutate(x)
    }

    // console
    console.log(userInfo)
    console.log(data)

    // if (isLoading)  return <></>
    if (isFetching) return <></>
    return(
        <>
            <div className="cafedetail">
                <div>
                    {accessToken ? <Link to = {`/coffeecafe/${data.id}/review`}>Review Test</Link> : <div></div>}
                </div>
                <div className="cafedetail-info">
                    <div className="cafedetail-info-image">
                        <img src= {data.coffeecafeimage_set[0].image}/>
                    </div>
                    <div className="cafedetail-info-info">
                        <div> {data.name} </div>
                        <div> {data.address} </div>
                        <div> {data.total_score} </div>
                        <div> {data.time} </div>
                        <div> {data.lat} </div>
                        <div> {data.lng} </div>
                    </div>
                </div>

                {/* <div> {data.coffeecafeimage_set.map((x, index) => (
                    <div key = {index}>
                        <img src = {x.image}/>
                    </div>
                ))} </div> */}
 

                
                // Review
                <div>
                    {data.review_set.map((x, index) => (
                            <div key={x.id}>
                            
                                {x.title}
                                {x.reviewimage_set.map((x, index) => (
                                    <div key = {x.id}>
                                    
                                      <img src={x.image} alt="Cafe" />
                                    </div>
                                ))}
                                {userInfo ? <>
                                {userInfo.username === x.user ? <>

                                <Link to = {`/review/${x.id}`}><button >Update</button></Link>
                                
                                <button onClick={() => handleDelete(x.id)}>Del</button> 
                                </> : <></>}</>: <></> }

                                <hr/>
                            </div>
                    ))
                    }
                </div>
                <hr/>







            </div>
        
        
        
        </>
    );

}