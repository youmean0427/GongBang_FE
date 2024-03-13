import axios from "axios";

export const getCoffeeCafesAPI = async (type: number) => {
  const { data } = await axios.get(`/api/coffeecafes/${type}`);
  return data;
};

export const getCoffeeCafeDetailAPI = async (id: any) => {
  const { data } = await axios.get(`/api/coffeecafe/${id}`);
  return data;
};

export const getCoffeeCafeDetailReviewCreateAPI = async (
  id: number,
  data: FormData,
  type: number
) => {
  const response = await axios.post(
    `/api/coffeecafe/${id}/review/${type}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const getReviewDetailAPI = async (id: number) => {
  const { data } = await axios.get(`/api/coffeecafe/review/${id}`);
  return data;
};

export const deleteReviewAPI = async (id: number) => {
  const response = await axios.delete(`/api/coffeecafe/review/${id}/delete`);
  return response;
};

export const deleteReviewImageAPI = async (id: number) => {
  const response = await axios.delete(`/api/coffeecafe/review/image/${id}`);
  return response;
};

export const creaetcoffeeCafeAPI = async (data: FormData) => {
  const response = await axios.post(`/api/coffeecafe/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getReveiwsAPI = async () => {
  const { data } = await axios.get("/api/coffeecafe/review");
  return data;
};

// Account

export const userAPI = async () => {
  const { data } = await axios.get("/accounts/user/");
  return data;
};

export const signupAPI = async (data: Object) => {
  const response = await axios.post("/accounts/registration/", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const loginAPI = async (data: Object) => {
  const response = await axios.post("/accounts/login/", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const logoutAPI = async (data: Object) => {
  const response = await axios.post("/accounts/logout/", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
