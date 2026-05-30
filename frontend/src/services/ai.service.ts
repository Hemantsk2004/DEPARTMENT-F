import axios from "@/lib/axios";

export const aiService = {
  summarize: async (
    data: FormData
  ) => {
    const response = await axios.post(
      "/api/ai/summarize",
      data,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  },
};