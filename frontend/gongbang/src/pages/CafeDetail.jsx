import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCoffeeCafeDetailAPI } from "../apis/api";
import { useParams } from 'react-router-dom';

export default function CafeDetail(){
    const { id } = useParams();
    const { isLoading, data } = useQuery({
        queryKey: ['getCoffeeCafeDetail'],
        queryFn: () => getCoffeeCafeDetailAPI(id),
      });
    if (isLoading) return;
    console.log(data)
    return(
        <>
            <div>
                
                <div> {data.name} </div>
                <div> {data.address} </div>
                <div> {data.total_score} </div>
                <div> {data.time} </div>
                <div> {data.lat} </div>
                <div> {data.lng} </div>









            </div>
        
        
        
        </>
    );

}