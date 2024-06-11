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
  review: number;
  image: string;
}

export interface ReviewData {
  cafe?: number;
  content: string;
  date: string;
  id: number;
  name: string;
  reviewimage_set: ReveiwImageData[];
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

export interface TypeCode {
  [key: number]: string;
}

export interface LoginInputType {
  email: String;
  password: String;
}

export interface PassWordResetInputType {
  email: string;
}

export interface PasswordResetConfrimInputType {
  new_password1: string;
  new_password2: string;
  uid?: string;
  token?: string;
}

// Django REST AUTH 기본, 변경 금지
export interface SignupInputType {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export interface CafeImageType {
  cafe: number;
  id: number;
  image: string;
}

export interface ReviewPropsType {
  data: CoffeeCafeData;
}

export interface ReviewCreatePropsType {
  coffeeCafe: CoffeeCafeData;
}
export interface ReviewCreateInputType {
  title: string;
  content: string;
  date: string;
  score: number;
  type: number;
}

export interface RecoCafeInputType {
  title: string;
  content: string;
  date: string;
  name: string;
  image: string;
}
