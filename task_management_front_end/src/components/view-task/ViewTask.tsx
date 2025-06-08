import Dots from "@/assets/3dots.svg?react";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToggleSubTask } from "@/hooks/mutations/useToggleSubTask";
import { useUpdateTask } from "@/hooks/mutations/useUpdateTask";
import { useTaskDetails } from "@/hooks/queries/useTasks";
import { useActiveBoard } from "@/providers/BoardProvider";
import { DialogTitle } from "@radix-ui/react-dialog";
import ManageTaskDialog from "../dialogs/manage-task/ManageTaskDialog";
import { useState } from "react";
import DeleteDialog from "../dialogs/delete-dialog/DeleteDialog";
import { useDeleteTask } from "@/hooks/mutations/useDeleteTask";

const ViewTask = ({
  taskId,
  open,
  setOpen,
}: {
  taskId: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { activeBoard } = useActiveBoard();

  const { data: task } = useTaskDetails(taskId);

  const { mutate: updateTask } = useUpdateTask();
  const { mutate: toggleSubTask } = useToggleSubTask();
  const { mutate: deleteTask } = useDeleteTask(task?.id!);

  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false);
  const [openDeleteTaskDialog, setOpenDeleteTaskDialog] = useState(false);

  const completedCount = task?.subTasks?.filter(
    (task) => task.completed
  )?.length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="rounded-[6px] bg-white dark:bg-dark-grey p-6 sm:p-8 space-y-6 sm:w-[480px]"
        showCloseButton={false}
      >
        {/* Header */}
        <DialogTitle className="hidden"></DialogTitle>
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          <h1 className="heading-l text-black dark:text-white text-left">
            {task?.title}
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Dots className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={20}
              className="w-48 rounded-[8px] p-4 bg-white dark:bg-very-dark-grey shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)] dark:shadow-none"
            >
              <div className="space-y-4">
                <DropdownMenuItem
                  onClick={() => setOpenEditTaskDialog(true)}
                  className="body-l text-medium-grey cursor-pointer"
                >
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setOpenDeleteTaskDialog(true)}
                  className="body-l text-red cursor-pointer"
                >
                  Delete Task
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description */}
        <p className="body-l text-medium-grey text-left">{task?.description}</p>

        {/* Subtasks */}
        <div className="space-y-4">
          <h3 className="body-m text-medium-grey dark:text-white">
            Subtasks ({completedCount} of {task?.subTasks?.length ?? 0})
          </h3>

          <div className="space-y-2">
            {task?.subTasks?.map((subtask) => (
              <div
                key={subtask.id}
                className="flex gap-4 items-center rounded-[4px] p-3 bg-light-grey dark:bg-very-dark-grey body-m text-black dark:text-white hover:bg-main-purple/25"
              >
                <Checkbox
                  id={`subtask-${subtask.id}`}
                  defaultChecked={subtask.completed}
                  onCheckedChange={() => toggleSubTask(subtask.id)}
                  className="cursor-pointer rounded-[2px] data-[state=checked]:bg-main-purple data-[state=checked]:border-0 border-1-[rgba(130, 143, 163, 0.2489)] w-4 bg-white dark:bg-dark-grey"
                />
                <label
                  htmlFor={`subtask-${subtask.id}`}
                  className={`${
                    subtask.completed
                      ? "line-through text-black/50 dark:text-white/50"
                      : ""
                  }`}
                >
                  {subtask.title}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Task State */}
        <div className="space-y-2">
          <h3 className="body-m text-medium-grey dark:text-white">
            Current Status
          </h3>

          <Select
            key={`status${task?.id} ${task?.columnId}`}
            defaultValue={String(task?.columnId)}
            onValueChange={(v) => {
              updateTask({ taskId: task?.id, columnId: v });
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {activeBoard?.columns.map((column) => (
                <SelectItem key={column.id} value={String(column.id)}>
                  {column.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
      <ManageTaskDialog
        isEdit={true}
        open={openEditTaskDialog}
        setOpen={setOpenEditTaskDialog}
        task={task}
      />
      <DeleteDialog
        title="Delete this task?"
        content={`Are you sure you want to delete the ‘${task?.title}’ task and its subtasks? This action cannot be reversed.`}
        open={openDeleteTaskDialog}
        onOpenChange={() => setOpenDeleteTaskDialog(false)}
        onDelete={() => {
          deleteTask();
          setOpenDeleteTaskDialog(false);
          setOpen(false);
        }}
      />
    </Dialog>
  );
};

export default ViewTask;
