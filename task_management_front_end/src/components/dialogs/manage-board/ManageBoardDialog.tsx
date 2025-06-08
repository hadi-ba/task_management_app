import X from "@/assets/X.svg?react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateBoard } from "@/hooks/mutations/useCreateBoard";
import { useUpdateBoard } from "@/hooks/mutations/useUpdateBoard";
import { useActiveBoard } from "@/providers/BoardProvider";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

const ManageBoardDialog = ({
  isEdit = false,
  open,
  setOpen,
}: {
  isEdit?: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { activeBoard } = useActiveBoard();
  const { mutate: createBoard } = useCreateBoard();
  const { mutate: updateBoard } = useUpdateBoard();

  const [name, setName] = useState("");
  const [columns, setColumns] = useState<string[]>([""]);

  const [errors, setErrors] = useState<{
    name?: string;
    columns?: { [key: number]: string };
  }>({});

  useEffect(() => {
    if (isEdit && activeBoard) {
      setName(activeBoard.name);
      setColumns(activeBoard.columns.map((col) => col.name));
    } else {
      setName("");
      setColumns([""]);
    }

    setErrors({});
  }, [isEdit, activeBoard, open]);

  const addColumn = () => {
    setColumns([...columns, ""]);
  };

  const removeColumn = (index: number) => {
    const newColumns = [...columns];
    newColumns.splice(index, 1);
    setColumns(newColumns);
    if (errors.columns?.[index]) {
      const newColumnErrors = { ...errors.columns };
      delete newColumnErrors[index];
      setErrors({
        ...errors,
        columns:
          Object.keys(newColumnErrors).length > 0 ? newColumnErrors : undefined,
      });
    }
  };

  const updateColumn = (index: number, value: string) => {
    const newColumns = [...columns];
    newColumns[index] = value;
    setColumns(newColumns);
    if (errors.columns?.[index]) {
      const newColumnErrors = { ...errors.columns };
      delete newColumnErrors[index];
      setErrors({
        ...errors,
        columns:
          Object.keys(newColumnErrors).length > 0 ? newColumnErrors : undefined,
      });
    }
  };

  const handleSubmit = () => {
    const newErrors: { name?: string; columns?: { [key: number]: string } } =
      {};
    let hasErrors = false;

    if (!name.trim()) {
      newErrors.name = "Can't be empty";
      hasErrors = true;
    }

    // Validate columns
    const columnErrors: { [key: number]: string } = {};
    columns.forEach((column, index) => {
      if (!column.trim()) {
        columnErrors[index] = "Can't be empty";
        hasErrors = true;
      }
    });

    if (Object.keys(columnErrors).length > 0) {
      newErrors.columns = columnErrors;
    }

    setErrors(newErrors);

    if (hasErrors) {
      return;
    }

    if (isEdit && activeBoard) {
      updateBoard({
        name: name,
        columns: columns.filter((column) => column.trim() !== ""),
        boardId: activeBoard.id,
      });
    } else {
      createBoard({
        name: name,
        columns: columns.filter((column) => column.trim() !== ""),
      });
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="bg-white dark:bg-dark-grey rounded-[6px] space-y-6 p-6 sm:p-8 sm:w-[480px]"
        showCloseButton={false}
      >
        <DialogTitle className="hidden"></DialogTitle>
        {/* Dialog Title */}
        <h1 className="heading-l text-black dark:text-white">
          {isEdit ? "Edit Board" : "Add New Board"}
        </h1>

        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="title">Board Name</Label>
            <Input
              id="title"
              placeholder={"e.g. Web Design"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              error={errors.name}
            />
          </div>

          {/* Columns */}
          <div className="space-y-2">
            <Label>Board Columns</Label>
            <div className="space-y-3">
              {columns.map((column, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Input
                    placeholder="e.g. Make coffee"
                    value={column}
                    onChange={(e) => updateColumn(index, e.target.value)}
                    className="flex-1 w-full"
                    error={errors.columns?.[index]}
                  />
                  <button
                    aria-label="Delete"
                    onClick={() => removeColumn(index)}
                  >
                    <X className="cursor-pointer fill-medium-grey active:fill-red" />
                  </button>
                </div>
              ))}
              <button onClick={addColumn} className="button-secondary w-full">
                + Add New Column
              </button>
            </div>
          </div>

          {/* Create Task Button */}
          <button
            title="Add"
            onClick={handleSubmit}
            className="w-full button-primary-s"
          >
            {isEdit ? "Save Changes" : "Create New Board"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageBoardDialog;
