import axios from "../lib/axios";
import {
  Material,
  CreateMaterialData,
  MaterialWithDetails,
} from "../types/material";
import { ApiResponse, QueryParams } from "../types/api";

export const materialService = {
  // GET materials by course
  getMaterialsByCourse: async (
    courseId: string,
    params?: QueryParams
  ): Promise<ApiResponse<Material[]>> => {
    const response = await axios.get(`/api/materials/${courseId}`, {
      params,
    });
    return response.data;
  },

  // UPLOAD material
  uploadMaterial: async (
    courseId: string,
    data: CreateMaterialData
  ): Promise<ApiResponse<Material>> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value instanceof File ? value : String(value));
    });

    const response = await axios.post(
      `/api/materials/${courseId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  // DELETE material
  deleteMaterial: async (id: string): Promise<ApiResponse<void>> => {
    const response = await axios.delete(`/api/materials/${id}`);
    return response.data;
  },

  // GET material by ID
  getMaterialById: async (
    id: string
  ): Promise<ApiResponse<MaterialWithDetails>> => {
    const response = await axios.get(`/api/materials/${id}`);
    return response.data;
  },
};
