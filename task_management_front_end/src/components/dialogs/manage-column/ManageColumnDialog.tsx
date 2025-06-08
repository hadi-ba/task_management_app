import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateColumn } from "@/hooks/mutations/useCreateColumn";
import { useActiveBoard } from "@/providers/BoardProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import Dots from "@/assets/3dots.svg?react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useUpdateColumn } from "@/hooks/mutations/useUpdateColumn";
import DeleteDialog from "../delete-dialog/DeleteDialog";
import { useDeleteColumn } from "@/hooks/mutations/useDeleteColumn";

const ManageColumnDialog = ({
  isEdit = false,
  open,
  setOpen,
  columnId,
  columnName,
}: {
  isEdit?: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  columnId?: number;
  columnName?: string;
}) => {
  const { mutate: createColumn } = useCreateColumn();
  const { mutate: updateColumn } = useUpdateColumn();
  const { mutate: deleteColumn } = useDeleteColumn(columnId!);

  const [opedDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { activeBoardId } = useActiveBoard();

  const [name, setName] = useState("");
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Can't be empty");
      return;
    }

    if (isEdit) {
      updateColumn({ name: name, columnId: columnId });
    } else {
      createColumn({ name: name, boardId: activeBoardId });
    }

    setOpen(false);
  };

  useEffect(() => {
    if (isEdit && columnName) {
      setName(columnName);
    } else {
      setName("");
    }
    setError("");
  }, [open, isEdit, columnName]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="bg-white dark:bg-dark-grey rounded-[6px] space-y-6 p-6 sm:p-8 sm:w-[480px]"
        showCloseButton={false}
      >
        {/* Dialog Title */}
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          <h1 className="heading-l text-black dark:text-white">
            {isEdit ? "Edit Column" : "Add New Column"}
          </h1>
          {isEdit && (
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
                    className="body-l text-red cursor-pointer"
                    onClick={() => setOpenDeleteDialog(true)}
                  >
                    Delete Column
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="title">Column Name</Label>
            <Input
              id="title"
              placeholder={"e.g. TODO"}
              value={name}
              onChange={handleNameChange}
              className="w-full"
              error={error}
            />
          </div>

          {/* Create Task Button */}
          <button
            title="Add"
            onClick={handleSubmit}
            className="w-full button-primary-s"
          >
            {isEdit ? "Save Changes" : "Create New Column"}
          </button>
        </div>
      </DialogContent>
      <DeleteDialog
        title="Delete this column?"
        content={`Are you sure you want to delete the '${columnName}' column? This action will remove all tasks and cannot be reversed.`}
        open={opedDeleteDialog}
        onOpenChange={() => setOpenDeleteDialog(false)}
        onDelete={() => {
          deleteColumn();
          setOpenDeleteDialog(false);
          setOpen(false);
        }}
      />
    </Dialog>
  );
};

export default ManageColumnDialog;
