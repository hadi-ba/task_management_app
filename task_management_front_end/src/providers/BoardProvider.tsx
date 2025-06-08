import type { IBoard } from "@/types/IBoard";
import { createContext, useContext, useState, type ReactNode } from "react";

interface BoardContextValue {
  activeBoard: IBoard | null;
  activeBoardId: number | null;
  updateActiveBoard: (board: IBoard | null) => void;
  updateActiveBoardId: (boardId: number | null) => void;
}

const BoardContext = createContext<BoardContextValue | null>(null);

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [activeBoard, setActiveBoard] = useState<IBoard | null>(null);
  const [activeBoardId, setActiveBoardId] = useState<number | null>(null);

  const updateActiveBoard = (board: IBoard | null) => {
    setActiveBoard(board);
  };

  const updateActiveBoardId = (boardId: number | null) => {
    setActiveBoardId(boardId);
  };

  const value: BoardContextValue = {
    activeBoard,
    activeBoardId,
    updateActiveBoard,
    updateActiveBoardId,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};

export function useActiveBoard() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useActiveBoard must be used within a BoardProvider");
  }
  return context;
}
