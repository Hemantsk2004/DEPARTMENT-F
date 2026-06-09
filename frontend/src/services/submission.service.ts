import api from "@/lib/axios";

export const submissionService = {
  submitAssignment: async (
    assignmentId: string,
    file: File
  ) => {
    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await api.post(
        `/api/submissions/${assignmentId}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  },

  getSubmissions:
    async (
      assignmentId: string
    ) => {
      const response =
        await api.get(
          `/api/submissions/${assignmentId}`
        );

      return response.data;
    },

  gradeSubmission:
    async (
      submissionId: string,
      data: {
        marks: number;
        feedback: string;
      }
    ) => {
      const response =
        await api.put(
          `/api/submissions/grade/${submissionId}`,
          data
        );

      return response.data;
    },

    getStudentSubmission:
  async (
    assignmentId: string
  ) => {
    const response =
      await api.get(
        `/api/submissions/student/${assignmentId}`
      );

    return response.data;
  },
};