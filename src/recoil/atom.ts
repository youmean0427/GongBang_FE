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

export const ModalDetailDataInProfile = atom({
  key: "reviewDetailDataInProfile",
  default: {} as ReviewData,
});

export const ModealDetailDataInProfileBool = atom({
  key: "reviewDetailDataInProfileBoll",
  default: false as Boolean,
});
