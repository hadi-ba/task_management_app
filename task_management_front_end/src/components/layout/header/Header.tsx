import Dots from "@/assets/3dots.svg?react";
import Logo from "@/assets/icon.svg?react";
import Kanban from "@/assets/kanban.svg?react";
import Plus from "@/assets/plus.svg?react";
import DeleteDialog from "@/components/dialogs/delete-dialog/DeleteDialog";
import ManageBoardDialog from "@/components/dialogs/manage-board/ManageBoardDialog";
import ManageTaskDialog from "@/components/dialogs/manage-task/ManageTaskDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { useDeleteBoard } from "@/hooks/mutations/useDeleteBoard";
import { useActiveBoard } from "@/providers/BoardProvider";
import { useState } from "react";
import BoardsControlDropdown from "./BoardsControlDropdown";

const Header = () => {
  const { open } = useSidebar();

  const { activeBoard } = useActiveBoard();
  const { mutate } = useDeleteBoard();

  const [openDeleteBoardDoalog, setOpenDeleteBoardDialog] = useState(false);
  const [openEditBoardDoalog, setopenEditBoardDialog] = useState(false);

  const [openAddTaskDoalog, setopenAddTaskDialog] = useState(false);

  return (
    <div className="h-16 sm:h-20 w-full flex items-center justify-between px-4 sm:px-6 flex-shrink-0 bg-white dark:bg-dark-grey">
      <div className="flex justify-between gap-4">
        <Logo className="block sm:hidden" />
        <div className="block sm:hidden">
          <BoardsControlDropdown />
        </div>
        {!open && (
          <div className="hidden sm:flex sm:items-center gap-6">
            <div className="sm:h-20 flex gap-4 bg-white dark:bg-dark-grey items-center">
              <Logo />
              <Kanban className="fill-[#000112] dark:fill-white" />
            </div>

            <div className="h-full w-px bg-lines-light dark:bg-lines-dark"></div>

            <h1 className="heading-l">{activeBoard ? activeBoard.name : ""}</h1>
          </div>
        )}

        {open && (
          <h1 className="heading-l hidden sm:block">
            {activeBoard ? activeBoard.name : ""}
          </h1>
        )}
      </div>

      <div className="flex justify-between items-center gap-4 sm:gap-6">
        <button
          onClick={() => setopenAddTaskDialog(true)}
          disabled={!activeBoard || activeBoard?.columns?.length === 0}
          type="button"
          title="Add"
          className="button-primary-l bg-main-purple disabled:bg-lines-light disabled:dark:bg-main-purple/40 disabled:dark:text-white/40 hover:disabled:bg-lines-light hover:dark:disabled:bg-main-purple/40 w-12! h-8! sm:h-12! sm:w-40!  flex items-center justify-center"
        >
          <Plus className="sm:hidden" />
          <h1 className="hidden sm:block">+ Add New Task</h1>
        </button>
        <ManageTaskDialog
          open={openAddTaskDoalog}
          setOpen={setopenAddTaskDialog}
        />

        {/* Manage Board */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Dots className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sideOffset={20}
            align="end"
            className="w-48 rounded-[8px] p-4 bg-white dark:bg-very-dark-grey shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)] dark:shadow-none"
          >
            <div className="space-y-4">
              <DropdownMenuItem
                disabled={!activeBoard}
                className="body-l text-medium-grey cursor-pointer"
                onClick={() => {
                  setopenEditBoardDialog(true);
                }}
              >
                Edit Board
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={!activeBoard}
                className="body-l text-red cursor-pointer"
                onClick={() => {
                  if (activeBoard) {
                    setOpenDeleteBoardDialog(true);
                  }
                }}
              >
                Delete Board
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DeleteDialog
          title="Delete this board?"
          content={`Are you sure you want to delete the ‘${activeBoard?.name}’ board? This action will remove all columns and tasks and cannot be reversed.`}
          open={openDeleteBoardDoalog}
          onOpenChange={() => setOpenDeleteBoardDialog(false)}
          onDelete={() => {
            mutate();
            setOpenDeleteBoardDialog(false);
          }}
        />

        <ManageBoardDialog
          isEdit={true}
          open={openEditBoardDoalog}
          setOpen={setopenEditBoardDialog}
        />
      </div>
    </div>
  );
};

export default Header;
