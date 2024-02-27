import React, { useEffect, useState } from 'react'
import '../card/Card.css'
import ItemsCarousel from 'react-items-carousel'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteReview, getCoffeeCafesAPI, userAPI } from '../../apis/api'
import { Link } from 'react-router-dom'
import Review from '../../pages/Reveiw'
import ListContainer from '../list/ListContainer'
import Stars from '../common/Stars'
import { LuX } from 'react-icons/lu'
export default function CardContainer({
  title,
  data,
  type,
  chevronWidth,
  userInfo,
  isReviewModal,
  isCreateModal,
}) {
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const [toggleReviewModal, setToggleReviewModal] = useState(0)
  const [reviewModalData, setReviewModalData] = useState('')

  const reviewDeleteMutation = useMutation(
    ['deleteReview'],
    (x) => deleteReview(x),
    {
      onSuccess: () => {
        window.location.reload()
      },
    },
  )

  const { isLoading, data: logined } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userAPI(),
    enabled: !!localStorage.getItem('access_token'),
  })

  const handleDelete = (x) => {
    reviewDeleteMutation.mutate(x)
  }

  const setReviewDetail = (x) => {
    setReviewModalData(x)
    setToggleReviewModal(1)
  }

  const handleReviewModal = () => {
    setReviewModalData('')
  }

  if (type === 1)
    return (
      <>
        <div
          className="cardcontainer"
          style={{ padding: `0 ${chevronWidth}px` }}
        >
          <div className="cardcontainer-title">{title}</div>

          <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={4}
            gutter={20}
            leftChevron={<button>{'<'}</button>}
            rightChevron={<button>{'>'}</button>}
            outsideChevron
            chevronWidth={chevronWidth}
          >
            {data.map((data) => (
              <Link
                to={`coffeecafe/${data.id}`}
                style={{ textDecoration: 'none' }}
                key={data}
              >
                <div>
                  <div className="cardcontainer-card-item">
                    {' '}
                    {data.coffeecafeimage_set.length ? (
                      <img
                        className="cardcontainer-coffecafe-image"
                        src={data.coffeecafeimage_set[0].image}
                        alt="Cafe"
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>

                  <div>
                    <Stars score={data.total_score} size={0} />
                  </div>
                  <div>{data.name}</div>
                  <div>{data.address}</div>
                </div>
              </Link>
            ))}
          </ItemsCarousel>
        </div>
      </>
    )

  if (type == 2)
    return (
      <>
        <div className="cardcontainer" style={{ padding: `0 0px` }}>
          <div className="cardcontainer-title-container">
            <div className="cardcontainer-title">{title}</div>
            <div className="cardcontainer-title-container-review">
              {logined ? (
                <div className="cardcontainer-review-create">
                  <div onClick={isCreateModal}>리뷰 작성하기</div>
                </div>
              ) : (
                <div></div>
              )}
              {logined ? (
                <div style={{ margin: '0 10px 0 10px' }}> | </div>
              ) : (
                <div></div>
              )}
              <div className="cardcontainer-review-all" onClick={isReviewModal}>
                모든 리뷰 보기
              </div>
            </div>
          </div>
          <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={4}
            gutter={20}
            leftChevron={<button>{'<'}</button>}
            rightChevron={<button>{'>'}</button>}
            outsideChevron
            chevronWidth={chevronWidth}
          >
            {data.map((data, i) => (
              <>
                <div key={i} onClick={() => setReviewDetail(data)}>
                  <div className="cardcontainer-card-item">
                    {' '}
                    {data.reviewimage_set.length ? (
                      <img
                        className="cardcontainer-coffecafe-image"
                        src={data.reviewimage_set[0].image}
                        alt="Cafe"
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>
                  {/* <div>{data.id}</div> */}
                  <div>
                    <Stars score={data.score} type={0} />
                  </div>
                  <div className="cardcontaioner-data-title">{data.title}</div>
                  <div>{data.name}</div>
                  <div></div>
                </div>
              </>
            ))}
          </ItemsCarousel>
          {/* Modal */}
          <div>
            {reviewModalData ? (
              <div className="review-Modal">
                <div onClick={handleReviewModal}>
                  <LuX size={30} />
                </div>
                <div className="review-Modal-List">
                  <div>
                    <ListContainer data={reviewModalData} userInfo={userInfo} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </>
    )
}
