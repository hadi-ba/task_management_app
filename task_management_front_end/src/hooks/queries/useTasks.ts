import { taskService } from "@/api/services/taskService";
import type { ITask } from "@/types/ITask";
import { useQuery } from "@tanstack/react-query";

export const useTaskDetails = (taskId: number) => {
  return useQuery<ITask>({
    queryKey: ["tasks", taskId],
    queryFn: () => taskService.getTaskDetails(taskId),
  });
};
