import apiClient from "../client";

export const taskService = {
  createTask: async (taskData: any) => {
    const response = await apiClient.post("/task", taskData);
    return response.data;
  },
  updateTask: async (taskData: any) => {
    const { taskId, ...dataToUpdate } = taskData;

    const response = await apiClient.patch(`/task/${taskId}`, dataToUpdate);
    return response.data;
  },
  getTaskDetails: async (taskId: number) => {
    const response = await apiClient.get(`/task/${taskId}`);
    return response.data;
  },
  deleteTask: async (taskId: number) => {
    const response = await apiClient.delete(`/task/${taskId}`);
    return response.data;
  },
};
