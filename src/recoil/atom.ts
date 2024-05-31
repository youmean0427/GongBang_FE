import { atom } from "recoil";
import { ReviewData } from "../types/type";

export const AccessToken = atom({
  key: "accessToken",
  default: "",
});

export const ModalDatailData = atom({
  key: "reviewDetailData",
  default: {} as ReviewData,
});
