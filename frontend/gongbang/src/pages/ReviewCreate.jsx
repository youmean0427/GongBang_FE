import React, {useState} from "react"

export default function ReviewCreate() {

    const [inputs, setInputs] = useState({
        title : "",
        content : "",
        date : "",
        score : "",
        type : "",
        image : ""
    })
    
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
        // for (let value of formData.values()) {
        //     console.log(value)
        // }
    }





    return (
        <>
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
           <div>사진</div>
        </div>
        <div><button onClick={onClick}>제출</button></div>

        
        </>
    )
}