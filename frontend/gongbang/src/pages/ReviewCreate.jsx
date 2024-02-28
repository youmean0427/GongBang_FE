import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import {
  getCoffeeCafeDetailAPI,
  getCoffeeCafeDetailReviewCreateAPI,
  userAPI,
} from '../apis/api'
import { useNavigate, useParams } from 'react-router-dom'
import '../components/list/ListContainer.css'
import './Review.css'
import { LuCamera } from 'react-icons/lu'

export default function ReviewCreate({ coffeeCafe, userInfo }) {
  const { id } = useParams()
  const getDate = new Date()
  const navigate = useNavigate()

  const today = `${getDate.getFullYear()}-${
    getDate.getMonth() + 1 >= 10
      ? getDate.getMonth() + 1
      : '0' + (getDate.getMonth() + 1)
  }-${getDate.getDate()}`

  let accessToken = localStorage.getItem('access_token')

  // const { isLoading: coffeeLoading, data: coffeeCafe } = useQuery({
  //   queryKey: ['getCoffeeCafeDetailReviewCreate'],
  //   queryFn: () => getCoffeeCafeDetailAPI(id),
  // })

  // const { isLoading, data: userInfo } = useQuery({
  //   queryKey: ['userInfoReviewCreate'],
  //   queryFn: () => userAPI(),
  //   enabled: !!localStorage.getItem('access_token'),
  // })

  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    date: '',
    score: '',
    type: 1,
  })

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

  console.log(inputs, userInfo)

  const onClick = () => {
    const formData = new FormData()
    formData.append('title', inputs.title)
    formData.append('content', inputs.content)
    formData.append('date', today)
    formData.append('score', inputs.score)
    formData.append('type', inputs.type)
    formData.append('user', userInfo.pk)
    formData.append('name', userInfo.username)
    for (let i = 0; i < imageList.length; i++) {
      formData.append('image', imageList[i])
    }
    // * FormData Check *
    // for (let value of formData.values()) {
    //     console.log(value)
    // }

    reviewCreateMutation.mutate(formData)
    window.location.reload()
  }

  const reviewCreateMutation = useMutation(
    ['getCoffeeCafeDetailReviewCreateAPI'],
    (formData) => getCoffeeCafeDetailReviewCreateAPI(id, formData, 0),
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

  console.log(imageList)
  if (!accessToken) return <></>
  // if (coffeeLoading) return <></>
  return (
    <div className="review-create">
      <div>
        <div className="review-cafename">{coffeeCafe.name}</div>
        <div className="reviewcreate-address">{coffeeCafe.address}</div>
      </div>
      <div className="reviewcreate-images">
        <div className="listcontainer-image-list"></div>
        <div>
          <div className="review-image-list">
            {imageList.map((image, index) => (
              <div className="review-image-card" key={index}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                />
              </div>
            ))}

            {imageList.length < 3 ? (
              <div className="review-image-input">
                <label className="review-image-input-icon">
                  <LuCamera size={10} color="gray" />
                  <input
                    className="reviewcreate_image_input"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className="review-create">
        <div className="reviewcreate-title-container">
          <input
            name="title"
            className="reviewcreate-title"
            placeholder="제목"
            onChange={onChange}
          />
        </div>
        <div>
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
              <input
                className="reviewcreate-type-select"
                name="score"
                onChange={onChange}
                placeholder="점수"
              />
            </div>
          </div>
        </div>
        <div>
          <div>{/* 점수 */}</div>
          {/* <div>{data.username}</div>
                        <div>{today}</div> */}
        </div>
      </div>

      <div>
        <div>
          <textarea
            className="reviewcreate_content"
            name="content"
            id=""
            cols="10"
            rows="10"
            onChange={onChange}
          ></textarea>
        </div>
      </div>

      <div>
        <div className="review-create-bnt" onClick={onClick}>
          작성
        </div>
      </div>
    </div>
  )
}
