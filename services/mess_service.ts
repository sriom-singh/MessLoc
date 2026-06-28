import axiosInstance from "@/lib/axios";

export const MessService = {
  getAll: async () => {
    const { data } = await axiosInstance.get("/messes");
    return data;
  },

  getById: async (id: number) => {
    const { data } = await axiosInstance.get(`/messes/${id}`);
    return data;
  },

  create: async (payload: object) => {
    const { data } = await axiosInstance.post("/messes", payload);
    return data;
  },

  update: async (id: number, payload: object) => {
    const { data } = await axiosInstance.put(`/messes/${id}`, payload);
    return data;
  },

  delete: async (id: number) => {
    const { data } = await axiosInstance.delete(`/messes/${id}`);
    return data;
  },

  search: async (query: string) => {
    const { data } = await axiosInstance.get("/messes/search", {
      params: { q: query },
    });
    return data;
  },
};