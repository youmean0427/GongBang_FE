import React, { useState } from "react";
import '../card/Card.css'
import ItemsCarousel from 'react-items-carousel'
import { useQuery } from "@tanstack/react-query";
import { getCoffeeCafesAPI } from "../../apis/api";
import { Link } from "react-router-dom";

export default function CardContainer({title, data}) {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 300

   



    return (
        <>

        <div className= "cardcontainer" style={{ padding: `0 ${chevronWidth}px` }}>
        <div className="cardcontainer-title">{title}</div>

        <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={4}
        gutter={20}
        leftChevron={<button >{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
        >

        {data.map((data) => (
            <Link to= {`coffeecafe/${data.id}`}  style={{ textDecoration: "none" }} key={data}>
            <div>
                <div className="cardcontainer-card-item"> {data.coffeecafeimage_set.length ?
                    <img className="cardcontainer-coffecafe-image" src = {data.coffeecafeimage_set[0].image} alt="Cafe" />: <div></div>}</div>
                <div>{data.total_score}</div>
                <div>{data.name}</div>
                <div>{data.address}</div>
                
            </div>
            </Link>
        ))}
        </ItemsCarousel>
    </div>
        </>

    
    );
}