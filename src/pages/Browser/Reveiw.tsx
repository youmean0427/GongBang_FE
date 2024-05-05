import { useParams } from "react-router-dom";
import ListContainer from "../../components/common/Browser/List/ListContainer";

import Stars from "../../components/common/Browser/Stars";
import { CoffeeCafeData } from "../../types/type";

interface ReviewType {
  data: CoffeeCafeData;
}

export default function Review({ data }: ReviewType) {
  const { id } = useParams();

  return (
    <div className="mt-10">
      <div className="flex flex-col items-center gap-2 mb-10">
        <div className="mb-2 text-2xl font-bold">{data.name}</div>
        <Stars score={data.total_score} size="small" />
        <div className="mt-2 text-xl font-bold">
          {data.review_set.length}개의 리뷰
        </div>
      </div>
      <div className="">
        {data ? (
          data.review_set.map((x: any, i: number) => (
            <div key={i}>
              <ListContainer data={x} />
              <hr />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      {data.review_set.length === 0 && (
        <div className="mt-[200px] w-full h-full text-center text-gray-500">
          리뷰가 없습니다.
        </div>
      )}
    </div>
  );
}
