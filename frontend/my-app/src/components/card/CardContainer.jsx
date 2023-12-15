import React, { useState } from "react";
import '../card/Card.css'
import ItemsCarousel from 'react-items-carousel'
import { useQuery } from "@tanstack/react-query";
import { getCoffeeCafesAPI } from "../../apis/api";

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
        numberOfCards={5}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
        >
        {data.map((data) => (
    
            <div key={data} className="card-item">{data.title}</div>

        ))}
        </ItemsCarousel>
    </div>
        </>

    
    );
}