import React, { useEffect, useState } from "react";
import { deleteReview } from "../../apis/api";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import "../list/ListContainer.css"
export default function ListContainer({data, userInfo}) {
    const typeCode = {1: "분위기", 2: "좌석", 3: "음료", 4: "콘센트"}
    const [images, setImages] = useState([])

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

    useEffect(() => {
        data.reviewimage_set.map(x => {
            setImages([...images, x])
        })
    }, [])
    console.log(images)
    return (
    <div className="listcontainer">
        <div>
            <div className="listcontainer-info-title-line">
                <div className="listcontainer-info-title">{data.title}</div>
                <div>
                    {userInfo ? <> {userInfo.username === data.user ? <>
                    <Link to = {`/review/${data.id}`}><button >Update</button></Link>
                    <button onClick={() => handleDelete(data.id)}>Del</button> </> : 
                    <></>} </>: <></> }
                </div>

            </div>
            
            <div className="listcontainer-info">
            
                <div>
                    
                    <div>{typeCode[data.type]}</div>
                    <div className="listcontainer-info-score">{data.score}</div>
                </div>
                <div>
                    <div className="listcontainer-info-user">{data.user}</div>
                    <div className="listcontainer-info-date">{data.date}</div>
                </div>
            </div>
            
            <div>
                <div className="listcontainer-image-list">
                
                    {data.reviewimage_set.map(x => (
                        <div>
                            <img src = {x.image}/> 
                        </div>
                    )
                    )} 
                    { data.reviewimage_set.length == 2 ? <div></div> : <></>}
                    { data.reviewimage_set.length == 1 ? <><div></div><div></div></> : <></>}
                </div>
            </div>

            <div className="listcontainer-info-content">
                {data.content}
            </div>

            



        </div>




    </div>
    )
}