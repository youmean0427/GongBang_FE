import { useState } from "react";
import { Link } from "react-router-dom";
import { CoffeeCafeData } from "../../../types/type";
import Stars from "./Stars";

interface CafeCardType {
  title: string;
  data: CoffeeCafeData[];
}

export default function CafeCard({ title, data }: CafeCardType) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === data.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 0 : currentSlide - 1);
  };

  return (
    <div className="w-full mt-12 mb-10 ">
      <div className="w-full">
        <div className="text-2xl font-semibold mb-7">{title}</div>

        <div className="relative w-full">
          <div className="w-full carousel carousel-center ">
            <div className="space-x-4 carousel-item ">
              {data.map((x, i) => (
                <div
                  key={i}
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    transition: "transform 0.5s ease",
                  }}
                >
                  <Link
                    to={`coffeecafe/${x.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="text-lg">
                      <div className="mb-5 ">
                        {x.coffeecafeimage_set && (
                          <div className="w-full h-full">
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
                      </div>

                      <div className="">
                        <Stars score={x.total_score} size="small" />
                      </div>
                      <div className="text-xl font-medium">{x.name}</div>
                      <div className="text-base ">{x.address}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <button
            className="absolute btn btn-circle -left-5 top-1/2"
            onClick={prevSlide}
          >
            ❮
          </button>
          <button
            className="absolute btn btn-circle -right-5 top-1/2"
            onClick={nextSlide}
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}
