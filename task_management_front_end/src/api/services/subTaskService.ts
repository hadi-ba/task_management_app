import apiClient from "../client";

export const subTaskService = {
  toggleSubTask: async (subTaskId: number) => {
    const response = await apiClient.post(`/sub-task/toggle/${subTaskId}`);
    return response.data;
  },
};
