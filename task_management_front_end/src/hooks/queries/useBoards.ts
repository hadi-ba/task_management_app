import { boardService } from "@/api/services/boardService";
import { useActiveBoard } from "@/providers/BoardProvider";
import type { IBoard } from "@/types/IBoard";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useBoards = () => {
  return useQuery<IBoard[]>({
    queryKey: ["boards"],
    queryFn: boardService.getBoards,
  });
};

export const useBoardDetails = (boardId: number | null) => {
  const { updateActiveBoard } = useActiveBoard();
  const queryResult = useQuery<IBoard>({
    queryKey: ["boards", boardId],
    queryFn: () => boardService.getBoardDetails(boardId!),
    enabled: !!boardId,
  });

  useEffect(() => {
    if (queryResult.data) {
      updateActiveBoard(queryResult.data);
    }
  }, [queryResult.data, updateActiveBoard]);

  return queryResult;
};
