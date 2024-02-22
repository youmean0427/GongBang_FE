import React from "react"
import Banner from "../components/common/Banner"
import CardContainer from "../components/card/CardContainer"
import './Main.css'
import { getCoffeeCafesAPI } from "../apis/api";
import { useQuery } from "@tanstack/react-query";

export default function Main() {
    const { isLoading, data } = useQuery({
        queryKey: ['getCoffeeCafes'],
        queryFn: () => getCoffeeCafesAPI(1),
      });


    if (isLoading) return
    return (
        <>
        <div>
            <div><Banner /></div>
            <div className="main-cardcontainer"><CardContainer title={"🔥 핫플, 인기 있는 카페"} data={data} type={1} chevronWidth={300}/></div>
            <div className="main-cardcontainer"><CardContainer title={"🎈 풀옵션, 모든 것이 갖춰진 카페"} data={data} type={1} chevronWidth={300}/></div>
            <div className="main-cardcontainer"><CardContainer title={"✨ 새로운, 최근 오픈 신상 카페"} data={data} type={1} chevronWidth={300}/></div>
        </div>
        </>
    )
}