import Banner from "../../components/common/Browser/Banner";
import CardContainer from "../../components/common/Browser/CardContainer";
import { getCoffeeCafesAPI } from "../../apis/api";
import { useQuery } from "react-query";
import { isBrowser, isMobile } from "react-device-detect";

export default function Main() {
  const { isLoading, data: oneData } = useQuery({
    queryKey: ["getCoffeeCafesScore"],
    queryFn: () => getCoffeeCafesAPI(1),
  });
  const { data: twoData } = useQuery({
    queryKey: ["getCoffeeCafesOpt"],
    queryFn: () => getCoffeeCafesAPI(2),
  });

  if (isLoading) return <></>;
  if (isBrowser)
    return (
      <>
        <div>
          <div>
            <Banner />
          </div>
          <div className="pl-[10%] pr-[10%]">
            <div className="flex flex-row w-full">
              <div className="w-[1280px] ">
                {oneData && (
                  <CardContainer
                    title={"🔥 핫플, 인기 있는 카페"}
                    data={oneData}
                    type={1}
                    chevronWidth={300}
                  />
                )}
                <hr />
                {twoData && (
                  <CardContainer
                    title={"🎈 풀옵션, 모든 것이 갖춰진 카페"}
                    data={twoData}
                    type={1}
                    chevronWidth={300}
                  />
                )}
                <hr />
                {oneData && (
                  <CardContainer
                    title={"✨ 새로운, 최근 오픈 신상 카페"}
                    data={oneData}
                    type={1}
                    chevronWidth={300}
                  />
                )}
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
          <div>
            {oneData && (
              <CardContainer
                title={"🔥 핫플, 인기 있는 카페"}
                data={oneData}
                type={1}
                chevronWidth={100}
              />
            )}
            <hr />
            {twoData && (
              <CardContainer
                title={"🎈 풀옵션, 모든 것이 갖춰진 카페"}
                data={twoData}
                type={1}
                chevronWidth={300}
              />
            )}
            <hr />
            {oneData && (
              <CardContainer
                title={"✨ 새로운, 최근 오픈 신상 카페"}
                data={oneData}
                type={1}
                chevronWidth={300}
              />
            )}
          </div>
        </div>
      </div>
    );
  return <></>;
}
