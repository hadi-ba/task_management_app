import { boardService } from "@/api/services/boardService";
import type { IBoard } from "@/types/IBoard";
import { useQuery } from "@tanstack/react-query";

export const useBoards = () => {
  return useQuery<IBoard[]>({
    queryKey: ["boards"],
    queryFn: boardService.getBoards,
  });
};

export const useBoardDetails = (boardId: number | null) => {
  return useQuery<IBoard>({
    queryKey: ["boards", boardId],
    queryFn: () => boardService.getBoardDetails(boardId!),
    enabled: !!boardId,
  });
};
