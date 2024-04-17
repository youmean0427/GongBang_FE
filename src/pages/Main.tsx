import Banner from "../components/common/Banner";
import CardContainer from "../components/common/CardContainer";
import { getCoffeeCafesAPI } from "../apis/api";
import { useQueries, useQuery } from "react-query";
import "./test.css";
import { useEffect } from "react";

export default function Main() {
  const result = useQueries([
    {
      queryKey: ["getCoffeeCafesScore"],
      queryFn: () => getCoffeeCafesAPI(1),
    },
    {
      queryKey: ["getCoffeeCafesOpt"],
      queryFn: () => getCoffeeCafesAPI(2),
    },
  ]);
  // const { isLoading, data } = useQuery({
  //   queryKey: ["getCoffeeCafesScore"],
  //   queryFn: () => getCoffeeCafesAPI(1),
  // });
  // const { data: optData } = useQuery({
  //   queryKey: ["getCoffeeCafesOpt"],
  //   queryFn: () => getCoffeeCafesAPI(2),
  // });
  const isLoading = result.some((query) => query.isLoading);

  if (isLoading) return <></>;
  return (
    <>
      <div>
        <div>
          <Banner />
        </div>
        <div className="">
          <div className="flex flex-row w-full">
            <div className="w-1/4"></div>
            <div className="w-[1280px] ">
              {result[0].data.length > 0 ? (
                <CardContainer
                  title={"🔥 핫플, 인기 있는 카페"}
                  data={result[0].data}
                  type={1}
                  chevronWidth={300}
                />
              ) : (
                <></>
              )}
              <hr />
              {result[1].data.length > 0 ? (
                <CardContainer
                  title={"🎈 풀옵션, 모든 것이 갖춰진 카페"}
                  data={result[1].data}
                  type={1}
                  chevronWidth={300}
                />
              ) : (
                <></>
              )}
              <hr />
              {result[0].data.length > 0 ? (
                <CardContainer
                  title={"✨ 새로운, 최근 오픈 신상 카페"}
                  data={result[0].data}
                  type={1}
                  chevronWidth={300}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="w-1/4 "></div>
          </div>
        </div>
      </div>
    </>
  );
}
