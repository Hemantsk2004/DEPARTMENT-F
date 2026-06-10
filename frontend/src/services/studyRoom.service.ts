import api from "@/lib/axios";

export const studyRoomService = {

  getMessages:
    async (
      courseId: string
    ) => {

      const response =
        await api.get(
          `/api/study-rooms/${courseId}`
        );

      return response.data;
    },

};