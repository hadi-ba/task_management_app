import BoardIcon from "@/assets/board.svg?react";
import Moon from "@/assets/moon.svg?react";
import Sun from "@/assets/sun.svg?react";
import { Switch } from "@/components/ui/switch";
import { useBoards } from "@/hooks/queries/useBoards";
import { useActiveBoard } from "@/providers/BoardProvider";
import { useEffect, useState } from "react";
import ManageBoardDialog from "../dialogs/manage-board/ManageBoardDialog";

const BoardItems = ({ onSelectItem }: { onSelectItem?: () => void }) => {
  const { data: boards } = useBoards();

  const { updateActiveBoardId, activeBoardId } = useActiveBoard();

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (localStorage.theme) return localStorage.theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const [openBoardDialog, setOpenBoardDialog] = useState(false);

  const [pressedBoardId, setPressedBoardId] = useState<number | null>(null);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="pt-4 pr-6 space-y-[19px]">
        <h1 className="heading-s text-medium-grey pl-6">
          ALL BOARDS ({boards?.length ?? 0})
        </h1>

        <div>
          {boards?.map((board) => (
            <div
              key={board.id}
              className={`
              flex items-center h-12 gap-3 px-6 py-3.5 cursor-pointer rounded-tr-[100px] rounded-br-[100px] active:bg-main-purple/10 active:dark:bg-white active:text-main-purple
              ${
                  board.id === activeBoardId
                  ? "bg-main-purple text-white"
                  : "text-medium-grey"
                }
              `}
              onMouseDown={() => setPressedBoardId(board.id)}
              onMouseUp={() => setPressedBoardId(null)}
              onMouseLeave={() => setPressedBoardId(null)}
              onClick={() => {
                updateActiveBoardId(board.id);
                onSelectItem && onSelectItem();
                setPressedBoardId(null);
              }}
            >
              <BoardIcon
                className={
                  pressedBoardId === board.id
                    ? "fill-main-purple"
                    : board.id === activeBoardId
                    ? "fill-white"
                    : "fill-medium-grey"
                }
              />

              <span className="heading-m">{board.name}</span>
            </div>
          ))}

          <div className="flex items-center gap-3 px-6 py-3.5 heading-m text-main-purple">
            <BoardIcon className="fill-main-purple" />
            <h1
              onClick={() => {
                setOpenBoardDialog(true);
              }}
              className="cursor-pointer"
            >
              + Create New Board
            </h1>
            <ManageBoardDialog
              open={openBoardDialog}
              setOpen={setOpenBoardDialog}
            />
          </div>
        </div>
      </div>

      <div className="p-4 sm:px-6">
        <div className="flex items-center justify-center gap-6 px-14 py-3.5 bg-light-grey dark:bg-very-dark-grey rounded-[6px] h-12">
          <Sun className="min-w-[19px] min-h-[19px]" />
          <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
          <Moon className="min-w-[15px] min-h-[15px]" />
        </div>
      </div>
    </div>
  );
};

export default BoardItems;
