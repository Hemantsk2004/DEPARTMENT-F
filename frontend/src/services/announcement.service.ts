import axios from "../lib/axios";

export const announcementService = {
  createAnnouncement: async (
    data: {
      title: string;
      content: string;
      courseId: string;
    }
  ) => {
    const response = await axios.post(
      "/api/announcements",
      data
    );

    return response.data;
  },

  getAnnouncements: async (
    courseId: string
  ) => {
    const response = await axios.get(
      `/api/announcements/${courseId}`
    );

    return response.data;
  },
};