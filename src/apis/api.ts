import axios from "axios";
// axios.defaults.baseURL = process.env.BASE_URL;

export const getCoffeeCafesAPI = async (type: number) => {
  const { data } = await axios.get(`/api/coffeecafes/all/${type}`);
  return data;
};

export const getCoffeeCafeDetailAPI = async (id: string | undefined) => {
  const { data } = await axios.get(`/api/coffeecafes/detail/${id}`);
  return data;
};

export const createcoffeeCafeAPI = async (data: FormData) => {
  const response = await axios.post(`/api/coffeecafes/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getReveiwsAllAPI = async () => {
  const { data } = await axios.get("/api/coffeecafes/review");
  return data;
};

export const getReviewDetailAPI = async (id: number) => {
  const { data } = await axios.get(`/api/coffeecafes/review/${id}`);
  return data;
};
export const postCoffeeCafeDetailReviewAPI = async (
  id: number,
  data: FormData,
  type: number
) => {
  const response = await axios.post(
    `/api/coffeecafes/detail/${id}/review/${type}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const deleteReviewAPI = async (id: number) => {
  const response = await axios.delete(`/api/coffeecafes/review/${id}/delete`);
  return response;
};

export const deleteReviewImageAPI = async (id: number) => {
  const response = await axios.delete(`/api/coffeecafes/review/image/${id}`);
  return response;
};

// Account

export const userAPI = async (token: string) => {
  const response = await axios.get("/accounts/user/", {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-CSRFToken": "{{csrftoken}}",
    },
  });

  return response;
};

export const signupAPI = async (data: any) => {
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
