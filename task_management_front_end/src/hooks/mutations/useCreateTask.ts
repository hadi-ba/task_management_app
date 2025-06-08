import { taskService } from "@/api/services/taskService";
import { useActiveBoard } from "@/providers/BoardProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { activeBoardId } = useActiveBoard();

  return useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", activeBoardId] });
    },
    onError: (error) => {
      console.error("Failed to create task:", error);
    },
  });
};
