import { useMutation, useQuery } from "@tanstack/react-query";
import React, {useEffect, useState} from "react"
import { getCoffeeCafeDetailReviewCreateAPI, getReview, userAPI } from "../apis/api";
import { useParams } from "react-router-dom";

export default function ReviewUpdate() {
    const { id } = useParams();
    
    const [imageList, setImageList] = useState([]);
    const [inputs, setInputs] = useState({
        title : "",
        content : "",
        date : "",
        score : "",
        type : "",
        user : ""
    })



    const { isLoading, data } = useQuery({
        queryKey: ['getReview'],
        queryFn: () => getReview(id),
      });

    useEffect(() => {
        if (data) {
            setInputs({
                title: data.title,
                content : data.content,
                date : data.date,
                score : data.score,
                type : data.type,
                user : data.user,
            })
            setImageList(
                data.reviewimage_set
            )
        }
    }, [data])

    const reviewCreateMutation = useMutation
    (['getCoffeeCafeDetailReviewCreateAPI'],
    (formData) => getCoffeeCafeDetailReviewCreateAPI(data.cafe, formData, data.id),
    {
          onSuccess: (res) => {
              console.log(res, "Success")
          },
          onError : (res) => {
              console.log(res, "Error")
          }
    }
    )
 
    if (isLoading) return
    
 

    const onChange = (e) => {
        const {name, value} = e.target
        setInputs({
            ...inputs,
            [name] : value
        })
    }

    const onClick = () => {
        const formData = new FormData();
        formData.append('title', inputs.title);
        formData.append('content', inputs.content);
        formData.append('date', inputs.date);
        formData.append('score', inputs.score);
        formData.append('type', inputs.type);
        formData.append('user', inputs.user);
        for (let i = 0; i < imageList.length; i++) {
            formData.append('image', imageList[i]);
        }
        // * FormData Check *
        for (let value of formData.values()) {
            console.log(value)
        }
        reviewCreateMutation.mutate(formData)
 

    }

    const handleImageChange = (event) => {
        const files = event.target.files;
        let imageUrl = []
        for (let i = 0; i < files.length; i++) {
            imageUrl.push(files[i])
            // * Blob *
            // imageUrl.push(URL.createObjectURL(files[i]))
        }
        setImageList(imageUrl)
    };

    console.log(data)
    console.log(imageList)


    return (
        <>
        <div>
           <div>제목</div>
           <div><input name = "title" value={inputs.title} onChange={onChange}/></div>
           <div>내용</div> 
           <div><input name = "content" value={inputs.content} onChange={onChange}/></div>
           <div>날짜</div> 
           <div><input name = "date" value={inputs.date}  onChange={onChange}/></div>
           <div>점수</div>
           <div><input name = "score" value={inputs.score}  onChange={onChange}/></div>
           <div>타입</div>
           <div><input name = "type" value={inputs.type} onChange={onChange}/></div>
           <div>User</div>
           <div>
            {data ? <input disabled name = "user" value={data.user} onChange={onChange}/> : <div>no</div>
            }</div>
           <div>사진</div>
           <div>
            <input type="file" accept="image/*" multiple onChange= {handleImageChange}/>
           </div>

           <div>{ imageList.map((x, idx) => (
            <div key = {idx}>
                <img src = {x.image}/>
            </div>
           ))}</div>
        </div>
        <div><button onClick={onClick}>제출</button></div>

        
        </>
    )
}