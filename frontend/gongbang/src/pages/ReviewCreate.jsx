import { useMutation, useQuery } from "@tanstack/react-query";
import React, {useState} from "react"
import { getCoffeeCafeDetailAPI, getCoffeeCafeDetailReviewCreateAPI, userAPI } from "../apis/api";
import { useNavigate, useParams } from "react-router-dom";
import "../components/list/ListContainer.css"
import "./Review.css"


export default function ReviewCreate() {
    const { id } = useParams();
    const getDate = new Date()
    const navigate = useNavigate();

    const today = `${getDate.getFullYear()}-${getDate.getMonth()+1 >= 10 ? getDate.getMonth() + 1  : '0' + (getDate.getMonth() + 1)}-${getDate.getDate()}`
  
    let accessToken = localStorage.getItem("access_token")

    const { isLoading: coffeeLoading, data:coffeeCafe } = useQuery({
        queryKey: ['getCoffeeCafeDetail'],
        queryFn: () => getCoffeeCafeDetailAPI(id),
      });


    const {isLoading, data} = useQuery( {
        queryKey: ['userInfo'],
        queryFn: () => userAPI(),
        enabled: !!localStorage.getItem("access_token"),
    })


    const [inputs, setInputs] = useState({
        title : "",
        content : "",
        date : "",
        score : "",
        type : "",
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
        formData.append('date', today);
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
        navigate(`/coffeecafe/${id}`)
        window.location.reload()
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
    if (coffeeLoading) return <></>
    return (
        <div className="review">
            <div>
                <div className="review-cafename">{coffeeCafe.name}</div>

                <div className="reviewcreate-title-container"><input name = "title" className= "reviewcreate-title" placeholder="제목" onChange={onChange}/></div>
                <div className="listcontainer-info">
                    <div>
                        <div><input name = "type" onChange={onChange} placeholder="타입"/></div>
                        <div><input name = "score" onChange={onChange} placeholder="점수"/></div>
                    </div>
                    <div>
                        <div>{data.username}</div>
                        <div>{today}</div>
                    </div>
                    </div>

                </div>
                    <div>
                        <div className="listcontainer-image-list">사진</div>
                            <div>
                                <div className="review-image-list">
                                    {imageList.map((image, index) => (
                                    <div className="review-image-card" key={index}>
                                        <img  src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
                                    </div>
                                    ))}
                                    
                                    {imageList.length < 3 ? <div className="review-image-input"><input className="reviewcreate_image_input" type="file" accept="image/*" multiple onChange= {handleImageChange}/></div> : <></>}
                                    
                                </div>
                            </div>
                    </div>





                    <div>
 
                        <div><textarea className= "reviewcreate_content" name="content" id="" cols="30" rows="10" onChange={onChange}></textarea></div>
                    </div>
                   
                  
                  
                

                    <div>
                        <button onClick={onClick}>제출</button>
                    </div>
                  
             
              
        </div>
    )
}