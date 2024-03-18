export interface CoffeeCafeData {
  address: string;
  coffee: number;
  coffeecafeimage_set: CoffeeCafeImageData[];
  id: number;
  lat: number;
  lng: number;
  name: string;
  note: number;
  parking: number;
  plug: number;
  review_set: ReviewData[];
  seat: number;
  time: string;
  toilet: number;
  total_score: number;
  vibe: number;
  wifi: number;
}
export interface CoffeeCafeImageData {
  id: number;
  cafe: number;
  image: string;
}

export interface ReveiwImageData {
  id: number;
  cafe: number;
  image: string;
}

export interface ReviewData {
  cafe?: number;
  content: string;
  date: string;
  id: number;
  name: string;
  reviewimage_set?: ReveiwImageData[];
  score: number;
  title: string;
  type: number;
  user: number;
}

export interface CardData {
  title: string;
  data: CoffeeCafeData[];
  type: number;
  chevronWidth?: number;
  isReviewModal?: () => void;
  isCreateModal?: () => void;
}
