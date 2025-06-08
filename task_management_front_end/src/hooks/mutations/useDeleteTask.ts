import { taskService } from "@/api/services/taskService";
import { useActiveBoard } from "@/providers/BoardProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTask = (taskId: number) => {
  const queryClient = useQueryClient();

  const { activeBoardId } = useActiveBoard();

  return useMutation({
    mutationFn: () => taskService.deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", activeBoardId] });
    },
    onError: (error) => {
      console.error("Failed to delete column:", error);
    },
  });
};
