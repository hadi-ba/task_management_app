import apiClient from "../client";

export const boardService = {
  getBoards: async () => {
    const response = await apiClient.get("/board");
    return response.data;
  },
  createBoard: async (boardData: any) => {
    const response = await apiClient.post("/board", boardData);
    return response.data;
  },
  updateBoard: async (boardData: any) => {
    const { boardId, ...dataToUpdate } = boardData;

    const response = await apiClient.patch(`/board/${boardId}`, dataToUpdate);
    return response.data;
  },
  getBoardDetails: async (boardId: number) => {
    const response = await apiClient.get(`/board/${boardId}`);
    return response.data;
  },
  deleteBoard: async (boardId: number) => {
    const response = await apiClient.delete(`/board/${boardId}`);
    return response.data;
  },
};
