import { columnService } from "@/api/services/columnService";
import { useActiveBoard } from "@/providers/BoardProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateColumn = () => {
  const queryClient = useQueryClient();

  const { activeBoardId } = useActiveBoard();

  return useMutation({
    mutationFn: columnService.createColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", activeBoardId] });
    },
    onError: (error) => {
      console.error("Failed to create board:", error);
    },
  });
};
