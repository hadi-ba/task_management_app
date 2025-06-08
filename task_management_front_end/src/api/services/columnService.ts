import apiClient from "../client";

export const columnService = {
  createColumn: async (columnData: any) => {
    const response = await apiClient.post("/column", columnData);
    return response.data;
  },
  updateColumn: async (columnData: any) => {
    const { columnId, ...bodyData } = columnData;
    const response = await apiClient.patch(`/column/${columnId}`, bodyData);
    return response.data;
  },
  deleteColumn: async (columnId: number) => {
    const response = await apiClient.delete(`/column/${columnId}`);
    return response.data;
  },
};
