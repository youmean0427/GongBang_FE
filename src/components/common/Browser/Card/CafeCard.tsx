import { useState } from "react";
import { isBrowser } from "react-device-detect";
import { Link } from "react-router-dom";
import { CoffeeCafeData } from "../../../../types/type";
import Stars from "../Stars";

interface CafeCardType {
  title: string;
  data: CoffeeCafeData[];
}

export default function CafeCard({ title, data }: CafeCardType) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 이미지 버튼
  const nextSlide = () => {
    setCurrentSlide(currentSlide === data.length - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 0 : currentSlide - 1);
  };

  if (isBrowser)
    return (
      <div className="w-full mt-12 mb-10 ">
        <div className="w-full">
          <div className="text-2xl font-bold mb-7">{title}</div>
          <div className="relative w-full">
            <div className="w-full carousel carousel-start ">
              <div className="space-x-5 carousel-item h-[380px] ">
                {data && data.length === 0 && (
                  <div className="absolute flex items-center justify-center w-full h-[380px]  ">
                    <div className="text-lg font-medium text-gray-500">
                      카페가 없습니다.
                    </div>
                  </div>
                )}
                {data &&
                  data.map((x, i) => (
                    <div
                      key={x.id}
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                        transition: "transform 0.5s ease",
                      }}
                      className="h-full max-w-96"
                    >
                      <Link
                        to={`coffeecafe/${x.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="text-lg">
                          <div className="mb-5">
                            {x.coffeecafeimage_set && (
                              <div className="w-[250px] h-[250px] bg-gray-300 rounded-2xl">
                                {x.coffeecafeimage_set.length > 0 && (
                                  <img
                                    className="object-cover w-full h-full rounded-2xl"
                                    src={
                                      process.env.REACT_APP_API_URL +
                                      x.coffeecafeimage_set[0].image
                                    }
                                    alt="Cafe"
                                  />
                                )}
                              </div>
                            )}
                          </div>

                          <div className="mb-1">
                            <Stars score={x.total_score} size="small" />
                          </div>
                          <div className="w-[250px] mb-1 text-xl font-semibold truncate">
                            {x.name}
                          </div>
                          <div className="w-[250px] text-base truncate">
                            {x.address}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
            {data && data.length > 0 && isBrowser && (
              <>
                <button
                  className="absolute opacity-40 shadow-black btn btn-circle hover:opacity-100 -left-5 top-1/2 "
                  onClick={prevSlide}
                >
                  ❮
                </button>
                <button
                  className="absolute btn btn-circle -right-5 top-1/2 opacity-40 shadow-black hover:opacity-100"
                  onClick={nextSlide}
                >
                  ❯
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-full mt-12 mb-6 ">
      <div className="w-full">
        <div className="text-xl font-bold mb-7">{title}</div>
        <div className="relative w-full">
          <div className="w-full carousel carousel-start ">
            <div className="space-x-5 carousel-item h-[280px] ">
              {data && data.length === 0 && (
                <div className="absolute flex items-center justify-center w-full h-[280px]  ">
                  <div className="text-base font-medium text-gray-500">
                    카페가 없습니다.
                  </div>
                </div>
              )}
              {data &&
                data.length > 0 &&
                data.map((x, i) => (
                  <div key={x.id} className="h-full max-w-96">
                    <Link
                      to={`coffeecafe/${x.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="text-lg w-[150px]">
                        <div className="mb-4">
                          {x.coffeecafeimage_set &&
                            x.coffeecafeimage_set.length > 0 && (
                              <div className="w-[150px] h-[150px]">
                                <img
                                  className="object-cover w-full h-full rounded-2xl"
                                  src={
                                    process.env.REACT_APP_API_URL +
                                    x.coffeecafeimage_set[0].image
                                  }
                                  alt="Cafe"
                                />
                              </div>
                            )}
                          {x.coffeecafeimage_set.length === 0 && (
                            <div className="w-[180px] h-[180px] bg-gray-300 rounded-2xl"></div>
                          )}
                        </div>

                        <div className="">
                          <Stars score={x.total_score} size="small" />
                        </div>
                        <div className="text-base font-semibold truncate">
                          {x.name}
                        </div>
                        <div className="text-sm truncate">{x.address}</div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
