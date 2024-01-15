import React, { useState } from "react";
import '../card/Card.css'
import ItemsCarousel from 'react-items-carousel'
import { useQuery } from "@tanstack/react-query";
import { getCoffeeCafesAPI } from "../../apis/api";
import { Link } from "react-router-dom";

export default function CardContatiner({title}) {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 100

    const { isLoading, data } = useQuery({
        queryKey: ['getCoffeeCafes'],
        queryFn: () => getCoffeeCafesAPI(),
      });


    if (isLoading) return;

    return (
        <>

        <div style={{ padding: `0 ${chevronWidth}px` }}>
        <div>{title}</div>
        <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={4}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
        >
        {data.map((data) => (
            <Link to= {`coffeecafe/${data.id}`}  key={data}>
            <div className="card-item" >
                {data.coffeecafeimage_set.length ?
                <img src = {data.coffeecafeimage_set[0].image} alt="Cafe" />: <></>}
                <div>{data.name}</div>
                
            </div>
            </Link>
        ))}
        </ItemsCarousel>
    </div>
        </>

    
    );
}