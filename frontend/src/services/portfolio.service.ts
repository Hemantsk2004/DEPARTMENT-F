import api from "@/lib/axios";

export const getMyPortfolio = async () => {
  const response = await api.get(
    "/api/portfolio/me"
  );

  return response.data;
};

export const updatePortfolio = async (
  data: FormData
) => {
  const response = await api.put(
    "/api/portfolio/me",
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};