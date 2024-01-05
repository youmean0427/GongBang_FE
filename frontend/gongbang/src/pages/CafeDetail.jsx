import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCoffeeCafeDetailAPI } from "../apis/api";
import {  deleteReview } from "../apis/api";
import { Link, useParams } from 'react-router-dom';

export default function CafeDetail(){

    const { id } = useParams();

    const { isFetching, data } = useQuery({
        queryKey: ['getCoffeeCafeDetail'],
        queryFn: () => getCoffeeCafeDetailAPI(id),
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

    if (isFetching) return <></>
    return(
        <>
            <div>
                <div>
                    <Link to = {`/coffeecafe/${data.id}/review`}>Review Test</Link>
                </div>
                <div> {data.name} </div>
                <div> {data.address} </div>
                <div> {data.total_score} </div>
                <div> {data.time} </div>
                <div> {data.lat} </div>
                <div> {data.lng} </div>
                <div>

                </div>
 
                <div>
                    {data.review_set.map((x, index) => (
                            <div key={x.id}>
                            
                                {x.title}
                                {x.reviewimage_set.map((x, index) => (
                                    <div key = {x.id}>
                                      <img src={x.image} alt="Cafe" />
                                    </div>
                                ))}
                               
                                <Link to = {`/review/${x.id}`}><button >Update</button></Link>
                                
                                <button onClick={() => handleDelete(x.id)}>Del</button> 
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