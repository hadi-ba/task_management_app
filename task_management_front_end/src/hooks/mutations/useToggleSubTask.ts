import { subTaskService } from "@/api/services/subTaskService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleSubTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subTaskService.toggleSubTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Failed to toggle sub task:", error);
    },
  });
};
