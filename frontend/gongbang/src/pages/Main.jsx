import React from "react"
import Banner from "../components/common/Banner"
import CardContainer from "../components/card/CardContainer"
import './Main.css'
import { getCoffeeCafesAPI } from "../apis/api";
import { useQuery } from "@tanstack/react-query";

export default function Main() {

    const { isLoading, data } = useQuery({
        queryKey: ['getCoffeeCafes'],
        queryFn: () => getCoffeeCafesAPI(),
      });
    
    if (isLoading) return
    return (
        <>
        <div>
            <div><Banner /></div>
            <div className="main-cardcontainer"><CardContainer title={"No1"} data={data} /></div>
            <div className="main-cardcontainer"><CardContainer title={"No2"} data={data} /></div>
            <div className="main-cardcontainer"><CardContainer title={"No3"} data={data}/></div>
            <div className="main-cardcontainer"><CardContainer title={"No4"} data={data}/></div>
        </div>
        </>
    )
}