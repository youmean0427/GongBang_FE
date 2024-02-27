import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import {
  deleteReviewImage,
  getCoffeeCafeDetailAPI,
  getCoffeeCafeDetailReviewCreateAPI,
  getReview,
  userAPI,
} from '../apis/api'
import { useNavigate, useParams } from 'react-router-dom'
import '../components/list/ListContainer.css'
import './Review.css'

export default function ReviewU() {
  const { id } = useParams()
  const getDate = new Date()
  const navigate = useNavigate()

  const today = `${getDate.getFullYear()}-${
    getDate.getMonth() + 1 >= 10
      ? getDate.getMonth() + 1
      : '0' + (getDate.getMonth() + 1)
  }-${getDate.getDate()}`

  let accessToken = localStorage.getItem('access_token')

  const { isLoading: coffeeLoading, data: coffeeCafe } = useQuery({
    queryKey: ['getCoffeeCafeDetail'],
    queryFn: () => getCoffeeCafeDetailAPI(id),
  })

  const { isLoading, data } = useQuery({
    queryKey: ['getReview'],
    queryFn: () => getReview(id),
  })

  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    date: '',
    score: '',
    type: 1,
  })

  useEffect(() => {
    if (data) {
      setInputs({
        title: data.title,
        content: data.content,
        date: data.date,
        score: data.score,
        type: data.type,
        user: data.user,
      })
      setImageList(data.reviewimage_set)
      const targetValue = data.type
      const foundType = typeList.find((item) => item.value === targetValue)
      setTypeSelect(foundType.name)
    }
  }, [data])

  const [imageList, setImageList] = useState([])
  const typeList = [
    { value: 1, name: '분위기' },
    { value: 2, name: '좌석' },
    { value: 3, name: '음료' },
    { value: 4, name: '콘센트' },
  ]

  const onChange = (e) => {
    const { name, value } = e.target
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  console.log(inputs)

  const onClick = () => {
    const formData = new FormData()
    formData.append('title', inputs.title)
    formData.append('content', inputs.content)
    formData.append('date', today)
    formData.append('score', inputs.score)
    formData.append('type', inputs.type)
    formData.append('user', data.username)
    for (let i = 0; i < imageList.length; i++) {
      formData.append('image', imageList[i])
    }
    // * FormData Check *
    // for (let value of formData.values()) {
    //     console.log(value)
    // }

    reviewCreateMutation.mutate(formData)
    navigate(`/coffeecafe/${id}`)
    window.location.reload()
  }

  const reviewCreateMutation = useMutation(
    ['getCoffeeCafeDetailReviewCreateAPI'],
    (formData) =>
      getCoffeeCafeDetailReviewCreateAPI(data.cafe, formData, data.id),
    {
      onSuccess: (res) => {
        console.log(res, 'Success')
      },
      onError: (res) => {
        console.log(res, 'Error')
      },
    },
  )

  const handleImageChange = (event) => {
    const files = event.target.files
    let imageUrl = [...imageList]
    for (let i = 0; i < files.length; i++) {
      imageUrl.push(files[i])
      // * Blob *
      // imageUrl.push(URL.createObjectURL(files[i]))
    }
    setImageList(imageUrl)
  }

  const [typeSelect, setTypeSelect] = useState('분위기')
  const handleTypeSelect = (event) => {
    setInputs({
      ...inputs,
      type: event.target.value,
    })
    setTypeSelect(event.target.value)
  }

  const imageDeleteMutation = useMutation(
    ['deleteReviewImage'],
    (x) => deleteReviewImage(x),
    {
      onSuccess: () => {},
    },
  )
  const handleDelete = (x) => {
    // const image = []
    // imageList.forEach(item => {
    //     if (item.id != x) {
    //         image.push(item)
    //     }
    // })
    // setImageList(image)
    setImageList((image) => image.filter((item) => item.id !== x))

    imageDeleteMutation.mutate(x)
  }

  console.log(imageList)
  if (!accessToken) return <></>
  if (coffeeLoading) return <></>
  return (
    <div className="review">
      <div>
        <div className="review-cafename">{coffeeCafe.name}</div>
        <div className="reviewcreate-address">{coffeeCafe.address}</div>
        <div className="reviewcreate-title-container">
          <input
            name="title"
            className="reviewcreate-title"
            value={inputs.title}
            placeholder="제목"
            onChange={onChange}
          />
        </div>
        <div className="listcontainer-info">
          <div>
            {/* <div><input name = "type" onChange={onChange} placeholder="타입"/></div> */}
            <select
              className="reviewcreate-type-select"
              onChange={handleTypeSelect}
              value={typeSelect}
            >
              {typeList.map((item) => {
                return (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                )
              })}
            </select>
          </div>
          <div>
            <div>
              <input
                className="reviewcreate-type-select"
                name="score"
                onChange={onChange}
                value={inputs.score}
                placeholder="점수"
              />
            </div>

            <div>{/* 점수 */}</div>
            {/* <div>{data.username}</div>
                        <div>{today}</div> */}
          </div>
        </div>
      </div>
      <div className="reviewcreate-images">
        <div className="listcontainer-image-list"></div>
        <div>
          <div className="review-image-list">
            {imageList.map((image, index) => (
              <div className="review-image-card" key={index}>
                {image.id ? (
                  <img src={image.image} />
                ) : (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                  />
                )}

                {image.id ? (
                  <div>
                    <button onClick={() => handleDelete(image.id)}>Del</button>{' '}
                  </div>
                ) : (
                  <div>x</div>
                )}
              </div>
            ))}

            {imageList.length < 3 ? (
              <div className="review-image-input">
                <input
                  className="reviewcreate_image_input"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div>
        <div>
          <textarea
            className="reviewcreate_content"
            name="content"
            id=""
            cols="30"
            rows="10"
            onChange={onChange}
            value={inputs.content}
          ></textarea>
        </div>
      </div>

      <div>
        <button onClick={onClick}>제출</button>
      </div>
    </div>
  )
}
