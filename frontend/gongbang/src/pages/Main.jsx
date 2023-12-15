import React from "react"
import Banner from "../components/common/Banner"
import CardContatiner from "../components/card/CardContainer"


export default function Main() {

    return (
        <>
        <div>
            <div><Banner /></div>
            <div><CardContatiner title={"No1"} /></div>
            <div><CardContatiner title={"No2"} /></div>
            <div><CardContatiner title={"No3"} /></div>
            <div><CardContatiner title={"No4"} /></div>
        
        </div>
        </>
    )
}