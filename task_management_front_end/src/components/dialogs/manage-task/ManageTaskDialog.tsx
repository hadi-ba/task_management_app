import X from "@/assets/X.svg?react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTask } from "@/hooks/mutations/useCreateTask";
import { useUpdateTask } from "@/hooks/mutations/useUpdateTask";
import { useActiveBoard } from "@/providers/BoardProvider";
import type { ITask } from "@/types/ITask";
import { useEffect, useState } from "react";

const ManageTaskDialog = ({
  isEdit = false,
  open,
  setOpen,
  task,
}: {
  isEdit?: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task?: ITask;
}) => {
  const { activeBoard } = useActiveBoard();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState<string[]>([""]);
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState<{
    title?: string;
    subtasks?: { [key: number]: string };
  }>({});

  const { mutate: createTask } = useCreateTask();
  const { mutate: updateTask } = useUpdateTask();

  useEffect(() => {
    if (isEdit && task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setSubtasks(task.subTasks?.map((sub) => sub.title) || [""]);
      setStatus(String(task.columnId) || "");
    } else {
      setTitle("");
      setDescription("");
      setSubtasks([""]);
      setStatus("");
    }
    setErrors({});
  }, [isEdit, task, open]);

  const addSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const removeSubtask = (index: number) => {
    const newSubtasks = [...subtasks];
    newSubtasks.splice(index, 1);
    setSubtasks(newSubtasks);
    if (errors.subtasks?.[index]) {
      const newSubtaskErrors = { ...errors.subtasks };
      delete newSubtaskErrors[index];
      setErrors({
        ...errors,
        subtasks:
          Object.keys(newSubtaskErrors).length > 0
            ? newSubtaskErrors
            : undefined,
      });
    }
  };

  const updateSubtask = (index: number, text: string) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = text;
    setSubtasks(newSubtasks);
    if (errors.subtasks?.[index]) {
      const newSubtaskErrors = { ...errors.subtasks };
      delete newSubtaskErrors[index];
      setErrors({
        ...errors,
        subtasks:
          Object.keys(newSubtaskErrors).length > 0
            ? newSubtaskErrors
            : undefined,
      });
    }
  };

  const handleSubmit = () => {
    const newErrors: {
      title?: string;
      subtasks?: { [key: number]: string };
    } = {};
    let hasErrors = false;

    // Validate title
    if (!title.trim()) {
      newErrors.title = "Can't be empty";
      hasErrors = true;
    }

    // Validate subtasks
    const subtaskErrors: { [key: number]: string } = {};
    subtasks.forEach((subtask, index) => {
      if (!subtask.trim()) {
        subtaskErrors[index] = "Can't be empty";
        hasErrors = true;
      }
    });

    if (Object.keys(subtaskErrors).length > 0) {
      newErrors.subtasks = subtaskErrors;
    }

    setErrors(newErrors);

    if (hasErrors) {
      return;
    }

    if (isEdit && task) {
      updateTask({
        title,
        description,
        subTasks: subtasks.filter((subtask) => subtask.trim() !== ""),
        columnId: status,
        taskId: task.id,
      });
    } else {
      createTask({
        title,
        description,
        subTasks: subtasks.filter((subtask) => subtask.trim() !== ""),
        columnId:
          status.length > 0 ? status : String(activeBoard?.columns[0]?.id),
      });
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="bg-white dark:bg-dark-grey rounded-[6px] p-6 sm:p-8 sm:w-[480px] space-y-6"
        showCloseButton={false}
      >
        {/* Dialog Title */}
        <h1 className="heading-l text-black dark:text-white">
          {isEdit ? "Edit Task" : "Add New Task"}
        </h1>

        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder={"e.g. Take coffee break"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full dark:bg-dark-grey"
              error={errors.title}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] resize-none w-full dark:bg-dark-grey"
            />
          </div>

          {/* Subtasks */}
          <div className="space-y-2">
            <Label>Subtasks</Label>
            <div className="space-y-3">
              {subtasks.map((subtask, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Input
                    placeholder="e.g. Make coffee"
                    value={subtask}
                    onChange={(e) => updateSubtask(index, e.target.value)}
                    className="flex-1 w-full dark:bg-dark-grey"
                    error={errors.subtasks?.[index]}
                  />
                  <button
                    aria-label="Delete"
                    onClick={() => removeSubtask(index)}
                  >
                    <X className="cursor-pointer fill-medium-grey active:fill-red" />
                  </button>
                </div>
              ))}
              <button onClick={addSubtask} className="button-secondary w-full">
                + Add New Subtask
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              key={`status${task?.id}`}
              defaultValue={status || String(activeBoard?.columns[0]?.id)}
              onValueChange={setStatus}
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

          {/* Create Task Button */}
          <button
            title="Add"
            onClick={handleSubmit}
            className="w-full button-primary-s"
          >
            {isEdit ? "Save Changes" : "Create Task"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageTaskDialog;
