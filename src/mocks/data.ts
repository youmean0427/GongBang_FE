import image1 from "../images/cafe_image.png";
import image2 from "../images/coffee_image.png";
import image3 from "../images/review_image.png";
const coffeeCafes = [
  {
    id: 1,
    name: "카페_1",
    address: "대한민국",
    time: "연중무휴",
    total_score: 5,
    lat: 123,
    lng: 35,
    vibe: 1,
    seat: 2,
    coffee: 3,
    plug: 4,
    wifi: 1,
    toilet: 1,
    parking: 1,
    note: 1,
    coffeecafeimage_set: [
      { id: 2, image: image1, cafe: 1 },
      { id: 3, image: image2, cafe: 1 },
    ],
    review_set: [
      {
        id: 2,
        title: "title",
        content: "content",
        date: "2024-03-12",
        score: 10.0,
        type: 1,
        name: "유저",
        cafe: 1,
        user: 2,
        reviewimage_set: [
          { id: 1, image: image1, cafe: 1 },
          { id: 2, image: image2, cafe: 1 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "카페_2",
    address: "대한민국",
    time: "연중무휴",
    total_score: 5,
    lat: 123,
    lng: 35,
    vibe: 1,
    seat: 2,
    coffee: 3,
    plug: 4,
    wifi: 1,
    toilet: 1,
    parking: 1,
    note: 1,
    coffeecafeimage_set: [
      { id: 2, image: image1, cafe: 1 },
      { id: 3, image: image2, cafe: 1 },
    ],
    review_set: [
      {
        id: 2,
        title: "title",
        content: "content",
        date: "2024-03-12",
        score: 10.0,
        type: 1,
        name: "유저",
        cafe: 1,
        user: 2,
        reviewimage_set: [
          { id: 1, image: image1, cafe: 1 },
          { id: 2, image: image2, cafe: 1 },
        ],
      },
    ],
  },
];
export default coffeeCafes;
