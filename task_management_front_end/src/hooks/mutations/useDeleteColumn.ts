import { boardService } from "@/api/services/boardService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteColumn = (boardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => boardService.deleteBoard(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
    onError: (error) => {
      console.error("Failed to delete column:", error);
    },
  });
};
