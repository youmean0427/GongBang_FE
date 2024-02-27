import { useQuery } from '@tanstack/react-query'
import React from 'react'
import {
  getAllReveiw,
  getCoffeeCafeDetailAPI,
  getReview,
  userAPI,
} from '../apis/api'
import { useParams } from 'react-router-dom'
import ListContainer from '../components/list/ListContainer'
import './Review.css'
import Stars from '../components/common/Stars'

export default function Review({ data }) {
  const { id } = useParams()

  //   const { isLoading, data } = useQuery({
  //     queryKey: ['getCoffeeCafeDetailReview'],
  //     queryFn: () => getCoffeeCafeDetailAPI(id),
  //   })

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userAPI(),
    enabled: !!localStorage.getItem('access_token'),
  })

  return (
    <div className="review">
      <div className="review-fix">
        <div className="review-cafename">{data.name}</div>
        <Stars score={data.total_score} size={1} />
        <div className="review-count">{data.review_set.length}개의 리뷰</div>
      </div>
      <div>
        {data ? (
          data.review_set.map((x, i) => (
            <div key={i}>
              <ListContainer data={x} userInfo={userInfo} />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
