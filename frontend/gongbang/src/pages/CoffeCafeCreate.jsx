import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { coffeeCafeCreateAPI } from '../apis/api'

export default function CoffeCafeCreate() {
  const [inputs, setInput] = useState({
    name: '',
    address: '',
    time: '',
    total_score: 0.0,
    lat: 0,
    lng: 0,
  })
  const [imageList, setImageList] = useState([])

  const handleImageChange = (event) => {
    const files = event.target.files
    let imageUrl = []
    for (let i = 0; i < files.length; i++) {
      imageUrl.push(files[i])
      // * Blob *
      // imageUrl.push(URL.createObjectURL(files[i]))
    }
    setImageList(imageUrl)
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setInput({
      ...inputs,
      [name]: value,
    })
  }

  const onClick = () => {
    const formData = new FormData()
    formData.append('name', inputs.name)
    formData.append('address', inputs.address)
    formData.append('time', inputs.time)
    formData.append('total_score', inputs.total_score)
    formData.append('lat', inputs.lat)
    formData.append('lng', inputs.lng)
    imageList.forEach((x) => {
      formData.append('image', x)
    })

    coffeecafeCreateMutation.mutate(formData)
  }

  const coffeecafeCreateMutation = useMutation(
    ['coffeecafeCreate'],
    (formData) => coffeeCafeCreateAPI(formData),
  )

  return (
    <>
      <div>
        <div>name</div>
        <div>
          <input name="name" onChange={onChange} />
        </div>
        <div>adress</div>
        <div>
          <input name="address" onChange={onChange} />
        </div>
        <div>time</div>
        <div>
          <input name="time" onChange={onChange} />
        </div>
        <div>total_score</div>
        <div>
          <input name="total_score" onChange={onChange} />
        </div>
        <div>lat</div>
        <div>
          <input name="lat" onChange={onChange} />
        </div>
        <div>lng</div>
        <div>
          <input name="lng" onChange={onChange} />
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        <div>
          <button onClick={onClick}>제출</button>
        </div>
      </div>
    </>
  )
}
