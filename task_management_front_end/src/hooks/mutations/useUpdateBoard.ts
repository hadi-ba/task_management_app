import { boardService } from "@/api/services/boardService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: boardService.updateBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
    onError: (error) => {
      console.error("Failed to update board:", error);
    },
  });
};
