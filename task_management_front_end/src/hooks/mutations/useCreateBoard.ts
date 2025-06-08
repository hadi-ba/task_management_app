import { boardService } from "@/api/services/boardService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: boardService.createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
    onError: (error) => {
      console.error("Failed to create board:", error);
    },
  });
};
