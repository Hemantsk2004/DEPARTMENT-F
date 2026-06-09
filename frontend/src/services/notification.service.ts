import api from "@/lib/axios";

export const notificationService = {

  getNotifications:
    async () => {

      const response =
        await api.get(
          "/api/notifications"
        );

      return response.data;
    },

  markAsRead:
    async (
      notificationId:
      string
    ) => {

      const response =
        await api.put(
          `/api/notifications/${notificationId}`
        );

      return response.data;
    },
};