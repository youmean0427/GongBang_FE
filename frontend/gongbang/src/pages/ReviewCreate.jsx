import { useMutation, useQuery } from "@tanstack/react-query";
import React, {useState} from "react"
import { getCoffeeCafeDetailReviewCreateAPI, userAPI } from "../apis/api";
import { useParams } from "react-router-dom";
import "./Review.css"


export default function ReviewCreate() {
    const { id } = useParams();
    let accessToken = localStorage.getItem("access_token")
    const {isLoading, data} = useQuery( {
        queryKey: ['userInfo'],
        queryFn: () => userAPI(),
        enabled: !!localStorage.getItem("access_token"),
    })


    const [inputs, setInputs] = useState({
        title : "title",
        content : "content",
        date : "2023-12-29",
        score : "5",
        type : "1",
    })

    const [imageList, setImageList] = useState([]);
    
    const onChange = (e) => {
        const {name, value} = e.target
        setInputs({
            ...inputs,
            [name] : value
        })
    }

    console.log(inputs)

    const onClick = () => {
        const formData = new FormData();
        formData.append('title', inputs.title);
        formData.append('content', inputs.content);
        formData.append('date', inputs.date);
        formData.append('score', inputs.score);
        formData.append('type', inputs.type);
        formData.append('user', data.username);
        for (let i = 0; i < imageList.length; i++) {
            formData.append('image', imageList[i]);
        }
        // * FormData Check *
        // for (let value of formData.values()) {
        //     console.log(value)
        // }

        reviewCreateMutation.mutate(formData)

    }
  
    const reviewCreateMutation = useMutation
    (['getCoffeeCafeDetailReviewCreateAPI'],
    (formData) => getCoffeeCafeDetailReviewCreateAPI(id, formData, 0),
    {
        onSuccess: (res) => {
            console.log(res, "Success")
        },
        onError : (res) => {
            console.log(res, "Error")
        }
    }
     )
     
    const handleImageChange = (event) => {
        const files = event.target.files;
        let imageUrl = [...imageList]
        for (let i = 0; i < files.length; i++) {
            imageUrl.push(files[i])
            // * Blob *
            // imageUrl.push(URL.createObjectURL(files[i]))
        }
        setImageList(imageUrl)
    };
    console.log(imageList)
    if (!accessToken) return <></>;

    return (
        <div className="reviewcreate">
            <div className="reviewcreate-image">
                <div>
                    <div>사진</div>
                        <div>
                            <div className="review-image-list">
                                {imageList.map((image, index) => (
                                <div className="review-image-card" key={index}>
                                    <img  src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
                                </div>
                                ))}
                                <div className="review-image-input">
                                <input className="reviewcreate_image_input" type="file" accept="image/*" multiple onChange= {handleImageChange}/>
                                </div>
                            </div>
                        </div>
                </div>
                </div>
            <div className="reviewcreate-info">
                <div>
                    <div>제목</div>
                    <div><input name = "title" onChange={onChange}/></div>
                    <div>내용</div> 
                    <div><input name = "content" onChange={onChange}/></div>
                    <div>날짜</div> 
                    <div><input name = "date" onChange={onChange}/></div>
                    <div>점수</div>
                    <div><input name = "score" onChange={onChange}/></div>
                    <div>타입</div>
                    <div><input name = "type" onChange={onChange}/></div>
                    <div>User</div>
                    <div>
                        {data ? <input disabled name = "user" value={data.username} onChange={onChange}/> : <div>no</div>
                        }</div>
                
                    <div><button onClick={onClick}>제출</button></div>
                    </div>
                </div>
          
        </div>
    )
}