import fullStar from '../../images/full_star.png'
import emStar from '../../images/em_star.png'
import { useEffect, useState } from 'react'
import './Star.css'

export default function Stars({ score, size }) {
  const [stars, setStars] = useState([false, false, false, false, false])

  useEffect(() => {
    let arr = [false, false, false, false, false]
    for (let i = 0; i < Math.floor(parseInt(score)); i++) {
      arr[i] = true
    }
    setStars(arr)
  }, [score])

  return (
    <>
      <div className="stars-total">
        <div className={size ? 'stars-cont' : 'stars-cont-small'}>
          <div className={size ? 'score' : 'score-small'}>
            {score.toFixed(2)}
          </div>
          <div className={size ? 'stars' : 'stars-small'}>
            <div>
              {stars[0] ? <img src={fullStar} /> : <img src={emStar} />}
            </div>
            <div>
              {stars[1] ? <img src={fullStar} /> : <img src={emStar} />}
            </div>
            <div>
              {stars[2] ? <img src={fullStar} /> : <img src={emStar} />}
            </div>
            <div>
              {stars[3] ? <img src={fullStar} /> : <img src={emStar} />}
            </div>
            <div>
              {stars[4] ? <img src={fullStar} /> : <img src={emStar} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
