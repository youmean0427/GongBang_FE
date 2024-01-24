import React, { useState } from "react";
import '../card/Card.css'
import ItemsCarousel from 'react-items-carousel'
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteReview, getCoffeeCafesAPI } from "../../apis/api";
import { Link } from "react-router-dom";
import Review from "../../pages/Reveiw";

export default function CardContainer({title, data, type, chevronWidth, userInfo} ) {
    const [activeItemIndex, setActiveItemIndex] = useState(0);

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
    
    if (type === 1) return (
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

    if (type== 2) return (<>

        <div className= "cardcontainer" style={{ padding: `0 0px` }}>
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
            <Link to= {``}  style={{ textDecoration: "none" }} key={data}>
            <div>
                <div className="cardcontainer-card-item"> {data.reviewimage_set.length ?
                    <img className="cardcontainer-coffecafe-image" src = {data.reviewimage_set[0].image} alt="Cafe" />: <div></div>}</div>
                <div>{data.score}</div>
                <div>{data.title}</div>
                <div>{data.user}</div>
                <div>
                {userInfo ? <> {userInfo.username === data.user ? <>
                <Link to = {`/review/${data.id}`}><button >Update</button></Link>
                <button onClick={() => handleDelete(data.id)}>Del</button> </> : 
                <></>} </>: <></> }</div>

            </div>
          
            </Link>
        ))}
        </ItemsCarousel>
    </div>
    
    
    
    </>);
    
}
