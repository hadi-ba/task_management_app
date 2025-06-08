import { boardService } from "@/api/services/boardService";
import { useActiveBoard } from "@/providers/BoardProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const { activeBoardId, updateActiveBoard, updateActiveBoardId } =
    useActiveBoard();

  return useMutation({
    mutationFn: () => boardService.deleteBoard(activeBoardId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });

      updateActiveBoard(null);
      updateActiveBoardId(null);
    },
    onError: (error) => {
      console.error("Failed to delete board:", error);
    },
  });
};
