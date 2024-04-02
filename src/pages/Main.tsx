import Banner from "../components/common/Banner";
import CardContainer from "../components/common/CardContainer";
import { getCoffeeCafesAPI } from "../apis/api";
import { useQuery } from "react-query";
import "./test.css";

export default function Main() {
  const { isLoading, data } = useQuery({
    queryKey: ["getCoffeeCafes"],
    queryFn: () => getCoffeeCafesAPI(1),
  });

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
              <CardContainer
                title={"🔥 핫플, 인기 있는 카페"}
                data={data}
                type={1}
                chevronWidth={300}
              />
              <hr />
              <CardContainer
                title={"🎈 풀옵션, 모든 것이 갖춰진 카페"}
                data={data}
                type={1}
                chevronWidth={300}
              />
              <hr />
              <CardContainer
                title={"✨ 새로운, 최근 오픈 신상 카페"}
                data={data}
                type={1}
                chevronWidth={300}
              />
            </div>
            <div className="w-1/4 "></div>
          </div>
        </div>
      </div>
    </>
  );
}
