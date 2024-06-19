import Banner from "../../components/common/Browser/Banner/Banner";
import { getCoffeeCafesAPI } from "../../apis/api";
import { useQuery } from "react-query";
import { isBrowser, isMobile } from "react-device-detect";
import CafeCard from "../../components/common/Browser/Card/CafeCard";
import { useEffect, useState } from "react";
import Modal from "../../components/common/Browser/Modal";
import { useRecoilState } from "recoil";
import { PopupHandle } from "../../recoil/atom";
export default function Main() {
  const [togglePopupModal, setTogglePopupModal] = useRecoilState(PopupHandle);
  let today = new Date();
  const { data: sortedScoreData } = useQuery({
    queryKey: ["getCoffeeCafesScore"],
    queryFn: () => getCoffeeCafesAPI(1),
  });

  const { data: sortedCategoryData } = useQuery({
    queryKey: ["getCoffeeCafesOpt"],
    queryFn: () => getCoffeeCafesAPI(2),
  });

  const handlePopupModal = () => {
    setTogglePopupModal(!togglePopupModal);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    let localStroagePopupTime: null | string =
      localStorage.getItem("popupTime");
    if (localStroagePopupTime) {
      let popupTime: Date = new Date(parseInt(localStroagePopupTime));
      console.log(today.getTime() < popupTime.getTime());
      if (today.getTime() < popupTime.getTime()) {
        setTogglePopupModal(false);
      } else {
        setTogglePopupModal(true);
      }
    } else {
      setTogglePopupModal(true);
    }
  }, []);

  // if (isLoading || isFetching) return <></>;
  if (isBrowser)
    return (
      <>
        <div className="pt-20">
          <div>
            <Banner />
          </div>

          <div className="pl-[10%] pr-[10%]">
            <div className="flex flex-row w-full">
              <div className="w-full mb-16 ">
                <CafeCard
                  title={"🔥 핫플, 인기 있는 카페"}
                  data={sortedScoreData}
                />

                <CafeCard
                  title={"🎈 풀옵션, 모든 것이 갖춰진 카페"}
                  data={sortedCategoryData}
                />

                <CafeCard
                  title={"✨ 새로운, 최근 오픈 신상 카페"}
                  data={sortedScoreData}
                />
              </div>
            </div>
          </div>
        </div>
        {togglePopupModal && (
          <Modal close={handlePopupModal} data={""} type={8} />
        )}
      </>
    );
  if (isMobile)
    return (
      <>
        <div>
          <div>
            <Banner />
          </div>
          <div className="pl-[5%] pr-[5%]">
            <div className="flex flex-row w-full">
              <div className="w-full mb-16 ">
                <CafeCard
                  title={"🔥 핫플, 인기 있는 카페"}
                  data={sortedScoreData}
                />

                <hr />
                <CafeCard
                  title={"🎈 풀옵션, 모든 것이 갖춰진 카페"}
                  data={sortedCategoryData}
                />

                <hr />

                <CafeCard
                  title={"✨ 새로운, 최근 오픈 신상 카페"}
                  data={sortedScoreData}
                />
              </div>
            </div>
          </div>
        </div>
        {togglePopupModal && (
          <Modal close={handlePopupModal} data={""} type={8} />
        )}
      </>
    );
  return <></>;
}
