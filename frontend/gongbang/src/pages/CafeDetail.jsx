import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCoffeeCafeDetailAPI } from "../apis/api";
import { getCoffeeCafeDetailReviewCreateAPI } from "../apis/api";
import { Link, useParams } from 'react-router-dom';

export default function CafeDetail(){
    const { id } = useParams();
    const { isLoading, data } = useQuery({
        queryKey: ['getCoffeeCafeDetail'],
        queryFn: () => getCoffeeCafeDetailAPI(id),
      });

    const reviewCreateMutation = useMutation
      (['getCoffeeCafeDetailReviewCreateAPI'],
      (formData) => getCoffeeCafeDetailReviewCreateAPI(id, formData),
      {
          onSuccess: (res) => {
              console.log(res, "Success")
          },
          onError : (res) => {
              console.log(res, "Error")
          }
      }
       )

    if (isLoading) return;

    const onClick = (x) => {
        const formData = new FormData();
        formData.append('delete_id', x)
        reviewCreateMutation.mutate(formData)
    }

    console.log(data)

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
                                <button onClick={() => onClick(x.id)}>Del</button>
                                {x.title}
                                {x.reviewimage_set.map((x, index) => (
                                    <div key = {x.id}>
                                      <img src={x.image} alt="Cafe" />
                                    </div>
                                ))}
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