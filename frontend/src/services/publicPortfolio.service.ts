import api from "@/lib/axios";

export const getPublicPortfolio = async (
  id: string
) => {
  const response = await api.get(
    `/api/portfolio/${id}`
  );

  return response.data;
};