import Banner from "../../components/common/Browser/Banner";
import CardContainer from "../../components/common/Browser/CardContainer";
import { getCoffeeCafesAPI } from "../../apis/api";
import { useQuery } from "react-query";
import { isBrowser, isMobile } from "react-device-detect";
import CafeCard from "../../components/common/Browser/CafeCard";

export default function Main() {
  const {
    isLoading,
    isFetching,
    data: oneData,
  } = useQuery({
    queryKey: ["getCoffeeCafesScore"],
    queryFn: () => getCoffeeCafesAPI(1),
  });
  const { data: twoData } = useQuery({
    queryKey: ["getCoffeeCafesOpt"],
    queryFn: () => getCoffeeCafesAPI(2),
  });

  if (isLoading || isFetching) return <></>;
  if (isBrowser)
    return (
      <>
        <div>
          <div>
            <Banner />
          </div>

          <div className="pl-[10%] pr-[10%]">
            <div className="flex flex-row w-full">
              <div className="w-full ">
                <CafeCard title={"🔥 핫플, 인기 있는 카페"} data={oneData} />

                <hr />
                <CafeCard
                  title={"🎈 풀옵션, 모든 것이 갖춰진 카페"}
                  data={oneData}
                />

                <hr />

                <CafeCard
                  title={"✨ 새로운, 최근 오픈 신상 카페"}
                  data={oneData}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );

  if (isMobile)
    return (
      <div className="w-full pb-20 ">
        <div>
          <Banner />
        </div>
        <div className="pl-5 pr-5">
          <div className="w-full ">
            <CafeCard title={"🔥 핫플, 인기 있는 카페"} data={oneData} />
            <hr />
            <CafeCard
              title={"🎈 풀옵션, 모든 것이 갖춰진 카페"}
              data={oneData}
            />
            <hr />
            <CafeCard title={"✨ 새로운, 최근 오픈 신상 카페"} data={oneData} />
          </div>
        </div>
      </div>
    );
  return <></>;
}
