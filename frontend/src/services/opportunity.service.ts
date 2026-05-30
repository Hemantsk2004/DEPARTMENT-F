import api from "@/lib/axios";

export const getAllOpportunities = async () => {
  const response = await api.get("/api/opportunities");
  return response.data;
};

export const saveOpportunity = async (id: string) => {
  const response = await api.post(
    `/api/opportunities/save/${id}`
  );
  return response.data;
};

export const createOpportunity = async (
  data: {
    title: string;
    company: string;
    type: string;
    description: string;
    link: string;
    deadline: string;
  }
) => {
  const response = await api.post(
    "/api/opportunities",
    data
  );

  return response.data;
};

export const deleteOpportunity = async (
  id: string
) => {
  const response = await api.delete(
    `/api/opportunities/${id}`
  );

  return response.data;
};