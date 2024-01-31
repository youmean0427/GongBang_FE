import React, { useState } from "react";
import '../card/Card.css'
import ItemsCarousel from 'react-items-carousel'
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteReview, getCoffeeCafesAPI, userAPI } from "../../apis/api";
import { Link } from "react-router-dom";
import Review from "../../pages/Reveiw";
import ListContainer from "../list/ListContainer";

export default function CardContainer({title, data, type, chevronWidth, userInfo} ) {
    const [activeItemIndex, setActiveItemIndex] = useState(0);

    const reviewDeleteMutation = useMutation 
    (['deleteReview'],  (x) => deleteReview(x), {
        onSuccess: () => {
            window.location.reload()
        }
    }
    )

    const { isLoading, data : logined } = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => userAPI(),
        enabled: !!localStorage.getItem("access_token"),
      }); 
   

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
        <div className="cardcontainer-title-container">
            <div className="cardcontainer-title">{title}</div>
            <div className="cardcontainer-title-container-review">
                {logined ? <div className="cardcontainer-review-create"><Link to = {`review`}>리뷰 작성하기</Link></div> : <div></div>}
                <div>|</div>
                <div className="cardcontainer-review-all"><Link to={`review/all`} >모든 리뷰 보기</Link></div>
            </div>
        </div>
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
            {/* Modal */}
            <div><ListContainer data={data} userInfo={userInfo}/></div>

            
            </Link>
        ))}
        </ItemsCarousel>
    </div>
    
    
    
    </>);
    
}
