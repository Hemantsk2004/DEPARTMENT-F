import api from "@/lib/axios";

export const assignmentService = {
  createAssignment: async (data: any) => {
    const response = await api.post(
      "/api/assignments",
      data
    );

    return response.data;
  },

  getAssignmentsByCourse: async (
    courseId: string
  ) => {
    const response = await api.get(
      `/api/assignments/${courseId}`
    );

    return response.data;
  },
};