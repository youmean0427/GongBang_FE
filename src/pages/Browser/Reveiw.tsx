import { isBrowser } from "react-device-detect";
import { useParams } from "react-router-dom";
import ListContainer from "../../components/common/Browser/List/ListContainer";

import Stars from "../../components/common/Browser/Stars";
import { CoffeeCafeData } from "../../types/type";

interface ReviewType {
  data: CoffeeCafeData;
}

export default function Review({ data }: ReviewType) {
  const { id } = useParams();
  if (isBrowser)
    return (
      <div className="h-[90%]">
        <div className="flex flex-col items-center h-full gap-2 ">
          <div className="flex flex-col items-center gap-2">
            <div className="mb-2 text-2xl font-bold">{data.name}</div>
            <Stars score={data.total_score} size="small" />
            <div className="mt-2 text-xl font-bold">
              {data.review_set.length}개의 리뷰
            </div>
          </div>

          <div className="w-full">
            {data &&
              data.review_set &&
              data.review_set.map((x: any, i: number) => (
                <div key={i}>
                  <ListContainer data={x} />
                </div>
              ))}
          </div>
          {data.review_set.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div>리뷰가 없습니다.</div>
            </div>
          )}
        </div>
      </div>
    );
  return (
    <div className="h-[90%] mt-8">
      <div className="flex flex-col items-center h-full gap-2 ">
        <div className="flex flex-col items-center gap-2">
          <div className="mb-1 text-2xl font-bold">{data.name}</div>
          <Stars score={data.total_score} size="small" />
          <div className="mt-2 text-sm font-bold">
            {data.review_set.length}개의 리뷰
          </div>
        </div>

        <div className="w-full mt-5">
          {data &&
            data.review_set &&
            data.review_set.map((x: any, i: number) => (
              <div key={i}>
                <ListContainer data={x} />
              </div>
            ))}
        </div>
        {data.review_set.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div>리뷰가 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}
