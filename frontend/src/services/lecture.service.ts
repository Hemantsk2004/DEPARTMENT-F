import axios from "../lib/axios";

export const lectureService = {
  createLecture: async (
    data: {
      title: string;
      description: string;
      url: string;
      courseId: string;
    }
  ) => {
    const response = await axios.post(
      "/api/lectures",
      data
    );

    return response.data;
  },

  getLectures: async (
    courseId: string
  ) => {
    const response = await axios.get(
      `/api/lectures/${courseId}`
    );

    return response.data;
  },
};