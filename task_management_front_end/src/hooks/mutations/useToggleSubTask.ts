import { subTaskService } from "@/api/services/subTaskService";
import { useActiveBoard } from "@/providers/BoardProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleSubTask = () => {
  const queryClient = useQueryClient();

  const { activeBoardId } = useActiveBoard();

  return useMutation({
    mutationFn: subTaskService.toggleSubTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", activeBoardId] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Failed to toggle sub task:", error);
    },
  });
};
